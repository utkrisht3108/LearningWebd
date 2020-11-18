//jshint esversion:6

//making const and requiring these 4 modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

//creating new app instant using express
const app = express();

//setting view engine  to use EJS(template engine)
app.set('view engine', 'ejs');

//body-parser to pass our requests
app.use(bodyParser.urlencoded({extended: true}));
//public dir to store static files such as images,css
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true })

const articleSchema = {
     title: String,
     content: String
}

const Article = mongoose.model("Article",articleSchema);

//////////////////////////ROUTE TO ALL ARTICLES///////////////////////////
app.route("/articles")
     .get(function(req,res){
          Article.find(function(err,found){
               // console.log(found);
               if(!err){
               res.send(found)
               }else{
                    res.send(err);
               }
          })
     })
     .post(function(req,res){
          const newArticle  = new Article({
               title: req.body.title,
               content: req.body.content
          })
          newArticle.save(function(err){
               if(!err){
                    res.send("partyyy");
               }else{
                    res.send(err);
               }
          });
     })
     .delete(function(req,res){
          Article.deleteMany(function(err){
               if(!err){
                    res.send("sab delete hogaya")
               }else{
                    res.send(err);
               }
          })
     });

///////////////////////////ROUTE TO SPECIFIC ARTICLE//////////////////////////
app.route("/articles/:articleTitle")
     .get(function(req,res){
          Article.findOne({title: req.params.articleTitle},function(err,found){
               if(found){
                    res.send(found)
               }else{
                    res.send("nai hai aisa koi")
               }
          })
     })
     .put(function(req,res){
          Article.update(
               {title: req.params.articleTitle},
               {title: req.body.title, content: req.body.content},
               {overwrite: true},
               function(err){
                    if(!err){
                         res.send("hogaya update");
                    }else{
                         res.send(err);
                    }
               }
          )
     })
     .patch(function(req,res){
          Article.update(
               {title: req.params.articleTitle},
               {title: req.body.title, content: req.body.content},
               {$set: req.body},
               function(err){
                    if(!err){
                         res.send("hogaya update ye wala");
                    }else{
                         res.send("nai hua");
                    }
               }
          )
     })
     .delete(function(req,res){
          Article.deleteOne({title: req.params.articleTitle},function(err){
               if(!err){
                    res.send("ye delete hogaya")
               }else{
                    res.send(err);
               }
          })
     });

//TODO
app.listen(3000, function() {
  console.log("Server started on port 3000");
});