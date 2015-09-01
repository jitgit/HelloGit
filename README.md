HelloGit
========
Getting around with D3

Learning code



#Unix Commands
### xargs


| Example           | Comments  |
|:-------------:| -----:|
| find / -name *.mp3 -type f -print | xargs tar -cvzf mp3s.tar.gz		|zipping all the *.mp3 file to a tar file|
| find -type d -empty | xargs -t rm -rvf		| delete all empty directories using xargs|
|find . -type d -empty -delete|delete all empty directories using find only|


### Sundry
|Example           |Comments  |
|:-------------:| -----:|
| lsof <pid>|lsof command list open files under all Linux distributions or UNIX like operating system|
|'prstat -u gemds' |List the process & their usage by user gemds|
