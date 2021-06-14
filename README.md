IPFS video front-end
=========
This is the IPFS video front-end hosted on https://ipfs.video

The basic idea is being able to play a video from IPFS directly or using one of the gateways available.

Adding video's
==============

Video's need to be compatible with ipfs.video to be able to add them.

Recoding video's
===============
There are many options too recoding, this documentation lists just a few to help you get started making your video streamable on IPFS.


Convert using cloud service

Convert using Youtube
====================
If you have your video hosted on Youtube, chances are you can download a streamable version from there using youtube-dl:

```
youtube-dl -f 'bestvideo[ext=webm]+bestaudio[ext=webm]' --merge-output-format webm 'link to your video'
```





