var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var app = express();

var port = process.env.PORT || 8080;
var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log(req.body)

    if (req.body.result.action == "weather"){


        var city = req.body.result.parameters.city;
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=28e56a85095209400594045b5bedef23";
        request(url, function(error, reponse, body){
            var temp = Math.round(JSON.parse(body).main.temp -273.15);
            var responseText = "Temperature in"+ city + "is" +temp+ "degrees centigrade.";
            res.json({ "speech": responseText, "displayText":responseText})
        })
    }



})


app.listen(port, ip);