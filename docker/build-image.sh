#!/bin/bash

mkdir -p src
cp ../src/* src/ -r

# Build the Docker image locally
docker build --tag dai/http-step2 .

rm -rfv src/*