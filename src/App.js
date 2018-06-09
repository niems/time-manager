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
      /*

      /**
       * selected task: passed as initialization data for task view
       */
      this.state = {
          displayMenu: false, //displays the task menu component
          displayAddTask: false, //displays the task add component
          theme: {
            id: 'dark-theme',
            path: './themes/dark-theme.css',
            arcFill: '#25282E',
            arcStroke: '#58D9FA'
          },

          selectedTask: {
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
        },

        allTasks: [
          {
            name: 'testing  :D',
            completedDuration: {
              hr: 0,
              min: 0,
              sec: 0,
            },
            totalDuration: {
              hr: 0,
              min: 1,
              sec: 59
            }
          },
          {
              name: 'breathe',
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
          },
          {
            name: 'read',
            completedDuration: {
              hr: 0,
              min: 0,
              sec: 0
            },
            totalDuration: {
                hr: 1,
                min: 30,
                sec: 0
            }
          }         
        ]
      };

      this.onMenu = this.onMenu.bind(this); //toggles the task menu
      this.onAddTask = this.onAddTask.bind(this); //toggles the add task modal window

      this.onTaskSelect = this.onTaskSelect.bind(this); //selects the clicked task in the menu
      this.onColorThemeSelect = this.onColorThemeSelect.bind(this); //selects the clicked color theme in the task menu

      this.onClose = this.onClose.bind(this); //closes electron
  }

  onMenu(e) {
    e.preventDefault();

    this.setState({
      displayMenu: !this.state.displayMenu
    });
  }

  onAddTask(e) {
    e.preventDefault();

    this.setState({
      displayAddTask: !this.state.displayAddTask
    });
  }

  onTaskSelect(e) {
    try {
      e.preventDefault();
      let selectedId = e.currentTarget.id;

      console.log('\n*ENTERING onTaskSelect()');
      console.log(`onTaskSelect selection: ${selectedId}`);

      if ( selectedId !== this.state.selectedTask.name ) { //selected task is not the same as the current task
        console.log('onTaskSelect(): new task selected - updating state');
        let selectedTask = this.state.allTasks.filter( task => task.name === selectedId );
  
        if( selectedTask ) { //selected task is found
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

      else {
        console.log('onTaskSelect(): task previously selected - ONLY closing display menu');

        this.setState({
          displayMenu: false
        });
      }

    }
    catch(err) {
      console.log(`***ERR onTaskSelect(): ${err.message}`);
    }
  }

  onColorThemeSelect(e) {
    e.preventDefault();
    let selectedTheme = e.currentTarget.id;

    console.log(`onColorThemeSelect(): theme selected - ${selectedTheme}`);

    if ( selectedTheme !== this.state.theme.id ) { //different theme selected
      console.log('onColorThemeSelected(): different theme selected - updating state');

      if ( selectedTheme === 'dark-theme' ) {
        this.setState({
          displayMenu: false,
          theme: {
            id: 'dark-theme',
            path: './themes/dark-theme.css',
            arcFill: '#25282E',
            arcStroke: '#58D9FA'
          }
        });
      }

      else if ( selectedTheme === 'light-theme' ) {
        this.setState({
          displayMenu: false,
          theme: {
            id: 'light-theme',
            path: './themes/light-theme.css',
            arcFill: '#869BBD',
            arcStroke: '#020607'
          }
        });
      }
    }

    else {
      console.log('onColorThemeSelect(): same theme selected - ONLY menu closing');

      this.setState({
        displayMenu: false
      });
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
            <link rel='stylesheet' href={this.state.theme.path} />
            <Titlebar onMenu={this.onMenu} onClose={this.onClose} />

            <TaskView task={this.state.selectedTask} allTasks={this.state.allTasks} displayMenu={this.state.displayMenu}
                      onTaskSelect={this.onTaskSelect} theme={this.state.theme} onThemeSelect={this.onColorThemeSelect} 
                      displayAddTask={this.state.displayAddTask} onAddTask={this.onAddTask} />
        </div>
    );
  }
}

export default App;
