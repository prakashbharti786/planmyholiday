#!/bin/bash
set -u
set -e
stop() {
  /usr/bin/forever stop pmhApp
}
[[ $(stop 2>&1) =~ "Forever cannot find" ]]
