import React, {Component} from 'react';
import NoSelection from './noSelection';
import TaskArcDisplay from './taskArcDisplay';
import TaskOptions from './taskOptions';
import './style/taskView.css';

function displayTestData(propsData, name, hr, min, sec) {
    console.log(`displayTestData() props data: ${JSON.stringify(propsData)}\n`);
    console.log(`name: ${name}\n`);
    console.log(`hr: ${hr}\n`);
    console.log(`min: ${min}\n`);
    console.log(`sec: ${sec}\n\n`);
}

function precision(num) {
    return ( (num < 10 && num.toString().length < 2) ? ('0' + num) : num );
}

function TaskDuration({ hr, min, sec, total }) {
    return (
        <div id='task-duration-container'>
            <span id='current-duration'>{precision(hr) + ':' + precision(min) + ':' + precision(sec)}</span>
        </div>
    );
}

function DisplayTitle({ name = undefined, total }) {
    if ( name ) { //if a task is selected
        return (
            <div id='task-title-container'>
                <h1 id='task-name'>{name}</h1>        
                <small id='task-total-duration'>{'(' + precision(total.hr) + ':' + precision(total.min) + ':' + precision(total.sec) + ')'}</small>        
            </div>
        );
    }

    return (
        <div id='task-title-container'>
            <h1 id='task-name'>{'no task selected'}</h1>             
        </div>
    );
}

class TaskView extends Component {
    constructor(props) {
        super(props);

        this.timerId = undefined; //keeps track of the interval timer

        this.state = {
            taskState: 'paused', //toggles between play/paused

            taskName: this.props.task ? this.props.task.name : undefined,
            elapsedHr: this.props.task ? (this.props.task.totalDuration.hr - this.props.task.completedDuration.hr) : undefined,
            elapsedMin: this.props.task ? (this.props.task.totalDuration.min - this.props.task.completedDuration.min) : undefined,
            elapsedSec: this.props.task ? (this.props.task.totalDuration.sec - this.props.task.completedDuration.sec) : undefined,
        };

        //this.updateTaskInfo = this.updateTaskInfo.bind(this); //updates task info - used when a task is removed/reselected
        this.createTimer = this.createTimer.bind(this); //creates timer to update the task remaining time
        this.updateTimerStatus = this.updateTimerStatus.bind(this); //updates if the timer is created or undefined based on the task state

        this.updateElapsedTime = this.updateElapsedTime.bind(this); //updates the elapsed time state
        this.onToggleTaskState = this.onToggleTaskState.bind(this); //toggles between play and paused
        this.onRestartTask = this.onRestartTask.bind(this); //restarts the duration of the current task
    }

    componentDidMount() {
        console.log('componentDidMount()');
        displayTestData(this.props.task, this.state.taskName, this.state.elapsedHr, this.state.elapsedMin, this.state.elapsedSec);

        if ( this.state.taskState === 'play' ) {
            this.createTimer();
        }
    }

    componentWillUpdate() {
        
    }

    componentDidUpdate() {
        console.log(`componentDidUpdate()`);
        displayTestData(this.props.task, this.state.taskName, this.state.elapsedHr, this.state.elapsedMin, this.state.elapsedSec);

        if ( this.props.task ) { //if a task is selected
            console.log('componentDidUpdate() task selected');
            if ( this.state.taskName !== this.props.task.name ) { //new task selected
                console.log('Task View componentDidUpdate(): updating duration state');
        
                this.setState({
                    taskState: 'paused', //new task selected - pauses until user is ready
                    
                    taskName: this.props.task.name,
                    elapsedHr: this.props.task.totalDuration.hr,
                    elapsedMin: this.props.task.totalDuration.min,
                    elapsedSec: this.props.task.totalDuration.sec
                });
            }
        }

        else {
            console.log('componentDidupdate() task not selected');

            this.updateTimerStatus();
            //task state is still in 'play' mode since the timer needed to be cleared in the first place
            //updating the state to 'paused' will cause an error due to calling set state too many times
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        console.log('taskView unmounted - timer deleted');
    }

    createTimer() {
        this.timerId = setInterval( () => {
            if ( this.state.taskState === 'play' ) {
               this.updateElapsedTime();
            }
        }, 1000);
    }

    updateTimerStatus() {
        if ( this.state.taskState === 'paused' ) { //task currently paused, state updating below to start task
            console.log('updateTimerStatus(): task about to unpause');

            if ( !this.timerId ) { //timer id is undefined
                console.log('updateTimerStatus(): timer does NOT exist - creating timer');
                this.createTimer(); //creates timer id
            }
        }

        else if ( this.state.taskState === 'play' ) {
            console.log('updateTimerStatus(): task about to pause');

            if ( this.timerId ) { //timer id exists
                console.log('updateTimerStatus(): timer does exist - clearing timer');                
                clearInterval( this.timerId ); //timer id cleared - task is being paused, so timer is not needed
                this.timerId = undefined;
            }
        }
    }

    updateElapsedTime() {
        if ( this.state.taskName ) { //if a task exists
            let time = {
                hr: this.state.elapsedHr,
                min: this.state.elapsedMin,
                sec: this.state.elapsedSec
            };
    
            if ( time.sec > 0 ) {
                this.setState({
                    elapsedSec: time.sec - 1 
                });
            }
    
            else if ( time.min > 0 ) {
                this.setState({
                    elapsedSec: 59, //reset seconds
                    elapsedMin: time.min - 1
                });
            }
    
            else if ( time.hr > 0 ) {
                this.setState({
                    elapsedSec: 59, //reset seconds
                    elapsedMin: 59, //reset minutes
                    elapsedHr: time.hr - 1
                });
            }
    
            else {
                console.log('TASK COMPLETE');
    
                this.setState({
                    taskState: 'paused'
                });
            }
        }
    }

    onToggleTaskState(e) {
        e.preventDefault();

        this.updateTimerStatus();
        this.setState({
            taskState: (this.state.taskState === 'play') ? 'paused' : 'play'
        });
    }

    onRestartTask(e) {
        e.preventDefault();

        this.setState({
            taskState: 'paused',

            elapsedHr: this.props.task.totalDuration.hr,
            elapsedMin: this.props.task.totalDuration.min,
            elapsedSec: this.props.task.totalDuration.sec
        });
    }

    render() {
        //task is selected - need to check both props and current taskName state since if a task is removed in app.js it will take a
        //moment to update the taskView state
        if ( this.props.task && this.state.taskName ) { 
            return (
                <div id='taskView'>
                    <DisplayTitle name={this.props.task.name} total={this.props.task.totalDuration} />
                    <TaskArcDisplay theme={this.props.theme} hr={this.state.elapsedHr} min={this.state.elapsedMin} sec={this.state.elapsedSec} />
                    <TaskDuration hr={this.state.elapsedHr} min={this.state.elapsedMin} sec={this.state.elapsedSec} total={this.props.task.totalDuration} />
                    <TaskOptions taskState={this.state.taskState} onToggle={this.onToggleTaskState} onRestart={this.onRestartTask}
                                 onToggleAddTask={this.props.onToggleAddTask} onSave={this.props.onSave} onLoad={this.props.onLoad} />
                </div>
            );
        }

        //no task selected
        return (
            <div id='taskView'>
                <DisplayTitle />
                <NoSelection />
                <TaskOptions onToggleAddTask={this.props.onToggleAddTask} onSave={this.props.onSave} onLoad={this.props.onLoad} />
            </div>
        );
    }
}

export default TaskView;