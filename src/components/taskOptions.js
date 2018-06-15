import React, {Component} from 'react';
import './style/taskOptions.css';

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

        this.loadRef = undefined; //stores the reference for the load file button
        this.onLoad = this.onLoad.bind(this);  //called when the load file button is clicked - user chooses file to load, then passes back to app.js to store data
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

    onLoad(e) {
        e.preventDefault();

        if ( this.loadRef ) { //reference for load button exists
            
        }
    }

    render() {
        //GENERAL SETUP
        let optionContainerClass = 'options-container'; //applies to both refresh & file containers
        let taskButtonClass = 'task-option-button'; //applies to all task buttons
        let taskButtonImgClass = 'task-option-button-img'; //applies to all task button images

        //CONTAINER SPECIFIC SETUP
        let refreshButtonId = this.state.displayTaskContainer ? 'task-refresh-display' : 'task-refresh';
        let loadButtonId = this.state.displayFileContainer ? 'task-file-load-display' : 'task-file-load'; //replacement for loadButtonClass

        
        if ( this.props.taskState ) { //if task state is defined - undefined means no task is selected
            console.log('render() task state is defined');
            let buttonImgSrc = ( this.props.taskState === 'play' ) ? './images/task-options/pause.svg' : './images/task-options/play.svg';

            return (
                <div id='task-options-container'>
                    <div id='file-container' className={optionContainerClass} onMouseEnter={this.onFileHover} onMouseLeave={this.onFileHoverExit}>
                        <button id={loadButtonId} className={taskButtonClass} onClick={this.onLoad} ref={load => { this.loadRef = load; } }>
                            <img className={taskButtonImgClass} src='./images/task-menu-options/load-file.svg' alt='failed to load "load" img' />
                        </button>

                        <button id='task-file-save-display' className={taskButtonClass} onClick={this.props.onSave}>
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
                    <button id={loadButtonId} className={taskButtonClass} onClick={this.onLoad}>
                        <img className={taskButtonImgClass} src='./images/task-menu-options/load-file.svg' alt='failed to load "load" img' />
                    </button>

                    <button id='task-file-save-display' className={taskButtonClass} onClick={this.props.onSave}>
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

export default TaskOptions;