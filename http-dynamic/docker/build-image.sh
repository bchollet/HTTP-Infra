#!/bin/bash

mkdir -p src
cp ../src/* src/ -r
cp ../package.json src/
cp ../package-lock.json src/

# Build the Docker image locally
docker build --tag dai/http-step2 .

rm -rfv src/*