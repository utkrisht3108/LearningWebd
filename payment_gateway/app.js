const express = require("express");
const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })); //layout that wraps around the views should be called main.handlebars
app.set("view engine", "handlebars");

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(`${__dirname}/public`));

//index route
app.get("/", (req, res) => {
  res.render("index", {
    stripePublishableKey: keys.stripePublishableKey,
  });
});

//////////
//charge route
app.post("/charge", (req, res) => {
  const amount = 500;
  // console.log(req.body);
  // res.send("HII");
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: "mera paisa",
        currency: "inr",
        customer: customer.id,
      })
    )
    .then((charge) => res.render("success"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server stared on port ${port}`);
});
