# Introduction

Welcome to our repsoitory of our HTTP infrastructure. Below, you will find all our documentation of every step. You can navigate and see the developpement of this application step by step by simply chosing the corresponding branch (branch step-1 is for the first step, and so on...). The master branch contains the final version of the project which corresponds to the end of step 6.

Enjoy playing with it !

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

# Step 2: Dynamic HTTP server with express.js
Here, we have implemented a web API with express.js returning a payload of a random number of pets. Each pets contains different informations that are also generated randomly using ChanceJS.

Express.js is a javascript framework built specifically to run web application. Its most common use is to developp backend application such as API.

Here's how each element of the payload is generated. Note that since chanceJS does not allow pet name generation, we used Italians name to spice things up.

```javascript
let gender = chance.gender();
let weight = chance.floating({
    min: 3,
    max: 25,
    fixed: 2
});
pets.push({
    type: chance.animal({type: 'pet'}),
    firstName: chance.first({
        gender: gender,
        nationality: 'it'
    }),
    gender: gender,
    age: chance.age({type: 'child'}),
    weight: weight
});
```

Here's an exemple of what the API returns
```json
{
  "type": "Rabbit",
  "firstName": "Claudio",
  "gender": "Male",
  "age": 4,
  "weight": 2.5
}
```
Each call to this API will re-generate an array of 0 to 10 pets.

This is also a setup step, 
## dockerfile
```dockerfile
FROM node:18.12.1

WORKDIR /opt/app
COPY src/ /opt/app/

RUN npm install
CMD ["node", "/opt/app/index.js"]
```
### What it does
- Using already existing image node:18.12.1 (latest stable version) so it contains all of the necessary tools
- Copy files from src/ to /opt/app on the container side
- Install npm depedencies via "RUN npm install" (package.json file copied in /opt/app)
- Launch command node /opt/app/index.js at startup

## build-image.sh
```bash
mkdir -p src
cp ../src/* src/ -r
cp ../package.json src/
cp ../package-lock.json src/

# Build the Docker image locally
docker build --tag dai/http-step2 .

rm -rfv src/*
```
### What it does
- Same process as the previous step

## run-image.sh
```bash
docker run -p 9090:3000 -d --name dai-http-step2 dai/http-step2
```
### What it does
- Same process as the previous step. Mapping port 9090 on 3000 on the container side.

# Step 3 : Docker compose, Reverse proxy with Traefik, Dynamic cluster management

This part requires the usage of docker compose to work properly.
Docker compose is a tool used to create and run multi-container Docker applications.
The goal is to use different docker images and to create a container running all of these
images.

It is quite useful to simulate complex networking architecture.

In our case, the goal is to build a container that contains the following services running :
 - Static web server (Appache)
 - Dynamic web server (Node JS)
 - Load balancer (Traefik)

To use docker compose, you need to have the required tools installed on your computer and
to create a docker-compose.yml file containing the services' architecture instructions.
Then, you can build and run your container with "docker compose up" (execute in the same
folder as docker-compose.yml file).

The yml file contains some information about each service that we will get through

```yaml
version: "3.0"
services:
    reverse-proxy:
        image: traefik:v2.9
        # Enables the web UI and tells Traefik to listen to docker
        command: --api.insecure=true --providers.docker
        ports:
          # Static HTTP port
          - "80:80"
          # Traefik web interface
          - "8080:8080"
        volumes:
          # Ability to listen docker evenets
          - /var/run/docker.sock:/var/run/docker.sock
    appache:
        build: ./http-static
        ports:
            - "80"
        labels: 
            - "traefik.http.routers.static.rule=Host(`localhost`)"
        deploy:
            replicas: 2
    nodejs:
        build: ./http-dynamic
        ports:
            - "3000"
        labels: 
            - "traefik.http.routers.dynamic.rule=(Host(`localhost`) && PathPrefix(`/api`))"
        deploy:
            replicas: 3
```
### Traefik
The image is downloaded directly from docker hub [image].  
Then a command is executed to enable traefik management console interface [command].  
Afterwhat, port usage for classic web service as well as management web interface are set [ports].  
The last part is to give traefik the ability to listen to Docker events [volume].

### Appache
The image is built from dockerfile made in previous parts of this lab [build].  
Used ports are set [ports].  
A traefik rule is set to redirect requests made to localhost/ to the appache server [label].  
Several instances of the Appache server are made (2) [deploy].

### NodeJS 
The image is built from dockerfile made in previous parts of this lab [build].  
Used ports are set [ports].  
A traefik rule is set to redirect requests made to localhost/api to the nodejs server [label].  
Several instances of the NodeJS server are made (3) [deploy].


# Step 4: AJAX requests with fetch API

In this step, we focus on working to add dynamic request on our static web page. The goal here is to merge the two different infrastructure so they can communicate. Our static web page will send requests to get pets informations every 10 seconds or so. It will then show these infos accordingly.

There is no specific docker configuration in this step. Most of the work relies in our script [pets.js](https://github.com/bchollet/HTTP-Infra/blob/step-4/http-static/src/js/pets.js).

We also added the jQuery script to this project. It allows us to simplify selections of DOM elements in our page which comes in handy when we try to change the page content in multiple places.

# Part 5 : Load-Balancing - round-robin and sticky session

The challenge of this part is to tell Traefik to use Sticky-Session instead of round-robin
for Appache service. Indeed, with stateful protocol, it would be better that the same session
request always end up to the same server.  
It is quite easy to do so with docker compose. There are only two line to add to our existing
docker-compose.yml [appache->label] :  

```yaml
- "traefik.http.services.appache-service.loadBalancer.sticky.cookie=true"
- "traefik.http.services.appache-service.loadBalancer.sticky.cookie.name=appache_cookie"
```

These line are simply telling Traefik to use a session cookie for each connexion.
A cookie name is specified to prevent that other services uses the same auto-generated name.

Here's the full docker-compose.yml file

```yaml
version: "4.0"
services:
    reverse-proxy:
        image: traefik:v2.9
        # Enables the web UI and tells Traefik to listen to docker
        command: --api.insecure=true --providers.docker
        ports:
          # Static HTTP port
          - "80:80"
          # Traefik web interface
          - "8080:8080"
        volumes:
          # Ability to listen docker evenets
          - /var/run/docker.sock:/var/run/docker.sock
    appache:
        build: ./http-static
        ports:
            - "80"
        labels: 
            - "traefik.http.routers.static.rule=Host(`localhost`)"
            - "traefik.http.services.appache-service.loadBalancer.sticky.cookie=true"
            - "traefik.http.services.appache-service.loadBalancer.sticky.cookie.name=appache_cookie"
        deploy:
            replicas: 2
    nodejs:
        build: ./http-dynamic
        ports:
            - "3000"
        labels: 
            - "traefik.http.routers.dynamic.rule=(Host(`localhost`) && PathPrefix(`/api`))"
        deploy:
            replicas: 3
```

# Step 6: Management UI

We opted for the easiest solution here by installing an already existing app called [portainer](https://www.portainer.io/). It allows us to quickly add a whole management UI by only modifying our docker compose file. 

## Docker

Here is what we added to create a portainer instance in our docker compose file

```yaml
    portainer:
        image: portainer/portainer-ce:latest
        container_name: portainer
        ports:
            - "9000:9000"
        restart: always
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
```
