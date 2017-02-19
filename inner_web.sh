#!/bin/bash
#同步php
/usr/bin/rsync -av \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude 'Runtime' \
    ../zuban_web/ root@182.254.219.233:/usr/share/nginx/test.guleshop.com/youfan/web/