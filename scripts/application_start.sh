#!/bin/bash
BASE_PATH="/home/ubuntu/pmh_app/"
cp ${BASE_PATH}.env ${BASE_PATH}app/
/usr/bin/forever start ${BASE_PATH}development.json
