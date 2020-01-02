#!/bin/bash
set -e
npm run build
firebase deploy --only hosting:ipfs-video
