var db = require("../models");

exports.getTasks = function(req, res) {
  db.Task.find()
  .then(function(tasks){
    res.json(tasks);
  })
  .catch(function(err){
    res.send("Error: " + err);
  });
};

exports.createTask = function(req, res) {
  db.Task.create(req.body)
  .then(function(newTask){
    res.status(201).json(newTask);
  })
  .catch(function(err){
    res.send("Error: " + err);
  });
};

exports.getTask = function(req, res) {
  db.Task.findById(req.params.taskId)
  .then(function(foundTask){
    res.json(foundTask);
  })
  .catch(function(err){
    res.send("Error: " + err);
  });
};

exports.updateTask = function(req, res) {
  db.Task.findOneAndUpdate({_id: req.params.taskId}, req.body)
  .then(function(task){
    res.json(task);
  })
  .catch(function(err){
    res.send("Error: " + err);
  });
};

exports.deleteTask = function(req, res) {
  db.Task.deleteOne({_id: req.params.taskId})
  .then(function(){
    res.json({message: "Task Deleted"});
  })
  .catch(function(err){
    res.send("Error: " + err);
  });
};

module.exports = exports;