// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get('/api/timestamp/:dateString?', (req,res) => {
 const dateString = req.params.dateString //here we are saving the query
 let date
 //If the date string is empty, t should be equivalent to new Date() to return the
 //current time in unix format and utc format 
 if(!dateString){
  date = new Date()
 } else {
  //if dateString is not empty
  //if dateString si not integer, convert it into string
  if(!isNaN(dateString)){
    date = new Date(parseInt(dateString))
  } else{
    date = new Date(dateString)
  }
 }
 //If the dateString is invalid the api returns an error JSON -> {"error": "Invalid Date"}
 if(date.toString() === 'Invalid Date'){
  res.json({error : date.toDateString()})
 } else {
  // if the date string is valid the api returns a JSON like this format
  //{"unix": date.getTime(), "utc": date.toUTCString()}
  res.json({unix: date.getTime(), utc: date.toUTCString()})
 }
})