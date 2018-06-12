import React from 'react';
import './style/taskListItem.css';
function formatNum(num) {
    return ( (num < 10 && num.toString().length < 2) ? ('0' + num) : num );
}

function formatDuration(duration) {
    return ( formatNum( duration.hr ) + ':' + formatNum( duration.min ) + ':' + formatNum( duration.sec ) );
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