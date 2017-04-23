#!bin/sh

npm run build
tar cvfz - index.html static resume.pdf resume.png | ssh root@119.29.148.154  "cd /usr/share/nginx/pages/resume; rm -rf dist.tar.gz; tar xvfz -;"

exit
