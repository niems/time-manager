import React from 'react';
import './style/titlebar.css';

const Titlebar = ({ onMenu, onClose }) => {
    return (
        <div className='titlebar-container'>
            <img className='titlebar-icon' id='titlebar-menu' src='./images/titlebar-icons/menu.svg' alt='failed to load menu icon' onClick={onMenu} />
            <img className='titlebar-icon' id='titlebar-close' src='./images/titlebar-icons/close.svg' alt='failed to load close icon' onClick={onClose} />
        </div>
    );
}

export default Titlebar;