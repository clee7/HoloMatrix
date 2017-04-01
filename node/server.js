

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

        var url = req.body.url;
        
        var request = require("request");

        var options = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect',
        qs: { returnFaceId: 'true', returnFaceLandmarks: 'false' },
        headers: 
        { 'postman-token': 'd6f02425-e41e-6b9b-1e81-e1e693f5d347',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '02f51053e13b481d96e2c2aca0144862' },
        body: { url: req.body.url },
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        });

});


app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);