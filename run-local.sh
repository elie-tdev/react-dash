#!/usr/bin/env bash

echo "Running dashboard on port 8080"
echo "Run ./test-local.sh in another shell in this directory ${PWD}"
echo

docker run --rm -it -p 8080:8080 --name dashboard dashboard
