import React, {Component} from 'react';
import './style/taskInput.css';

function TaskNameInput({ name, onChange, onSubmit }) {
    return (
        <form id='task-name-form' onSubmit={onSubmit}>
            <input id='task-name-input' className='task-input' value={name.value} onChange={onChange} placeholder='Task name' autoFocus={name.focused} />
        </form>
    );
}

function TaskDurationInput({ hr, min, sec, onChange, onSubmit }) {
    return (
        <div id='task-duration-input-container'>
            <form className='task-duration-input-form' onSubmit={onSubmit}>
                <input className='task-duration-input' id='task-hr-input' value={hr.value} onChange={onChange} placeholder={'hr'} autoFocus={hr.focused} />
                <span className='task-duration-separator'>:</span>
            </form>

            <form className='task-duration-input-form' onSubmit={onSubmit}>
                <input className='task-duration-input' id='task-min-input' value={min.value} onChange={onChange} placeholder={'min'} autoFocus={min.focused} />
                <span className='task-duration-separator'>:</span>
            </form>

            <form className='task-duration-input-form' onSubmit={onSubmit}>
                <input className='task-duration-input' id='task-sec-input' value={sec.value} onChange={onChange} placeholder={'sec'} autoFocus={sec.focused} />
            </form>
        </div>
    );
}

class TaskInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: {
                value: '',
                focused: true
            },

             hr: {
                 value: '',
                 focused: false
             },

             min: {
                 value: '',
                 focused: false
             },

             sec: {
                 value: '',
                 focused: false
             }
        };

        this.onNameChange = this.onNameChange.bind(this); //called when task name inputfield changes
        this.onDurationChange = this.onDurationChange.bind(this); //called when any of the duration inputfields change

        this.onSubmit = this.onSubmit.bind(this); //called when either the task name or duration fields are submitted
    }

    onNameChange(e) {
        e.preventDefault();

        this.setState({
            name: {
                value: e.currentTarget.value,
                focused: this.state.name.focused
            }
        });
    }

    onDurationChange(e) {
        e.preventDefault();
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`onSubmit() from ${e.currentTarget.id}`);
    }

    render() {
        return (
            <div id='task-input-container'>
                <img id='task-input-close-img' src='./images/titlebar-icons/close.svg' alt='failed to load task close img' />
                <TaskNameInput name={this.state.name} onChange={this.onNameChange} onSubmit={this.onSubmit} />
                <TaskDurationInput hr={this.state.hr} min={this.state.min} sec={this.state.sec} onChange={this.onDurationChange} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default TaskInput;