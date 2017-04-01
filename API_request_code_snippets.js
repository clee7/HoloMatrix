//Emotion API
var request = require("request");

var options = { method: 'POST',
  url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  headers: 
   { 'postman-token': 'b51edbec-e2e9-1aa0-e3a5-fdc9666f06c8',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'ocp-apim-subscription-key': '8cfb371bd1504f2991b338821d8aceb0' },
  body: { url: 'https://scontent.xx.fbcdn.net/v/t31.0-8/17493225_399859400396094_574125709913969201_o.jpg?oh=37cf0efe24112ced83914a8132abb93d&oe=5996ACBF' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

//Face API (with age, gender, smile, emotions)
var request = require("request");

var options = { method: 'POST',
  url: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect',
  qs: 
   { returnFaceId: 'true',
     returnFaceLandmarks: 'false',
     returnFaceAttributes: 'age,gender,smile,emotion' },
  headers: 
   { 'postman-token': 'dd6cd82d-9a7b-ce01-0b93-c49d3d3f9cdd',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'ocp-apim-subscription-key': '02f51053e13b481d96e2c2aca0144862' },
  body: { url: 'https://pbs.twimg.com/media/CfCtHAzUYAAzJf4.jpg' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

//Computer Vision API
//Not very good at searching objects/products
var request = require("request");

var options = { method: 'POST',
  url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze',
  qs: 
   { visualFeatures: 'categories,tags,faces, description',
     details: 'celebrities' },
  headers: 
   { 'postman-token': 'b1ff01f6-4e84-e408-941f-3e659249ad63',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     'ocp-apim-subscription-key': '19a88d6de741408eadf0734508969723' },
  body: { url: 'https://scontent.xx.fbcdn.net/v/t1.0-9/17634511_10212562214908274_8658475386274937706_n.jpg?oh=0e72a6a79a4cea5593616c1a7dd89e0d&oe=594EAFE1' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

