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
