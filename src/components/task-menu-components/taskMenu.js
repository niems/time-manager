import React, {Component} from 'react';
import ShowAllTasks from './showAllTasks';
//import FileMenu from './fileMenu';
import ColorThemeOptions from './colorThemeOptions';
import './style/taskMenu.css';

function TaskMenuOptions({ selectedOption, onOptionSelect }) {
    let taskListClasses = 'task-option-img-container';
    let taskListImgClasses = 'task-menu-option-img';

    let colorThemeClasses = 'task-option-img-container';
    let colorThemeImgClasses = 'task-menu-option-img';

    let loadFileClasses = 'task-option-img-container';
    let loadFileImgClasses='task-menu-option-img';

    let saveFileClasses = 'task-option-img-container';
    let saveFileImgClasses = 'task-menu-option-img';

    if ( selectedOption === 'task-list-option' ) {
        taskListClasses += ' selected';
        taskListImgClasses += ' selected';
    } 

    else if ( selectedOption === 'color-theme-option' ) {
        colorThemeClasses += ' selected';
        colorThemeImgClasses += ' selected';
    }

    else if ( selectedOption === 'load-file-option' ) {
        loadFileClasses += ' selected';
        loadFileImgClasses += ' selected';
    }

    else if ( selectedOption === 'save-file-option' ) {
        saveFileClasses += ' selected';
        saveFileImgClasses += ' selected';
    }

    return (
        <div id='task-menu-options-container'>
            <span id='task-list-option' className={taskListClasses} onClick={onOptionSelect}>
                <img className={taskListImgClasses} src='./images/task-menu-options/task-list.svg' alt='failed to load task list img' />
            </span>

            <span id='color-theme-option' className={colorThemeClasses} onClick={onOptionSelect}>
                <img className={colorThemeImgClasses} src='./images/task-menu-options/color-theme.svg' alt='failed to load color theme img' />
            </span>
        </div>
    );
}

function DisplayMenuSelection({ selected, allTasks, onTaskSelect, onThemeSelect, removeTask, onSave }) {
    if ( selected === 'task-list-option' ) {
        return (
            <ShowAllTasks allTasks={allTasks} onSelect={onTaskSelect} removeTask={removeTask} />
        );
    }

    else if ( selected === 'color-theme-option' ) {
        return (
            <ColorThemeOptions onSelect={onThemeSelect} />
        );
    }

    /*
    else if ( selected === 'load-file-option' ) {
        return (
            <FileMenu load={true}/>
        );
    }

    else if ( selected === 'save-file-option' ) {
        console.log('save file option not coded D:');

        onSave();
        
        return (
            null
        );
    }
    */

    return null;
}

class TaskMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 'task-list-option'
        };

        this.onOptionSelect = this.onOptionSelect.bind(this); //called when a task menu option is selected
    }

    onOptionSelect(e) {
        e.preventDefault();
        let userOption = e.currentTarget.id;

        if ( userOption !== this.state.selectedOption ) {
            console.log(`onOptionSelect() new option selected - updating state for ${userOption}\n`);

            this.setState({
                selectedOption: userOption
            });
        }

        else {
            console.log('onOptionSelect() same option selected - no action taken');
        }
    }

    render() {
        return (
            <div id='task-menu-container'>
                <TaskMenuOptions selectedOption={this.state.selectedOption} onOptionSelect={this.onOptionSelect} />
                
                <DisplayMenuSelection selected={this.state.selectedOption} allTasks={this.props.allTasks}
                                      onTaskSelect={this.props.onTaskSelect} onThemeSelect={this.props.onThemeSelect} 
                                      removeTask={this.props.removeTask} onSave={this.props.onSave} />
            </div>
        );
    }
}

export default TaskMenu;