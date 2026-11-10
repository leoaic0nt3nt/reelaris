#!/usr/bin/env python3
"""Convert UTF-8 text to MP3 using the account configured in ELEVENLABS_API_KEY."""
import argparse
import json
import os
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("text", type=Path)
    parser.add_argument("voice_id")
    parser.add_argument("output", type=Path)
    parser.add_argument("--model", default="eleven_multilingual_v2")
    args = parser.parse_args()

    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        parser.error("Set ELEVENLABS_API_KEY in the local environment.")
    if args.output.suffix.lower() != ".mp3":
        parser.error("The output extension must be .mp3.")

    try:
        speech = args.text.read_text(encoding="utf-8")
        if not speech.strip():
            parser.error("The text file is empty.")
        args.output.parent.mkdir(parents=True, exist_ok=True)
        voice = quote(args.voice_id, safe="")
        request = Request(
            f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128",
            headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg"},
            data=json.dumps({"text": speech, "model_id": args.model}).encode(),
        )
        # Reserve the path before the request so a second invocation cannot spend credits for it.
        with args.output.open("xb") as output:
            try:
                with urlopen(request, timeout=120) as response:
                    if response.headers.get_content_type() != "audio/mpeg":
                        raise ValueError("The API returned an unexpected content type.")
                    audio = response.read()
                    if not audio:
                        raise ValueError("The API returned an empty file.")
                    output.write(audio)
            except BaseException:
                output.close()
                args.output.unlink(missing_ok=True)
                raise
    except HTTPError as error:
        sys.exit(f"ElevenLabs HTTP {error.code}. Check the key, voice, model or quota before retrying.")
    except (OSError, URLError, ValueError) as error:
        sys.exit(str(error))

    print(args.output)


if __name__ == "__main__":
    main()
