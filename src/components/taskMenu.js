import React from 'react';
import ShowAllTasks from './showAllTasks';
import './style/taskMenu.css';

function TaskMenuOptions(props) {
    return (
        <div id='task-menu-options-container'>
            <img className='task-menu-option-img' src='./images/task-menu-options/task-list.svg' alt='failed to load task list img' />
        </div>
    );
}

const TaskMenu = ({ allTasks, onTaskSelect }) => {
    return (
        <div id='task-menu-container'>
            <TaskMenuOptions />
            <ShowAllTasks allTasks={allTasks} onSelect={onTaskSelect} />
        </div>
    );
}

export default TaskMenu;