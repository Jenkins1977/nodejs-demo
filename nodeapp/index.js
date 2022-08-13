var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Hello, Welcome to Rahul Tewari "/s web page" }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World at my website" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works! Wow!!" }');
});
app.listen(process.env.PORT || 3000);
module.exports = app;
