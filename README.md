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

```dockerfile
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

