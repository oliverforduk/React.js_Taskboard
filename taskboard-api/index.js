var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    
var taskRoutes = require("./routes/tasks");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use("/api/tasks", taskRoutes);

app.get("/", function(req, res){
  res.sendFile("index.html");
});
    
app.listen(process.env.PORT, function(){
  console.log("Taskboard API now runing on port: " + process.env.PORT);
});