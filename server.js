var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pl=require('pg');
var http = require("http");

var app = express();

var config={
    host:'http://db.imad.hasura-app.io',
   
    port:'5432',
    user:'pravinrathod',
    password:'db-pravinrathod-11801',
    database:'pravinrathod'
};
var pooll=new Pl.Pool(config);
app.get('/testdb',function(req,res){
    pooll.query('SELECT * FROM category',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
        
    });
});


app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var counter=0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});
function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input, slat, 100000, 512, 'sha512');
    return hashed;
}
app.get('/hash/:input',function(req,res){
    var hash=hash(req.params.input,'slat');
    res.send(hash.toString());
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
