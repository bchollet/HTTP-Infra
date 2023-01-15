# Step 4: AJAX requests with fetch API

In this step, we focus on working to add dynamic request on our static web page. The goal here is to merge the two different infrastructure so they can communicate. Our static web page will send requests to get pets informations every 10 seconds or so. It will then show these infos accordingly.

There is no specific docker configuration in this step. Most of the work relies in our script [pets.js](https://github.com/bchollet/HTTP-Infra/blob/step-4/http-static/src/js/pets.js).

We also added the jQuery script to this project. It allows us to simplify selections of DOM elements in our page which comes in handy when we try to change the page content in multiple places.
