#!/bin/bash
BASE_PATH="/home/ubuntu/pmh_app/"
mv ${BASE_PATH}build/* ${BASE_PATH}app/
rm -rf ${BASE_PATH}build
npm install --production --prefix ${BASE_PATH}app/
