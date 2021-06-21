#!/usr/bin/env bash

function check_error()
{
    error=${1}
    shift

    if [[ ${error} -ne 0 ]]
    then
        echo "ERROR: ${error} -> $@"
        exit 1
    fi
}

curl -I localhost:8080/health/readiness
check_error $? "Readiness probe failed.  :-("

curl -I localhost:8080/health/check
check_error $? "Health probe failed.  :-("

curl -I localhost:8080
check_error $? "Application failed.  :-("
