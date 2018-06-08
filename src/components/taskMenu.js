import React from 'react';
import TaskListItem from './taskListItem';
import './style/taskMenu.css';

const TaskMenu = ({ allTasks, onSelect }) => {

     const displayList = allTasks.map( task => (
         <TaskListItem key={task.name} task={task} onSelect={onSelect} />
     ));

    return (
        <div id='task-menu-container'>
            <ul id='task-menu-list'>
                {displayList}
            </ul>
        </div>
    );
}

export default TaskMenu;