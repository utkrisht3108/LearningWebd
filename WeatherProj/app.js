const express = require("express");
const https = require('https');

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
})
app.post("/temp",function(req,res){
     var place = (req.body.city);
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid=291ac785582939fa1c7b5383a5a24fba&units=metric";
     // console.log(url)
     https.get(url,(response)=>{
          console.log(response.statusCode);
          
          response.on("data",(data)=>{
               const weatData = JSON.parse(data);
               console.log(weatData);
               const temp = weatData.main.temp;
               const des = weatData.weather[0].description;
               
               const icon = weatData.weather[0].icon;
               const imgURL = "http://openweathermap.org/img/wn/"+icon +"@2x.png"
               res.write("<h1>The Temperature in "+ weatData.name+ " is " + temp + " degree celsius.</h1>")
               res.write("<h3>The weather Description in " + weatData.name + " is " + des + ".</h3>")
               res.write("<p>Feels like "+weatData.main.feels_like+"</p>")
               res.write("<p>MIN Temp today will be "+weatData.main.temp_min+", and MAX temp will be "+weatData.main.temp_max+" </p>")
               res.write("<img src="+imgURL+">")
               res.send()
          })
     })
});

app.listen(3000,function(){
     console.log("kaam 25 chalu");;
});