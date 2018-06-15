import React from 'react';
import './style/titlebar.css';

const Titlebar = ({ themeId, onMenu, onClose }) => {
    let titlebarIconTheme = 'titlebar-icon';
    let menuId = 'titlebar-menu'; //determines accent color for the menu icon

    //determines titlebar icon colors from current theme
    switch( themeId ) {
        case 'dark-theme':
            titlebarIconTheme += ' dark';
            menuId += '-dark';
            break;

        case 'light-theme':
            titlebarIconTheme += ' light';
            menuId += '-light';
            break;
    }

    return (
        <div className='titlebar-container'>
            <img className={titlebarIconTheme} id={menuId} src='./images/titlebar-icons/menu.svg' alt='failed to load menu icon' onClick={onMenu} />
            <img className={titlebarIconTheme} id='titlebar-close' src='./images/titlebar-icons/close.svg' alt='failed to load close icon' onClick={onClose} />
        </div>
    );
}

export default Titlebar;