#!/usr/bin/env python3
"""List project links from the bundled video skills catalog."""
import argparse
import json
from pathlib import Path

catalog = Path(__file__).resolve().parents[1] / "vendor" / "catalog.json"
projects = json.loads(catalog.read_text(encoding="utf-8"))["projects"]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("query", nargs="?", default="", help="Filter by repository name or skill path")
parser.add_argument("--category", choices=sorted({p["category"] for p in projects}))
parser.add_argument("--all", action="store_true", help="Show every match")
args = parser.parse_args()
matches = [
    project for project in projects
    if (not args.category or project["category"] == args.category)
    and args.query.casefold() in f"{project['repo']} {project.get('path', '')}".casefold()
]
for project in matches if args.all else matches[:15]:
    url = project["url"]
    if project.get("path"):
        url += "/tree/HEAD/" + project["path"].lstrip("/")
    print(f"{project['category']:10} {url}")
print(f"{len(matches)} matches ({len(projects)} projects total)")
