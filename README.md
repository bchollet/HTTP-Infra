# Part 5 : Load-Balancing - round-robin and sticky session

The challenge of this part is to tell Traefik to use Sticky-Session instead of round-robin
for Appache service. Indeed, with stateful protocol, it would be better that the same session
request always end up to the same server.  
It is quite easy to do so with docker compose. There are only two line to add to our existing
docker-compose.yml [appache->label] :  

```dockerfile
- "traefik.http.services.appache-service.loadBalancer.sticky.cookie=true"
- "traefik.http.services.appache-service.loadBalancer.sticky.cookie.name=appache_cookie"
```

These line are simply telling Traefik to use a session cookie for each connexion.
A cookie name is specified to prevent that other services uses the same auto-generated name.

Here's the full docker-compose.yml file

```dockerfile
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
