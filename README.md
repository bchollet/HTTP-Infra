# Report-part3

## docker-compose
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

The first service is Traefik. This one has the most to talk about :  
The image is downloaded directly from docker hub [image].  
Then a command is executedto enable traefik management console interface [command].  
Afterwhat, port usage for classic web service as well as management web interface are set [ports].  
The last part is to give traefik the ability to listen to Docker events [volume].

Next service is Appache :  
The image is built from dockerfile made in previous parts of this lab [build].  
Used ports are set [ports].  
A traefik rule is set to redirect requests made to localhost/ to the appache server [label].  
Several instances of the Appache server are made (2) [deploy].

Last service is NodeJS :  
The image is built from dockerfile made in previous parts of this lab [build].  
Used ports are set [ports].  
A traefik rule is set to redirect requests made to localhost/api to the nodejs server [label].  
Several instances of the NodeJS server are made (3) [deploy].

