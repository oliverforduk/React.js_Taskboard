var express = require("express"),
    router = express.Router(),
    db = require("../models"),
    helpers = require("../helpers/tasks");
    
//Show all tasks & post a task
router.route("/")
  .get(helpers.getTasks)
  .post(helpers.createTask);
  
//Get a task, update task, & delete task
router.route("/:taskId")
  .get(helpers.getTask)
  .put(helpers.updateTask)
  .delete(helpers.deleteTask);
  
module.exports = router;