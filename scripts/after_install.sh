#!/bin/bash
BASE_PATH="/home/ubuntu/pmh_app/"
rm -rf ${BASE_PATH}app
mkdir ${BASE_PATH}app
mv ${BASE_PATH}build/* ${BASE_PATH}app/
rm -rf ${BASE_PATH}build
pm2 delete ${BASE_PATH}ecosystem.config.js
cp ${BASE_PATH}.env ${BASE_PATH}app/
npm install --production --prefix ${BASE_PATH}app/
pm2 flush # Clear all the logs
cd $BASE_PATH || exit 0
/usr/bin/pm2 start ecosystem.config.js
exec bash
