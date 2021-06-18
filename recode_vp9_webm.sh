#!/bin/bash
#Script that takes the input file and recodes to streamable VP8 Opus WEBM file
set -e
INPUT=$1
if [ -z "$INPUT" ]; then
    echo "Requires a single file as input file"
    exit 1
fi
OUTPUT="${INPUT%%.*}".webm
QUALITY=45
ffmpeg -i "$INPUT" -c:v libvpx-vp9 -crf $QUALITY -b:v 0 -r 30 -c:a libopus -b:a 96K "$OUTPUT"