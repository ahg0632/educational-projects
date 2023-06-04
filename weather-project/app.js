const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const { request } = require("http");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/index.html", function(req, res) {
    const city = req.body.cityName;
    const apikey = "611f6c5d635068cad0d44d0b740e2956";
    const unit = "imperial";

    const url = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=" + apikey + "&q=" + city + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The weather is currently " + weatherDescription + ".</h1>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Farenheit.</h1>");
            res.write("<img src="+ imageurl +">");
            res.send();
        })
    })

    console.log("Post Acquired");
});




app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})