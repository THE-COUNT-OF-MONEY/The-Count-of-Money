const express = require('express');
const cors = require('cors');

const app = express();
// var http = require('http');

app.use(cors());

// var app = http.createServer(function(req,res){
// });


app.listen(8000, () => {
  console.log('App server now listening on port 8000');
});

app.get('/test', (req, res) => {
  console.log("gg test success");
  res.setHeader('Content-Type', 'application/json');
  res.json({"foo": "bar"});
  res.send();
  // res.end(JSON.stringify({ a: 1 }));

});

app.get('/', (req, res) => {
  console.log("gg");
  res.setHeader('Content-Type', 'application/json'); // || res.type('json')
  res.json({"foo": "bar"});
  res.send();
});
