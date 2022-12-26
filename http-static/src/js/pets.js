$(function() {
    //Function declaration
    function loadPets() {
        let pet = [];
        let petGender;

        fetch('http://localhost/api') // Returns HTTP Response as a Promise
            .then((response) => response.json()) // Extracts body of HTTP response as a Promise
            .then((data) => pet = data[0]);  // Get the raw data from body
        
        if(pet.length > 0) {
            $('#first-name-span').text(pet.firstName);
            $('#type-p').text('I am a cute little ' + pet.type);

            petGender = pet.gender === 'Male' ? 'assets/img/male.jpg' : 'assets/img/female.jpg';
            console.log('path to img: ', petGender);

            $('#gender-img').attr('src', petGender);
            $('#age-p').text(pet.age);
            $('#weight-p').text(pet.weight);
        } else  {
            $('#first-name-span').text('No pet loaded :(');
        }
    }

    //Function call
    setInterval(loadPets(), 10000);
});