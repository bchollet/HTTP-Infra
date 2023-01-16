let Chance = require('chance');
let express = require('express');
let http = require('http');

let chance = new Chance();
let app = express();

app.get('/api', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.send(generateImaginaryPets());
});

app.listen(3000, () => {
    console.log('Accepting HTTP requests on port 3000');
});

function generateImaginaryPets() {
    let numberOfImaginaryPets = chance.integer({
        min: 0,
        max: 10
    });

    console.log("number of generated pets: ", numberOfImaginaryPets);
    
    let pets = [];

    for(let i = 0; i < numberOfImaginaryPets; i++) {
        let gender = chance.gender();
        let weight = chance.floating({
            min: 3,
            max: 25,
            fixed: 2
        })
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
    }
    console.table(pets);
    return pets;
}