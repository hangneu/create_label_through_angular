var express = require("express");
var app = express();
app.use(express.static(__dirname+"/public"));
require("./public/todo.js")(app);
app.listen(4002);