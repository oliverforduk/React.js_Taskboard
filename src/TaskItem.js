import React, {Component} from 'react';
import './TaskItem.css';
import { Spring } from 'react-spring/renderprops';

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      editForm: false,
      editName: '',
      editDescription: '',
      editStatus: ''
    };
    
    this.renderItem = this.renderItem.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.populateForm = this.populateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  //Sets up a task's edit form
  populateForm() {
    const {name, description, status} = this.props;
    this.setState({
      editName: name,
      editDescription: description,
      editStatus: status,
      editForm: true
    });
  }
  
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const {editName, editDescription, editStatus} = this.state;
    //send api call to update task with state
    this.props.onEdit(editStatus, editName, editDescription);
    this.setState({
      editForm: false,
      editName: '',
      editDescription: '',
      editStatus: ''
    });
  }
  
  //A task's edit form
  renderForm() {
    //get values from state
    const {editName, editDescription, editStatus} = this.state; 
    return (
      <div>
        <div class="top-bar"></div>
        <div class="task edit-form">
          
          <div class="options">
            <div class="options-wrapper">
              <span class="options-holder">
                <div class="align-right">
                <div class="edit-dot"></div>
                <div class="edit-dot"></div>
                <div class="edit-dot"></div>
                </div>
                <ul class="option-lis">
                  <li onClick={() => this.setState({editForm: false})}>Cancel</li>
                </ul>
              </span>
            </div>
          </div>
          
          <form id="edit-task-form" onSubmit={this.handleSubmit}>
            <div class="section-title">edit:</div>
            <input 
              class="edit-form-name"
              type="text" 
              name="editName"
              value={editName}
              onChange={this.handleChange}
              autoFocus
              maxLength="25"
            />
            <textarea
              class="edit-form-desc"
              name="editDescription"
              onChange={this.handleChange}
            >
              {editDescription}
            </textarea>
            <div class="section-title">move:</div>
            
            <input type="radio" name="editStatus" value="open" defaultChecked={editStatus === 'open'} onChange={this.handleChange}/>
              To-Do
            <br />
            <input type="radio" name="editStatus" value="undertaken" defaultChecked={editStatus === 'undertaken'} onChange={this.handleChange}/>
              In-Progress
            <br />
            <input type="radio" name="editStatus" value="complete" defaultChecked={editStatus === 'complete'} onChange={this.handleChange} />
              Completed
            <br />
            
            <div class="align-center">
              <button type="submit">Edit!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  //Regular task output
  renderItem(name, description, status, onDelete, onUpdate) {
    return (
      <div>
        <div class="top-bar"></div>
        <div class="task">
          <div class="options">
            <div class="options-wrapper">
              <span class="dot-holder">
                <div class="edit-dot"></div>
                <div class="edit-dot"></div>
                <div class="edit-dot"></div>
              </span>
              <span class="options-holder">
                <div class="align-right">
                <div class="edit-dot"></div>
                <div class="edit-dot"></div>
                <div class="edit-dot"></div>
                </div>
                <ul class="option-lis">
                  <li onClick={this.populateForm}>Edit</li>
                  <li onClick={() => onDelete()}>Delete</li>
                </ul>
              </span>
            </div>
          </div>
      
          <div class="task-title">{name}</div>
          <div class="desc">{description}</div>
          
          <div class="open-btns status-btns">
            <div class="triangle triangle-1"></div>
            <div class="triangle seperator"></div>
            <div class="triangle triangle-2" onClick={() => onUpdate('undertaken')}></div>
          </div>
          <div class="prog-btns status-btns">
            <div class="triangle triangle-1" onClick={() => onUpdate('open')}></div>
            <div class="triangle seperator"></div>
            <div class="triangle triangle-2" onClick={() => onUpdate('complete')}></div>
          </div>
          <div class="com-btns status-btns">
            <div class="triangle triangle-1" onClick={() => onUpdate('undertaken')}></div>
            <div class="triangle seperator"></div>
            <div class="triangle triangle-2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    //Destrucuture props & setState for the edit form inputs
    const {name, description, status, onDelete, onUpdate} = this.props;
    const {editForm} = this.state;
    
    //Output task, if editform is true; output task's edit form
    return (
      <Spring
        from={{ opacity: 0, marginTop: -25 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {props => (
          <div style={props}>

            { editForm ? 
              this.renderForm(name) 
              : this.renderItem(name, description, status, onDelete, onUpdate)
            }
          
          </div>
        )}
      </Spring>
    );
  }
}

export default TaskItem;