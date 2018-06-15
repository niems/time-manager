import React from 'react';
import TaskInput from './taskInput';
import './style/addTask.css';

const AddTask = ({ themeId, onClose, createTask }) => {

    return (
        <div id='add-task-container'>
            <TaskInput themeId={themeId} onClose={onClose} createTask={createTask} />
        </div>
    );
}

export default AddTask;