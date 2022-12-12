# Hello World !

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
