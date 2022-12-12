# Docker
## dockerfile
Using already existing image node:18.12.1 (latest stable version) so it contains all of the necessary tools
Copy files from src/ to /opt/app on the container side
Launch command node /opt/app/index.js at startup

## build-image.sh
Same process as the previous step

## run-image.sh
Same process as the previous step. Mapping port 9090 on 3000 on the container side.
