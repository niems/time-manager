import React from 'react';
import TaskInput from './taskInput';
import './style/addTask.css';

const AddTask = ({ onClose, createTask }) => {
    return (
        <div id='add-task-container'>
            <TaskInput onClose={onClose} createTask={createTask} />
        </div>
    );
}

export default AddTask;