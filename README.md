HelloGit
========
Getting around with D3

Learning code



#Unix Commands
### find

| Example           | Comments  |
|:-------------:| -----:|
|find <dir> -type d|For listing only directories|
|find <dir> -type f |For listing all the file in the <dir> and its subdirecotries|
|find <dir> -type f -name <filename>|For listing all the file with name <filename> in the <dir> and its subdirecotries|
|find . -mtime 0  |find files modified between now and 1 day ago ,# (i.e., within the past 24 hours)|
|find . -mtime -1|find files modified less than 1 day ago # (i.e., within the past 24 hours, as before)|
|find . -mtime 1   |find files modified between 24 and 48 hours ago|
|find . -mtime +1|find files modified more than 48 hours ago|
|find . -mmin +5 -mmin -10|find files modified between   # 6 and 9 minutes ago|
|find . -name foo\*bar|find current directory down for foo*bar|   
|find . -type d -empty -delete|delete all empty directories using find only|
|find . -exec grep -q "searchstring" '{}' \; -print|All files that contain the string 'searchstring'|

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
