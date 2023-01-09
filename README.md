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
