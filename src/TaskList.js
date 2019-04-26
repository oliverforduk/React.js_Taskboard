import React, {Component} from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.filterTasks = this.filterTasks.bind(this);
  }
  
  //Filter tasks and asign to TaskItems
  filterTasks(status) {
    const arr = this.props.tasks.filter(t => t.status === status);
    let assignedArr = arr.map(t => (
      <TaskItem
        key={t._id}
        {...t}
        onDelete={this.props.onDelete.bind(this, t._id)}
        onUpdate={this.props.onUpdate.bind(this, t._id)}
        onEdit={this.props.onEdit.bind(this, t._id)}
      />
    ));
    return assignedArr;
  }
  
  render() {
    //Filter tasks into 3 arrays for each status type and asign taskitems
    const openTasks = this.filterTasks('open');
    const undertakenTasks = this.filterTasks('undertaken');
    const completeTasks = this.filterTasks('complete');
    
    return (
      <div class="container">
        <div class="task-col">
          <div class="task-holder open">
            <div class="title">
              To-Do: 
            </div>
            <div class="title-info">
              {openTasks.length}
              { openTasks.length === 1 ?
                <span>task</span>
                :
                <span>tasks</span>
              }
            </div>
            
            {openTasks}
          </div>
        </div>
        
        <div class="task-col">
          <div class="task-holder prog">
            <div class="title">
              In-Progress: 
            </div>
            <div class="title-info">
              {undertakenTasks.length}
              { undertakenTasks.length === 1 ?
                <span>task</span>
                :
                <span>tasks</span>
              }
            </div>
  
            {undertakenTasks}
          </div>
        </div>
        
        <div class="task-col full-col">
          <div class="task-holder com">
            <div class="title">
              Completed: 
            </div>
            <div class="title-info">
              {completeTasks.length}
              { completeTasks.length === 1 ?
                <span>task</span>
                :
                <span>tasks</span>
              }
            </div>
            
            {completeTasks}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;