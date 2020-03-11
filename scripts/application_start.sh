#!/bin/bash
BASE_PATH="/home/ubuntu/pmh_app/"
cd $BASE_PATH
npm install --production --prefix ${BASE_PATH}app/
pm2 flush # Clear all the logs
# shellcheck disable=SC2164
/usr/bin/pm2 start ecosystem.config.js
exec bash
