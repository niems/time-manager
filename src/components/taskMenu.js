import React from 'react';
import TaskListItem from './taskListItem';
import './style/taskMenu.css';

const TaskMenu = (props) => {
    let testList = [
        {
            name: 'breathing',
            duration: {
                hr: 1,
                min: 5,
                sec: 59
            }
        },
        {
            name: 'eating',
            duration: {
                hr: 0,
                min: 30,
                sec: 0
            }
        }
    ];

     const displayList = testList.map( task => (
         <TaskListItem key={task.name} id={task.name} task={task} />
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