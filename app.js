var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Contests",{useNewUrlParser:true , useUnifiedTopology:true ,  useFindAndModify: false });
const ong = require('./src/utils/ong_utils');
const up = require('./src/utils/up_utils');

var CC = require('./CodeChef.js');
var CF = require('./CodeForces.js');
var TC = require('./TopCoder.js');
var HR = require('./HackerEarth.js');
var CF = require('./LeetCode.js');
var CF = require('./GoogleCoder.js');
var HR = require('./HackerRank.js');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("Front-page");
});

app.get('/ongoing', async (req, res) => {
  try{
      const data = await ong()
      return res.render("Ongoing", { data: JSON.stringify(data) })
  }
  catch{
      console.error('Something went wrong!');
  }
});

app.get('/upcoming', async (req, res) => {
  try{
      const data = await up()
      return res.render("Upcoming", { data: JSON.stringify(data) })
  }
  catch{
      console.error('Something went wrong!');
  }
});

app.get('/about',(req,res) => {
  res.render("About");
});

app.listen(1800, function () {
  console.log("Server started!");
});