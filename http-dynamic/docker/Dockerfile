FROM node:18.12.1

WORKDIR /opt/app
COPY src/ /opt/app/

RUN apt-get update && \
apt-get install vim -y

RUN npm install
CMD ["node", "/opt/app/index.js"]
