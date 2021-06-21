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

CICD_HELM_DIR="cicd/dashboard"

cd ${CICD_HELM_DIR}

helm install --dry-run --debug . 2> /dev/null 1>&2
check_error $? "FAIL: Check logs with pushd . ; cd ${CICD_HELM_DIR} ; helm install --dry-run --debug . ; popd"
echo "SUCCESS: pushd . ; cd ${CICD_HELM_DIR} ; helm install --dry-run --debug . ; popd"

for tier in prd stg dev
do
    if [[ -e ../values-${tier}.yaml ]]
    then
        helm install --values ../values-${tier}.yaml --dry-run --debug . 2> /dev/null 1>&2
        check_error $? "FAIL: Check logs with pushd . ; cd ${CICD_HELM_DIR} ; helm install --values ../values-${tier}.yaml . ; popd"
        echo "SUCCESS: pushd . ; cd ${CICD_HELM_DIR} ; helm install --values ../values-${tier}.yaml . ; popd"
    else
        echo "WARNING: cicd/../values-${tier}.yaml does not exist."
    fi
done
