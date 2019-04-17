//Used for testing while developing API

//Upon page load:
//Update status of task
$(document).ready(function() {
  //Get all tasks & append to page
  $.getJSON("/api/tasks")
  .then(addTasks);
  
  //Add a task to db
  $("#new-task-form").on("submit", function(){
    createTask();
  });
  
  //Delete a task from db
  $("#task-output").on("click", "span", function(event){
    event.stopPropagation();
    removeTask($(this).parent());
  });
  
  //Update buttons:
  //Status - open
  $("#task-output").on("click", ".open", function(event){
    event.stopPropagation();
    changeStatus($(this).parent(), 'open');
  });
  //Stasus - undertaken
  $("#task-output").on("click", ".undertaken", function(event){
    event.stopPropagation();
    changeStatus($(this).parent(), 'undertaken');
  });
  //Status - completed
  $("#task-output").on("click", ".completed", function(event){
    event.stopPropagation();
    changeStatus($(this).parent(), 'completed');
  });
});

//Add tasks to list
function addTasks(tasks) {
  tasks.forEach(function(task) {
    addTask(task);
  });
}

//Output a single task
function addTask(task) {
  var newTask = $(
      "<li>" + task.name + task.description + task.deadline + " currently: " + task.status +
      " <button class='open'>OPEN</button><button class='undertaken'>UNDERTAKEN</button><button class='completed'>COMPLETED</button><span>X</span></li>");
  newTask.data("id", task._id);
  newTask.data("status", task.status);
  $("#task-output").append(newTask);
}

//Create a task
function createTask() {
  //Send post request to /api/tasks
  var formName = $("#form-name").val();
  var formDesc = $("#form-description").val();
  var formDl = $("#form-deadline").val();
  $.post("/api/tasks", {name: formName, description: formDesc, deadline: formDl})
  .then(function(newTask){
    addTask(newTask);
    $("#new-task-form").trigger("reset");
  })
  .catch(function(err){
    console.log(err);
  });
}

//Remove a task
function removeTask(task) {
  var clickedId = task.data("id");
  var deleteUrl = "/api/tasks/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  })
  .then(function(data){
    task.remove();
  });
}

//Status changes: tasks start 'open', can also be 'undertaken', & 'complete'
function changeStatus(task, status) {
  var updateUrl = "/api/tasks/" + task.data("id");
  var updateData = {status: status};
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTask){
    location.reload(); 
  });
}

