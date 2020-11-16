//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const app = express();
const date = require(__dirname+"/date.js");
const _ = require("lodash");

// console.log(date);
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

// A Mongoose schema defines the structure of the document,\
// default values, validators, etc
const itemsSchema = new mongoose.Schema({
  name: String
})

//Mongoose model provides an interface to the database for
//creating, querying, updating, deleting records, etc
const Item = mongoose.model("Item",itemsSchema) 

const item1 = new Item({
  name: "Utkrisht 1"
});
const item2 = new Item({
  name: "Utkrisht 2"
});
const item3 = new Item({
  name: "Utkrisht 3"
});

const defaultItems = [item1,item2,item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}
const List = mongoose.model("list",listSchema)


app.get("/", function(req, res){
  let day = date.getDate();
  Item.find({},function(err,found){
    if(found.length==0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("hogaya");
        }
      })
      res.redirect("/")
    }else{
      res.render("list", {listTitle: "Today", newListItems: found})
    }
  // console.log(found);
  })
});

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name:customListName},function(err,found){
    if(!err){
      if(!found){
        // console.log("nahi hai");
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save();
        res.redirect("/"+customListName)
      }else{
        // console.log("hai bhai");
        res.render("list",{listTitle: found.name, newListItems: found.items})
      }
    }
  });

  
})

app.post("/", function(req,res){
    let itemName = req.body.newItem;
    let listName = req.body.list;
    const item = new Item({
      name: itemName
    })
    if(listName=="Today"){
      item.save();
      res.redirect("/");
    }else{
      List.findOne({name: listName},function(err,found){
        found.items.push(item);
        found.save();
        res.redirect("/"+listName);         
      });
    }
  })

app.post("/delete",function(req,res){
  const itemId =  req.body.checkbox;
  const listName = req.body.listName;
  if(listName=="Today"){
    Item.findByIdAndRemove(itemId,function(err){
      if(!err){
        console.log("no error");
        res.redirect("/")
      }else{
        console.log(err);
      }
    })
  }else{
    //find list by using findOneandUpdate
    //1- First we give the query/condition jisme changes karne hai
    //2- Second we give the update,ham use kar rhe hai pull(operator hai jiske value hogi the field from where we have to pull from which is an array)
    // jisme ham uske items mai jaake find karenge ki kiska id Item id hai(matlab array ke konse item ko update karna hai)
    //WE WANT TO PULL FROM A PARTICULAR ARRAY, AND THE WAY WE FIND THE ITEM INSIDE THE ARRAY IS THROUGH IT'S ID.
    //3- phir callback aayega and agar koi errror nai hai toh redirect kar dega
    List.findOneAndUpdate({name: listName},{ $pull: {items: {_id: itemId}}},function(err,found){
       if(!err){
        console.log("no error");
        res.redirect("/"+listName)
      }else{
        console.log(err);
      }
    })
  }
})

// app.post("/",function(req,res){
//   item = req.body.newItem;
//   console.log(item);
// })

app.get("/work",function(req,res){
  res.render("list",{listTitle: "Work List", newListItems: workItems})
})

app.post("/work",function(req,res){
  let item = req.body.newItem
  workItems.push(item)
  res.redirect("/work")
})

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
