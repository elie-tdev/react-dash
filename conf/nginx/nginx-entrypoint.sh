#!/bin/sh
WWW_DIR=/usr/share/nginx/html/dashboard/loans
INJECT_FILE_SRC="${WWW_DIR}/conf.js.tpl"
INJECT_FILE_DST="${WWW_DIR}/conf.js"
envsubst < "${INJECT_FILE_SRC}" > "${INJECT_FILE_DST}"
[ -z "$@" ] && nginx -g 'daemon off;' || $@