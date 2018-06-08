import React from 'react';
import './style/taskListItem.css';

function formatNum(num) {
    return( num < 10 ? ('0' + num) : num );
}

function formatDuration(duration) {
    duration.hr = formatNum( duration.hr );
    duration.min = formatNum( duration.min );
    duration.sec = formatNum ( duration.sec );

    return ( duration.hr + ':' + duration.min + ':' + duration.sec );
}

const TaskListItem = ({ task }) => {
    return (
        <li className='task-list-item-container'>
                <span className='task-item-name'>{task.name}</span>
                <span className='task-item-duration'>{formatDuration(task.duration)}</span>
        </li>
    );
}

export default TaskListItem;