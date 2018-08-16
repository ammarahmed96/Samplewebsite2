let express = require("express");
let app = express();
let path = require("path");
let serveStatic = require("serve-static");
let fs = require('fs');

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/",function(req, res){
    res.sendFile(path.join(__dirname+'/main.html'))
});

app.get("/test",function(req, res){
    res.sendFile(path.join(__dirname+'/testing.html'))
});

app.post('/profile', upload.array(), function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
    fs.writeFile(__dirname+'/data.txt', JSON.stringify(req.body), function () {
        res.end();
    });
});

app.listen(3000, function(){
    console.log("Server is started on port 3000");
})