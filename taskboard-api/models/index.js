var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/taskboard-api", {useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.Task = require("./task");