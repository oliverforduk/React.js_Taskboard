import React, {Component} from 'react';
import './TaskForm.css';

export default class TaskForm extends Component {
  static defaultProps = {
    onNewTask() {}
  }
  
  render(){
    return (
      <div id="task-form-holder" onClick={this.props.onNewTask}>
        <input 
          type="text"
          placeholder="Add a task"
        />
        <button>Add</button>
      </div>
    );
  }
}
