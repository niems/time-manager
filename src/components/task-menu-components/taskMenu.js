import React, {Component} from 'react';
import ShowAllTasks from './showAllTasks';
import ColorThemeOptions from './colorThemeOptions';
import './style/taskMenu.css';

function TaskMenuOptions({ selectedOption, onOptionSelect }) {
    //if selected, add .selected class for underlining
    let taskListClasses = 'task-option-img-container';
    let taskListImgClasses = 'task-menu-option-img';

    let colorThemeClasses = 'task-option-img-container';
    let colorThemeImgClasses = 'task-menu-option-img';

    let fileThemeClasses = 'task-option-img-container';
    let fileThemeImgClasses='task-menu-option-img';

    if ( selectedOption === 'task-list-option' ) {
        taskListClasses += ' selected';
        taskListImgClasses += ' selected';
    } 

    else if ( selectedOption === 'color-theme-option' ) {
        colorThemeClasses += ' selected';
        colorThemeImgClasses += ' selected';
    }

    else if ( selectedOption === 'file-option' ) {
        fileThemeClasses += ' selected';
        fileThemeImgClasses += ' selected';
    }

    return (
        <div id='task-menu-options-container'>
            <span id='task-list-option' className={taskListClasses} onClick={onOptionSelect}>
                <img className={taskListImgClasses} src='./images/task-menu-options/task-list.svg' alt='failed to load task list img' />
            </span>

            <span id='file-option' className={fileThemeClasses} onClick={onOptionSelect}>
                <img className={fileThemeImgClasses} src='./images/task-menu-options/folder.svg' alt='failed to load folder img' />
            </span>

            <span id='color-theme-option' className={colorThemeClasses} onClick={onOptionSelect}>
                <img className={colorThemeImgClasses} src='./images/task-menu-options/color-theme.svg' alt='failed to load color theme img' />
            </span>
        </div>
    );
}

function DisplayMenuSelection({ selected, allTasks, onTaskSelect, onThemeSelect, removeTask }) {
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

    else if ( selected === 'file-option' ) {
        return (
            null
        );
    }

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
                                      removeTask={this.props.removeTask} />
            </div>
        );
    }
}

export default TaskMenu;