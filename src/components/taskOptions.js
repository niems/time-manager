import React from 'react';
import './style/taskOptions.css';

const TaskOptions = ({ taskState, onToggle, onRestart }) => {

    if ( taskState === 'play' ) {
        return (
            <div className='task-options-container paused'>
                <button className='task-quick-add'>
                    <img className='task-quick-add-img' src='./images/task-options/add.svg' alt='failed to load task quick add img' />
                </button>

                <button className='task-refresh' onClick={onRestart}>
                    <img className='task-refresh-img' src='./images/task-options/refresh.svg' alt='failed to load task refresh img' />
                </button>

                <button className='task-toggle-button paused' onClick={onToggle}>
                    <img className='task-option-img' src='./images/task-options/pause.svg' alt='failed to load task pause img'/>                    
                </button>
            </div>
        );
    }

    return (
        <div className='task-options-container play'>
            <button className='task-quick-add'>
                <img className='task-quick-add-img' src='./images/task-options/add.svg' alt='failed to load task quick add img' />
            </button>

            <button className='task-refresh' onClick={onRestart}>
                <img className='task-refresh-img' src='./images/task-options/refresh.svg' alt='failed to load task refresh img' />
            </button>
            
            <button className='task-toggle-button play' onClick={onToggle}>
                <img className='task-option-img' src='./images/task-options/play.svg' alt='failed to load task play img' />
            </button>
        </div>
    );
}

export default TaskOptions;
/*<span className='task-option-img-container play'></span>*/