import React from 'react';
import './style/colorThemeOptions.css';

const ColorThemeOptions = ({ onSelect }) => {
    return (
        <div id='color-theme-options-container'>
            <div className='color-theme-option' id='dark-theme' onClick={onSelect}>
            </div>

            <div className='color-theme-option' id='light-theme' onClick={onSelect}>
            </div>
        </div>
    );
}

export default ColorThemeOptions;