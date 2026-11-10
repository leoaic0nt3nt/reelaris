#!/usr/bin/env python3
"""Assemble local video segments from a JSON timeline into H.264/AAC."""
import argparse
import json
import math
from pathlib import Path
import subprocess
import tempfile


def probe(file):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_format", "-show_streams", "-of", "json", str(file)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(result.stdout)


def render(timeline_path, output):
    timeline = json.loads(timeline_path.read_text(encoding="utf-8"))
    width, height, fps = (timeline[key] for key in ("width", "height", "fps"))
    if any(type(size) is not int or size < 64 or size > 4096 or size % 2 for size in (width, height)):
        raise ValueError("Use even width and height between 64 and 4096.")
    if type(fps) is not int or not 1 <= fps <= 60:
        raise ValueError("Use an integer fps between 1 and 60.")
    clips = timeline["clips"]
    if not isinstance(clips, list) or not clips:
        raise ValueError("The timeline needs at least one clip.")
    if output.suffix.lower() != ".mp4":
        raise ValueError("The output extension must be .mp4.")
    if output.exists():
        raise ValueError(f"Output already exists: {output}")

    inputs = []
    filters = []
    tracks = []
    sources = {}
    for index, clip in enumerate(clips):
        file = (timeline_path.parent / clip["file"]).resolve()
        if not file.is_file():
            raise ValueError(f"Missing clip: {file}")
        if file not in sources:
            sources[file] = probe(file)
        metadata = sources[file]
        video = next((s for s in metadata["streams"] if s["codec_type"] == "video"
                      and not s.get("disposition", {}).get("attached_pic")), None)
        if video is None:
            raise ValueError(f"No video stream: {file}")
        start, end = float(clip["in"]), float(clip["out"])
        duration = end - start
        source_duration = video.get("duration")
        if source_duration in (None, "N/A"):
            source_duration = metadata["format"].get("duration", "nan")
        source_duration = float(source_duration)
        if not (math.isfinite(start) and math.isfinite(end) and start >= 0 and duration >= 1 / fps):
            raise ValueError(f"Invalid time range for {file}: {start}–{end}.")
        if math.isfinite(source_duration) and end > source_duration + 0.001:
            raise ValueError(f"Out point {end} exceeds video duration {source_duration}: {file}")

        seconds = f"{duration:.9f}"
        inputs.extend(["-ss", f"{start:.9f}", "-i", str(file)])
        filters.append(
            f"[{index}:{video['index']}]setpts=PTS-STARTPTS,"
            f"fps={fps},scale=w='trunc(min({width},{height}*dar)/2)*2':"
            f"h='trunc(min({height},{width}/dar)/2)*2',setsar=1,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2,"
            f"format=yuv420p,trim=duration={seconds}[v{index}]"
        )
        has_audio = any(s["codec_type"] == "audio" for s in metadata["streams"])
        audio = (
            f"[{index}:a:0]aresample=48000:async=1:first_pts=0,aformat=channel_layouts=stereo,apad"
            if has_audio else "anullsrc=r=48000:cl=stereo"
        )
        filters.append(f"{audio},atrim=duration={seconds}[a{index}]")
        tracks.append(f"[v{index}][a{index}]")

    filters.append(f"{''.join(tracks)}concat=n={len(clips)}:v=1:a=1[v][a]")
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent, prefix=".studio-cut-") as temporary:
        encoded = Path(temporary) / "video.mp4"
        subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-nostdin", *inputs,
             "-filter_complex", ";".join(filters), "-map", "[v]", "-map", "[a]",
             "-c:v", "libx264", "-crf", "18", "-preset", "fast",
             "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(encoded)],
            check=True,
        )
        metadata = probe(encoded)
        if {stream["codec_name"] for stream in metadata["streams"]} != {"h264", "aac"}:
            raise ValueError("Expected an H.264 video stream and an AAC audio stream.")
        # Publish the verified file atomically without replacing an existing result.
        output.hardlink_to(encoded)

    print(output)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("timeline", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    try:
        render(args.timeline, args.output)
    except (OSError, KeyError, TypeError, ValueError, subprocess.CalledProcessError) as error:
        parser.exit(1, f"Studio cut: {error}\n")


if __name__ == "__main__":
    main()
