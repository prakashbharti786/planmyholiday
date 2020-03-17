#!/bin/bash
set -e
stopApp() {
  /usr/bin/forever stop pmhApp
}
[[ $(stopApp 2>&1) ]]
