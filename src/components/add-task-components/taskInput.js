import React, {Component} from 'react';
import './style/taskInput.css';

function TaskNameInput({ name, onChange, onSubmit, nameRef }) {
    return (
        <form id='task-name-form' onSubmit={onSubmit}>
            <input id='task-name-input' className='task-input' value={name} onChange={onChange} placeholder='Task name' autoFocus='true' ref={nameRef} />
        </form>
    );
}

function TaskDurationInput({ hr, min, sec, onChange, onSubmit, hrRef, minRef, secRef }) {
    return (
        <div id='task-duration-input-container'>
            <form id='task-hr-form' className='task-duration-input-form' onSubmit={onSubmit}>
                <input className='task-duration-input' id='task-hr-input' value={hr} onChange={onChange} placeholder={'hr'} ref={hrRef} />
                <span className='task-duration-separator'>:</span>
            </form>

            <form id='task-min-form' className='task-duration-input-form' onSubmit={onSubmit}>
                <input className='task-duration-input' id='task-min-input' value={min} onChange={onChange} placeholder={'min'} ref={minRef} />
                <span className='task-duration-separator'>:</span>
            </form>

            <form id='task-sec-form' className='task-duration-input-form' onSubmit={onSubmit}>
                <input className='task-duration-input' id='task-sec-input' value={sec} onChange={onChange} placeholder={'sec'} ref={secRef} />
            </form>
        </div>
    );
}

class TaskInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',

             hr: '',
             min: '',
             sec: '',
        };

        //callback refs for focusing elements after submittion
        this.nameRef = null;
        this.setNameRef = element => { this.nameRef = element; }

        this.hrRef = null;
        this.setHrRef = element => { this.hrRef = element; }

        this.minRef = null;
        this.setMinRef = element => { this.minRef = element; }

        this.secRef = null;
        this.setSecRef = element => { this.secRef = element; }
        
        this.onNameChange = this.onNameChange.bind(this); //called when task name inputfield changes
        this.onDurationChange = this.onDurationChange.bind(this); //called when any of the duration inputfields change

        this.valueCheck = this.valueCheck.bind(this); //checks all fields in order for value, focusing the first field without value
        this.onSubmit = this.onSubmit.bind(this); //called when either the task name or duration fields are submitted
    }

    valueCheck() {
        if ( this.state.name === '' ) {
            if ( this.nameRef ) {
                this.nameRef.focus();
            }
        }

        else if( this.state.hr === '' ) {
            if ( this.hrRef ) {
                this.hrRef.focus();
            }
        }

        else if ( this.state.min === '' ) {
            if ( this.minRef ) {
                this.minRef.focus();
            }
        }

        else if ( this.state.sec === '' ) {
            if ( this.secRef ) {
                this.secRef.focus();
            }
        }

        else {
            console.log('valueCheck(): values valid - adding task now');
            this.props.createTask({
                name: this.state.name,
                hr: this.state.hr,
                min: this.state.min,
                sec: this.state.sec
            });  

            this.props.onClose();
        }
    }

    onNameChange(e) {
        e.preventDefault();

        this.setState({
            name: e.currentTarget.value
        });
    }

    onDurationChange(e) {
        e.preventDefault();
        let id = e.currentTarget.id;
        let value = e.currentTarget.value;

        console.log(`onDurationChange() value: ${e.currentTarget.value}`);
        console.log(`onDurationChange() id: ${id}\n\n`);

        if ( !isNaN( value ) ) {
            if ( value.length <= 2 ) {
                console.log('onDurationChange(): number entered');
                if ( id === 'task-hr-input' ) {
                    this.setState({ hr: value })
                }
    
                else if ( id === 'task-min-input' ) {
                    this.setState({ min: value });
                }
    
                else if ( id === 'task-sec-input' ) {
                    this.setState({ sec: value });
                }
            }
             
            else {
                console.log('onDurationChange(): number entered but > 2 digits long - no action taken');
            }
        }

        else {
            console.log('onDurationChange(): number not entered');
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.valueCheck();
    }

    render() {
        return (
            <div id='task-input-container'>
                <img id={'close-img-' + this.props.themeId} className='task-input-close-img' src='./images/titlebar-icons/close.svg' alt='failed to load task close img' onClick={this.props.onClose} />
                <TaskNameInput name={this.state.name} onChange={this.onNameChange} onSubmit={this.onSubmit} nameRef={this.setNameRef} />
                <TaskDurationInput hr={this.state.hr} min={this.state.min} sec={this.state.sec} onChange={this.onDurationChange} onSubmit={this.onSubmit} 
                                   hrRef={this.setHrRef} minRef={this.setMinRef} secRef={this.setSecRef} />
            </div>
        );
    }
}

export default TaskInput;