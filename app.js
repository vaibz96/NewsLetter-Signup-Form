// jshint esversion :6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){
  var firstName = req.body.fn;
  var lastName = req.body.ln;
  var email = req.body.mail;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/f9937b7ada",
    method: "POST",
    headers: {
      "Authorization": "vaibz96 5061574e49ac6eca8d5fae7e24af0c30-us3"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error){
      res.sendFile(__dirname+"/failure.html");
    }else{
      if (response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


//unique id
//f9937b7ada


//API key
//5061574e49ac6eca8d5fae7e24af0c30-us3
