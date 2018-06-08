import React, { Component } from 'react';
import Titlebar from './components/titlebar';
import TaskView from './components/taskView';
import './App.css';

function isElectron() {
    try {
      if ( typeof( window.require('electron').remote.BrowserWindow ) !== 'function' ) {
          console.log('Electron is not running');
        return false;
      }
      
      console.log('Electron is running');
      return true;
    }
    catch(err) {
      console.log(`Electron not running: ${err.message}`);
    }
  }
  
const isElectronRunning = isElectron();

class App extends Component {
  constructor(props) {
      super(props);

      /**
       * stores all added tasks
       * completed duration: time task has been worked on - updated only when task is paused or a new task is selected. Not in 
       *                     state because the elapsed time is kept track of in the task view (mainly used as initialization data)
       * 
       * total duration: total time required to complete task
       */
      this.allTasks = [
          {
              name: 'breath',
              completedDuration: {
                hr: 0,
                min: 0,
                sec: 0
              },
              totalDuration: {
                  hr: 23,
                  min: 59,
                  sec: 59
              }
          },
          {
            name: 'sleep',
            completedDuration: {
              hr: 0,
              min: 0,
              sec: 0
            },
            totalDuration: {
                hr: 8,
                min: 0,
                sec: 0
            }
          },
          {
            name: 'code',
            completedDuration: {
              hr: 0,
              min: 0,
              sec: 0
            },
            totalDuration: {
                hr: 10,
                min: 0,
                sec: 0
            }
          }         
      ];

      /**
       * selected task: passed as initialization data for task view
       */
      this.state = {
          displayMenu: false,

          selectedTask: {
            name: 'ex task 1',
            completedDuration: {
              hr: 0,
              min: 0,
              sec: 0
            },
            totalDuration: {
                hr: 1,
                min: 5,
                sec: 59
            }
        }
      };

      this.onMenu = this.onMenu.bind(this); //toggles task menu
      this.onTaskSelect = this.onTaskSelect.bind(this); //selects the clicked task in the menu

      this.onClose = this.onClose.bind(this); //closes electron
  }

  onMenu(e) {
    e.preventDefault();

    this.setState({
      displayMenu: !this.state.displayMenu
    });
  }

  onTaskSelect(e) {
    try {
      e.preventDefault();
      console.log('\n*ENTERING onTaskSelect()');
      console.log(`onTaskSelect selection: ${e.currentTarget.id}`);

      let selectedTask = this.allTasks.filter( task => task.name === e.currentTarget.id );

      if( selectedTask ) {
        console.log('onTaskSelect(): updating task selection');
        console.log(`onTaskSelect selection: ${JSON.stringify(selectedTask)}`);        
        
        this.setState({ 
          selectedTask: selectedTask[0],
          displayMenu: false //closes menu once a new task is selected
         });
         
      }

      else {
        console.log(`onTaskSelect(): selected task not found: ${selectedTask}`);
      }
    }
    catch(err) {
      console.log(`***ERR onTaskSelect(): ${err.message}`);
    }
  }

  onClose(e) {
    try {
        e.preventDefault();
        //alert('uncomment & make sure electron is imported to close');
  
        if ( isElectronRunning ) {
          window.require('electron').remote.BrowserWindow.getAllWindows()[0].close();        
        }
    }   
    catch(e) {
    console.log(`ERR closeApp(): ${e.message}`);
    }
  }

  render() {
    return (
        <div className='wrapper'>
            <link rel='stylesheet' href='./themes/dark-theme.css' />
            <Titlebar onMenu={this.onMenu} onClose={this.onClose} />
            <TaskView task={this.state.selectedTask} allTasks={this.allTasks} displayMenu={this.state.displayMenu} onSelect={this.onTaskSelect} />
        </div>
    );
  }
}

export default App;
