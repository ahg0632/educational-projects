const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { Server } = require("http");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const rEmail = req.body.sEmail;

    console.log(firstName, lastName, rEmail);

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "failure.html");
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server Running");
});