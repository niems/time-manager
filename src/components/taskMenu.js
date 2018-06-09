import React, {Component} from 'react';
import ShowAllTasks from './showAllTasks';
import './style/taskMenu.css';

function TaskMenuOptions({ selectedOption, onOptionSelect }) {
    //if selected, add .selected class for underlining
    let taskListClasses = 'task-option-img-container';
    let taskListImgClasses = 'task-menu-option-img';

    let colorThemeClasses = 'task-option-img-container';
    let colorThemeImgClasses = 'task-menu-option-img';

    if ( selectedOption === 'task-list-option' ) {
        taskListClasses += ' selected';
        taskListImgClasses += ' selected';
    } 

    else if ( selectedOption === 'color-theme-option' ) {
        colorThemeClasses += ' selected';
        colorThemeImgClasses += ' selected';
    }

    //let taskListClasses = (selectedOption === 'task-list-option') ? 'task-option-img-container selected' : 'task-option-img-container';
    //let colorThemeClasses = (selectedOption === 'color-theme-option') ? 'task-option-img-container selected' : 'task-option-img-container';

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

function DisplayMenuSelection({ selected, allTasks, onSelect }) {
    if ( selected === 'task-list-option' ) {
        return (
            <ShowAllTasks allTasks={allTasks} onSelect={onSelect} />
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
            console.log('onOptionSelect() new option selected - updating state');
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
                <DisplayMenuSelection selected={this.state.selectedOption} allTasks={this.props.allTasks} onSelect={this.props.onTaskSelect} />
            </div>
        );
    }
}

export default TaskMenu;