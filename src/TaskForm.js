import React, {Component} from 'react';
import './TaskForm.css';

export default class TaskForm extends Component {
  static defaultProps = {
    onClose() {},
  }
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      deadline: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  //Invoke onNewTask with current form state
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    //reset values for form:
    this.setState({
      name: '',
      description: ''
    });
  }
  
  render() {
    const {name, description} = this.state;
    const {onClose} = this.props;
    
    return (
      <div id="task-form-holder">
        <form id="new-task-form" onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="name" 
            value={name}
            onChange={this.handleChange}
            placeholder="Add a task"
            autoFocus
            required 
            maxLength="25"
          />
          
          <button type="submit">Add</button>
          
          <textarea 
            name="description" 
            value={description}
            onChange={this.handleChange}
            placeholder="Add a description"
            form="new-task-form">
          </textarea>
          
        </form>
        
        <div class="back-link">
          <span onClick={onClose}>never mind</span>
        </div>

      </div>
    );
  }
}