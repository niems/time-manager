import React, {Component} from 'react';
import ShowAllTasks from './showAllTasks';
import './style/taskMenu.css';

function TaskMenuOptions({ selectedOption, onOptionSelect }) {
    //if selected, add .selected class for underlining
    let taskListClasses = (selectedOption === 'task-list-option') ? 'task-option-img-container selected' : 'task-option-img-container';
    let colorThemeClasses = (selectedOption === 'color-theme-option') ? 'task-option-img-container selected' : 'task-option-img-container';

    return (
        <div id='task-menu-options-container'>
            <span id='task-list-option' className={taskListClasses} onClick={onOptionSelect}>
                <img className='task-menu-option-img' src='./images/task-menu-options/task-list.svg' alt='failed to load task list img' />
            </span>

            <span id='color-theme-option' className={colorThemeClasses} onClick={onOptionSelect}>
                <img className='task-menu-option-img' src='./images/task-menu-options/color-theme.svg' alt='failed to load color theme img' />
            </span>
        </div>
    );
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

        this.setState({
            selectedOption: (this.state.selectedOption === 'task-list-option') ? 'color-theme-option' : 'task-list-option'
        });
    }

    render() {
        return (
            <div id='task-menu-container'>
                <TaskMenuOptions selectedOption={this.state.selectedOption} onOptionSelect={this.onOptionSelect} />
                <ShowAllTasks allTasks={this.props.allTasks} onSelect={this.props.onTaskSelect} />
            </div>
        );
    }
}

/*
const TaskMenu = ({ allTasks, onTaskSelect }) => {
    return (
        <div id='task-menu-container'>
            <TaskMenuOptions />
            <ShowAllTasks allTasks={allTasks} onSelect={onTaskSelect} />
        </div>
    );
}
*/
export default TaskMenu;