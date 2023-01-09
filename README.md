# Step 1: Static HTTP server with apache httpd
In this step, we have built a docker image containing an Apache httpd server in order to host a static web page using mostly HTML and CSS. The static website was found and the same library presented during the webcast.

This is a setup step. There is not much else to present. Below, you will find our docker configuration.
## dockerfile
Here's the docker file structure
```dockerfile
FROM php:7.2-apache

COPY src/ /var/www/html/
```
### What it does
- Uses already existing image php:7.2-apache because everything needed for this lab is already installed.
- Copy the source folder containing files for static website in /var/www/html/ (server side)

## build-image.sh
This script presents itself as such

```bash
mkdir -p src
cp ../src/* src/ -r

# Build the Docker image locally
docker build --tag dai/http-step1 .

rm -rfv src/*
```

### What it does
- Create directory "src/" if not already existant.
- Remove old files from "src/" folder
- Copy "../src/" to "/src/" because we ware not able to go and serch in "../src/" with a relatif path
- build image in accordance with recommandations from https://hub.docker.com/_/php/

## run-container.sh
Here's our run script

```bash
docker run -p 9090:80 -d --name dai-http-step1 dai/http-step1
```
### What it does
- Run a container based on the created image mapping port 9090 (localhost) to 80 (container)
