FROM php:7.2-apache

RUN apt-get update && \
apt-get install vim -y

WORKDIR /var/www/html
COPY src/ /var/www/html/
