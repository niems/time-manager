import React, {Component} from 'react';
import './style/taskOptions.css';

/*
const TaskOptions = ({ taskState = undefined, onToggle = undefined, onRestart = undefined, onToggleAddTask }) => {

    if ( taskState ) { //if task state is defined - undefined means no task is selected
        if ( taskState === 'play' ) {
            return (
                <div className='task-options-container paused'>
                    <button className='task-quick-add' onClick={onToggleAddTask}>
                        <img className='task-quick-add-img' src='./images/task-options/add.svg' alt='failed to load task quick add img' />
                    </button>
    
                    <button className='task-refresh' onClick={onRestart}>
                        <img className='task-refresh-img' src='./images/task-options/refresh.svg' alt='failed to load task refresh img' />
                    </button>
    
                    <button className='task-toggle-button paused' onClick={onToggle}>
                        <img className='task-option-img' src='./images/task-options/pause.svg' alt='failed to load task pause img'/>                    
                    </button>
                </div>
            );
        }
    
        return (
            <div className='task-options-container play'>
                <button className='task-quick-add' onClick={onToggleAddTask}>
                    <img className='task-quick-add-img' src='./images/task-options/add.svg' alt='failed to load task quick add img' />
                </button>
    
                <button className='task-refresh' onClick={onRestart}>
                    <img className='task-refresh-img' src='./images/task-options/refresh.svg' alt='failed to load task refresh img' />
                </button>
                
                <button className='task-toggle-button play' onClick={onToggle}>
                    <img className='task-option-img' src='./images/task-options/play.svg' alt='failed to load task play img' />
                </button>
            </div>
        );
    }

    //runs if no task is selected
    return (
        <div className='task-options-container'>
            <button className='task-quick-add no-selection' onClick={onToggleAddTask}>
                <img className='task-quick-add-img no-selection' src='./images/task-options/add.svg' alt='failed to load task quick add img' />
            </button>
        </div>
    );
}
*/

function DisplayTaskContainer( isDisplayed ) {
    if ( isDisplayed ) { //if the task container is displayed

    }

    return (
        null
    );
}

class TaskOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayTaskContainer: false, //displays the container holding the add task & refresh buttons
            displayFileContainer: false, //displays the container holding the file save & load buttons
        };

        this.onTaskHover = this.onTaskHover.bind(this); //called when the mouse enters the display task container
        this.onTaskHoverExit = this.onTaskHoverExit.bind(this); //called when the mouse exits the display task container

        this.onFileHover = this.onFileHover.bind(this); //called when the mouse enters the display file container
        this.onFileHoverExit = this.onFileHoverExit.bind(this); //called when the mouse exits the display file container
    }

    //mouse entered hovering over display task container
    onTaskHover(e) {
        e.preventDefault();

        if ( !this.state.displayTaskContainer ) { //task container currently not displayed
            this.setState({ displayTaskContainer: true });
        }
    }

    //mouse exited hovering over display task container
    onTaskHoverExit(e) {
        e.preventDefault();

        if ( this.state.displayTaskContainer ) { //task container currently displayed
            this.setState({ displayTaskContainer: false });
        }
    }

    //mouse entered hovering over display file container
    onFileHover(e) {
        e.preventDefault();

        if ( !this.state.displayFileContainer ) { //file container currently not displayed
            this.setState({ displayFileContainer: true });
        }
    }

    //mouse exited hovering over display file container
    onFileHoverExit(e) { 
        e.preventDefault();

        if ( this.state.displayFileContainer ) { //file container currently displayed
            this.setState({ displayFileContainer: false });
        }
    }

    render() {
        let refreshContainerClass = this.state.displayTaskContainer ? 'task-option-refresh-container display' : 'task-option-refresh-container';
        let refreshButtonClass = this.state.displayTaskContainer ? 'task-refresh display' : 'task-refresh';

        let fileContainerClass = this.state.displayFileContainer ? 'task-file-options display' : 'task-file-options';
        let loadButtonClass = this.state.displayFileContainer ? 'task-file-load-button display' : 'task-file-load-button';

        /**keep these only */
        //GENERAL SETUP
        let optionContainerClass = 'options-container'; //applies to both refresh & file containers
        let taskButtonClass = 'task-option-button'; //applies to all task buttons
        let taskButtonImgClass = 'task-option-button-img'; //applies to all task button images

        //CONTAINER SPECIFIC SETUP
        let refreshButtonId = this.state.displayTaskContainer ? 'task-refresh-display' : 'task-refresh';
        let loadButtonId = this.state.displayFileContainer ? 'task-file-load-display' : 'task-file-load'; //replacement for loadButtonClass


        console.log(`render() refresh button classes: ${refreshButtonClass}`);

        if ( this.props.taskState ) { //if task state is defined - undefined means no task is selected
            console.log('render() task state is defined');
            let buttonImgSrc = ( this.props.taskState === 'play' ) ? './images/task-options/pause.svg' : './images/task-options/play.svg';
        
            /*
            return (
                <div className='task-options-container'>
                    <button className='task-quick-add' onClick={this.props.onToggleAddTask}>
                        <img className='task-quick-add-img' src='./images/task-options/add.svg' alt='failed to load task quick add img' />
                    </button>i8uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
                    </button>
                </div>
            );
            */

            return (
                <div id='task-options-container'>
                    <div id='file-container' className={optionContainerClass} onMouseEnter={this.onFileHover} onMouseLeave={this.onFileHoverExit}>
                        <button id={loadButtonId} className={taskButtonClass}>
                            <img className={taskButtonImgClass} src='./images/task-menu-options/load-file.svg' alt='failed to load "load" img' />
                        </button>

                        <button id='task-file-save-display' className={taskButtonClass}>
                            <img className={taskButtonImgClass} src='./images/task-menu-options/save-file.svg' alt='failed to load save img' />
                        </button>
                    </div>

                    <button className={taskButtonClass} onClick={this.props.onToggle}>
                        <img className={taskButtonImgClass} src={buttonImgSrc} alt='failed to load task play img' />
                    </button>

                    <div id='refresh-container' className={optionContainerClass} onMouseEnter={this.onTaskHover} onMouseLeave={this.onTaskHoverExit}>
                        <button id={refreshButtonId} className={taskButtonClass} onClick={this.props.onRestart}>
                            <img className={taskButtonImgClass} src='./images/task-options/refresh.svg' alt='failed to load task refresh img' />
                        </button>

                        <button id='task-quick-add' className={taskButtonClass} onClick={this.props.onToggleAddTask}>
                            <img className={taskButtonImgClass} src='./images/task-options/add.svg' alt='failed to load task quick add img' />
                        </button>
                    </div>
                </div>
            );
        }

        console.log('render() task state is NOT defined');
        //runs if no task is selected
        return (
            <div id='task-options-container'>
                <div id='file-container' className={optionContainerClass} onMouseEnter={this.onFileHover} onMouseLeave={this.onFileHoverExit}>
                    <button id={loadButtonId} className={taskButtonClass}>
                        <img className={taskButtonImgClass} src='./images/task-menu-options/load-file.svg' alt='failed to load "load" img' />
                    </button>

                    <button id='task-file-save-display' className={taskButtonClass}>
                        <img className={taskButtonImgClass} src='./images/task-menu-options/save-file.svg' alt='failed to load save img' />
                    </button>
                </div>

                <button id='task-quick-add-no-selection' className={taskButtonClass} onClick={this.props.onToggleAddTask}>
                    <img className={taskButtonImgClass} src='./images/task-options/add.svg' alt='failed to load task quick add img' />
                </button>
            </div>
        );
    }
}

/**
<div className={fileContainerClass} onMouseEnter={this.onFileHover} onMouseLeave={this.onFileHoverExit}>
                    <button className={loadButtonClass}>
                        <img className='task-file-load-img' src='./images/task-menu-options/load-file.svg' alt='failed to load "load" img' />
                    </button>

                    <button className='task-file-save-button'>
                        <img className='task-file-save-img' src='./images/task-menu-options/save-file.svg' alt='failed to load save img' />
                    </button>
                </div>
*/
export default TaskOptions;