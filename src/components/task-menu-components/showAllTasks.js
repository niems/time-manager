import React from 'react';
import TaskListItem from './taskListItem';
import './style/showAllTasks.css';

const ShowAllTasks = ({ allTasks, onSelect, removeTask }) => {

     const displayList = allTasks.map( task => (
         <TaskListItem key={task.name} task={task} onSelect={onSelect} removeTask={removeTask} />
     ));

    return (
        <ul id='task-menu-list'>
            {displayList}        
        </ul>
    );
}

export default ShowAllTasks;