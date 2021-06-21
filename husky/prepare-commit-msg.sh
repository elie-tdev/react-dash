#!/bin/bash

BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_NAME="${BRANCH_NAME##*/}"
TICKET=$(echo $BRANCH_NAME | cut -f1 -d\. | awk '{print toupper($0)}')

if [ -n "$BRANCH_NAME" ]; then
  sed -i '' -e "1s/^/$TICKET /" $1
fi