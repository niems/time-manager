import React from 'react';
import TaskInput from './taskInput';
import './style/addTask.css';

const AddTask = (props) => {
    return (
        <div id='add-task-container'>
            <TaskInput />
        </div>
    );
}

export default AddTask;