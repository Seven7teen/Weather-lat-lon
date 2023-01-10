const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res) {

  const lat = req.body.latitude; // names in index.html form
  const lon = req.body.longitude;
  const units = "metric";
  const apiKey = "3668368d2b65cf7b3baedf050b4b0495";
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey +"&units=" +units;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The Weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature at given latitude and longitude is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });

});

app.listen(3000, function() {
  console.log("server is running on port 3000");
})
