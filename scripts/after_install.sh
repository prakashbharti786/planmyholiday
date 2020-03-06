#!/bin/bash
BASE_PATH="/home/ubuntu/pmh_app/"
mkdir ${BASE_PATH}releases/"${DEPLOYMENT_ID}"
mv ${BASE_PATH}build/* ${BASE_PATH}releases/"${DEPLOYMENT_ID}"/
rm -rf ${BASE_PATH}build
pm2 delete ${BASE_PATH}ecosystem.config.js
rm -rf ${BASE_PATH}current
mkdir ${BASE_PATH}current
cp ${BASE_PATH}.env ${BASE_PATH}releases/${DEPLOYMENT_ID}/
ln -s ${BASE_PATH}releases/"${DEPLOYMENT_ID}"/* ${BASE_PATH}current/
ln -s ${BASE_PATH}releases/"${DEPLOYMENT_ID}"/.env ${BASE_PATH}/current/
pm2 flush # Clear all the logs
pm2 start ${BASE_PATH}ecosystem.config.js
ARRAY=()
for f in "${BASE_PATH}"releases/*; do
    if [ -d "$f" ] && [ $f != ${BASE_PATH}releases/"${DEPLOYMENT_ID}" ]; then
        ARRAY+=("$f")
    fi
done
## now loop through the above array
for i in "${ARRAY[@]}"; do
  rm -rf $i
done
