

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
var faceRec = express.Router();

//

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/', function(req, res) {

        console.log(req.body);
        //res.json(req.body);
        
        var request = require("request");

        var options = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en',
        qs: { visualFeatures: 'Categories', language: 'en' },
        headers: 
        { 'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '19a88d6de741408eadf0734508969723' },
        body: { url : req.body },
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(body);


        });

});

router.post('/', function(req, res) {

        console.log(req.body);
        //res.json(req.body);
        
        var request = require("request");

        var options = { method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze',
        qs: { visualFeatures: 'categories, faces, adults, imageType, color, tags, description', details: 'celebrities'},
        headers: 
        { 'postman-token': '306ef2f3-2ccf-128b-b975-d7fef6d4d8ff',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'ocp-apim-subscription-key': '19a88d6de741408eadf0734508969723' },
        body: { url : req.body },
        json: true };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.json(body);


        });

});





app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);