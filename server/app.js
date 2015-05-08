var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');




var picPath = path.join(__dirname,'../pics');
var indexHtmlPath = path.join(__dirname, '../index.html')
var bowerPath = path.join(__dirname, '../bower_components');
var browserPath = path.join(__dirname, '../browser');

app.listen(1337);
app.use(express.static(picPath));
app.use(express.static(bowerPath));
app.use(express.static(browserPath));



app.get('/', function(req, res, next){

        res.sendFile(indexHtmlPath);

});

app.get('/pics', function(req, res, next){

    fs.readdir('../pics', function(err, contents) {
        res.send(contents);
    });
});
