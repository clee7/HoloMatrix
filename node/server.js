

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var SpeechToText = express.Router();

//

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/', function(req, res) {

        var options = {
    "method": "POST",
    "hostname": "westus.api.cognitive.microsoft.com",
    "port": null,
    "path": "/vision/v1.0/analyze?visualFeatures=Categories&language=en",
    "headers": {
        "ocp-apim-subscription-key": "19a88d6de741408eadf0734508969723",
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "72a0476e-3dfc-f955-4576-eee2894c0bfd"
    }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ url: 'https://qph.ec.quoracdn.net/main-qimg-493968e878889ae5dd7927881e87275f-c' }));
req.end();

});


app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);