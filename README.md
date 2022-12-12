# Report-part1

## dockerfile
Uses already existing image php:7.2-apache because everything needed for this lab is already installed.
Copy the source folder containing files for static website in /var/www/html/ (server side)

## build-image.sh
-> Create directory "src/" if not already existant.
-> Remove old files from "src/" folder
-> Copy "../src/" to "/src/" because we ware not able to go and serch in "../src/" with a relatif path
-> build image in accordance with recommandations from https://hub.docker.com/_/php/

## run-container.sh
Run a container based on the created image mapping port 9090 (localhost) to 80 (container)

# Docker

## dockerfile
Using already existing image node:18.12.1 (latest stable version) so it contains all of the necessary tools
Copy files from src/ to /opt/app on the container side
Install nmp depedencies via "RUN npm install" (package.json file copied in /opt/app)
Launch command node /opt/app/index.js at startup

## build-image.sh
Same process as the previous step

## run-image.sh
Same process as the previous step. Mapping port 9090 on 3000 on the container side.

