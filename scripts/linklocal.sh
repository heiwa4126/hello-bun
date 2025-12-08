#!/bin/bash -eu
MY_PACKAGE_NAME=$(npm pkg get name)
MY_PACKAGE_NAME=${MY_PACKAGE_NAME//\"/}
NPM_CONFIG_PREFIX="$PWD/.npm-local"

npm link
npm link "$MY_PACKAGE_NAME"
rm -rf "$NPM_CONFIG_PREFIX"
