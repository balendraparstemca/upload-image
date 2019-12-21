var express = require("express");
var multer = require("multer");

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.png');
    }
})
var upload = multer({ storage: storage }).single('userPhoto');

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/profile', function (req, res) {
    debugger
    upload(req, res, function (err) {
        if (err) {
            res.json({"status":false,"message":"pic uploaded failed"});
        }
        res.json({"status":true,"message":"pic uploaded successfully"});
    })
})

app.listen(8080);
console.log("Server Listening the port no.8080");