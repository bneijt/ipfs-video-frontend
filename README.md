IPFS video front-end
=========
This is the IPFS video front-end hosted on https://ipfs.video

The basic idea is being able to play a video from IPFS directly or using one of the gateways available.

Development notes
================

To detect the type of MP4 embedded media, I did some reverse engineering to find the correct bytes for the different codecs embedded in the mp4 file.

Commands to do that include:

    #!/bin/bash
    echo avc1
    mp4file --dump "$1" | grep AVCProfileIndication
    mp4file --dump "$1" | grep profile_compatibility
    mp4file --dump "$1" | grep AVCLevelIndication

    echo mp4a
    mp4file --dump "$1" | grep objectTypeId
    mp4file --dump "$1" | grep AVCProfileIndication