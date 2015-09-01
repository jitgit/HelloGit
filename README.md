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


### Find & AWK

Print friendly disk usage of current directory

```
# Print file size of each file
find . -type f  |xargs ls -ltr | awk '{ total += $5;  print $5 "-------------" $9  "  :" total } END { print "Total size:\n" (total) " bytes\n" (total/1024) " KB\n" (total/(1024*1024)) " MB\n" (total/(1024*1024*1024)) " GB "  }'

# Just print disk usage
find . -type f  |xargs ls -ltr | awk '{ total += $5; } END { print "Total size:\n" (total) " bytes\n" (total/1024) " KB\n" (total/(1024*1024)) " MB\n" (total/(1024*1024*1024)) " GB "  }'



```

### Sundry
|Example           |Comments  |
|:-------------:| -----:|
| lsof <pid>|lsof command list open files under all Linux distributions or UNIX like operating system|
|'prstat -u gemds' |List the process & their usage by user gemds|
