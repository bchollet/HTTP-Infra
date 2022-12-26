fetch('http://localhost:9091')
  .then((response) => response.json())
  .then((data) => console.log(data));