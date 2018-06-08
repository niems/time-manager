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

const TaskListItem = ({ task, onSelect }) => {
    return (
        <li className='task-list-item-container' id={task.name} onClick={onSelect}>
                <span className='task-item-name'>{task.name}</span>
                <span className='task-item-duration'>{formatDuration(task.totalDuration)}</span>
        </li>
    );
}

export default TaskListItem;