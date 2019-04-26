import React, {Component} from 'react';
import Navbar from './Navbar';
import TaskFormButton from './TaskFormButton';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './TaskBoard.css';
import * as apiCalls from './api.js';

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      tasks: []
    };
    
    //Load the current tasks from DB
    this.loadTasks();

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  //API CALLS:
  
    //Load current task from DB
    async loadTasks() {
      let tasks = await apiCalls.getTasks();
      this.setState({tasks});
    }
    
    //Add a task to DB
    async addTask({name, description, deadline}) {
      let newTask = await apiCalls.createTask(name, description, deadline);
      this.setState({
        tasks: [...this.state.tasks, newTask],
        showForm: false
      });
    }
    
    //Remove a task
    async removeTask(id) {
      await apiCalls.removeTask(id);
      const tasks = this.state.tasks.filter(task => task._id !== id);
      this.setState({tasks});
    }
    
    //Update just a task's status
    async updateStatus(id, newStatus) {
      let updatedTask = await apiCalls.updateStatus(id, newStatus);
      const tasks = this.state.tasks.map(t => 
      (t._id === updatedTask._id) ?
        {...t, status: newStatus}
        : t
      );
      this.setState({tasks: tasks});
    }
    
    //Update entire task
    async updateTask(id, newStatus, newName, newDescription) {
      let updatedTask = await apiCalls.updateTask(id, newStatus, newName, newDescription);
      const tasks = this.state.tasks.map(t =>
        (t._id === updatedTask._id) ?
          {...t, status: newStatus, name: newName, description: newDescription}
          : t
      );
      this.setState({tasks: tasks});
    }
  
  render() {
    const showForm = this.state.showForm;
    
    return (
      <div class="page">
        <Navbar />
          
          {showForm ?
            <TaskForm 
              onSave={this.addTask}
              onClose={() => this.setState({showForm: false})}
            />
            : 
            <TaskFormButton
              onNewTask={() => this.setState({showForm: true})}
            />
          }
          
        <TaskList 
          tasks={this.state.tasks}
          onDelete={this.removeTask}
          onUpdate={this.updateStatus}
          onEdit={this.updateTask}
        />
      </div>
    );
  }
}

export default TaskBoard;