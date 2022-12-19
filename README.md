# Report-part5

## Docker
The challenge of this part is to tell Traefik to use Sticky-Session instead of round-robin
for Appache service. Indeed, with stateful protocol, it would be better that the same session
request always end up to the same server.  
It is quite easy to do so with docker compose. There are only two line to add to our existing
docker-compose.yml [appache->labal] :  
 - "traefik.http.services.appache-service.loadBalancer.sticky.cookie=true"
 - "traefik.http.services.appache-service.loadBalancer.sticky.cookie.name=appache_cookie"

These line are simply telling Traefik to use a session cookie for each connexion.
A cookie name is specified to prevent that other services uses the same auto-generated name.
