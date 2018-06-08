import React, {Component} from 'react';
import TaskMenu from './taskMenu';
import TaskArcDisplay from './taskArcDisplay';
import TaskOptions from './taskOptions';
import './style/taskView.css';

function precision(num) {
    return ( (num < 10) ? ('0' + num) : num );
}

function TaskDuration({ hr, min, sec, total }) {
    return (
        <div id='task-duration-container'>
            <span id='current-duration'>{precision(hr) + ':' + precision(min) + ':' + precision(sec)}</span>
            <span id='task-duration-separator'>{' / '}</span>
            <span id='total-duration'>{precision(total.hr) + ':' + precision(total.min) + ':' + precision(total.sec)}</span>
        </div>
    );
}

class TaskView extends Component {
    constructor(props) {
        super(props);

        this.seconds = 0; //number of seconds from the interval timer - used to update elapsed time
        this.state = {
            taskState: 'paused', //toggles between play/paused

            elapsedHr: this.props.task.totalDuration.hr - this.props.task.completedDuration.hr,
            elapsedMin: this.props.task.totalDuration.min - this.props.task.completedDuration.min,
            elapsedSec: this.props.task.totalDuration.sec - this.props.task.completedDuration.sec,
        };

        this.updateElapsedTime = this.updateElapsedTime.bind(this); //updates the elapsed time state
        this.onToggleTaskState = this.onToggleTaskState.bind(this); //toggles between play and paused
        this.onRestartTask = this.onRestartTask.bind(this); //restarts the duration of the current task
    }

    componentDidMount() {
        this.timerId = setInterval( () => {
            if ( this.state.taskState === 'play' ) {
               this.updateElapsedTime();
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateElapsedTime() {
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
            //callback to display 'task complete' 
            console.log('TASK COMPLETE');

            this.setState({
                elapsedSec: 59,
                elapsedMin: 59,
                elapsedHr: 23,
                taskState: 'paused'
            });
        }
    }

    onToggleTaskState(e) {
        e.preventDefault();
        console.log('onToggleTaskState()');

        this.setState({
            taskState: (this.state.taskState === 'play') ? 'paused' : 'play'
        });
    }

    onRestartTask(e) {
        e.preventDefault();

        this.setState({
            elapsedHr: this.props.task.totalDuration.hr,
            elapsedMin: this.props.task.totalDuration.min,
            elapsedSec: this.props.task.totalDuration.sec
        });
    }

    render() {
        if ( this.props.task ) {
            return (
                <div id='taskView'>
                    {this.props.displayMenu ? <TaskMenu allTasks={JSON.parse(JSON.stringify(this.props.allTasks))} onSelect={this.props.onSelect} /> : null}

                    <h2 id='task-name'>{this.props.task.name}</h2>
                    <TaskArcDisplay hr={this.state.elapsedHr} min={this.state.elapsedMin} sec={this.state.elapsedSec} />
                    <TaskDuration hr={this.state.elapsedHr} min={this.state.elapsedMin} sec={this.state.elapsedSec} total={this.props.task.totalDuration} />
                    <TaskOptions taskState={this.state.taskState} onToggle={this.onToggleTaskState} onRestart={this.onRestartTask} />
                </div>
            );
        }

        else {
            return (
                <div id='taskView'>
                    <h2 id='task-name'>no task selected</h2>                    
                </div>
            );
        }
    }
}

export default TaskView;