FROM node:18.12.1

WORKDIR /opt/app
COPY src/ /opt/app/
COPY package.json /opt/app/
COPY package-lock.json /opt/app/

RUN npm install
CMD ["node", "/opt/app/index.js"]
