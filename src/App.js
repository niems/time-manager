import React, { Component } from 'react';
import FileSaver from 'file-saver';
import TaskMenu from './components/task-menu-components/taskMenu';
import AddTask from './components/add-task-components/addTask';
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

function DisplayMenu({ displayMenu, allTasks, onTaskSelect, themeId, onThemeSelect, removeTask, onSave }) {
  if ( displayMenu ) { //if the menu should be displayed
    return (
      <TaskMenu allTasks={allTasks} onTaskSelect={onTaskSelect} themeId={themeId} 
                onThemeSelect={onThemeSelect} removeTask={removeTask} onSave={onSave} />
    );
  }

  return null;
}

function DisplayAddTask({ themeId, displayAddTask, onClose, createTask }) {
  if ( displayAddTask ) { //if the add task window should be displayed
    return (
      <AddTask themeId={themeId} onClose={onClose} createTask={createTask} />
    );
  }

  return null;
}

function DisplayAddTaskSuccess({ name }) {
  return (
    <div id='add-task-success-container'>
      <h3 id='add-task-success-title'><span id='add-task-success-name'>{`"${name}"`}</span>{` added to tasks :D`}</h3>
    </div>
  );
}

function DisplayAddTaskFail({ name }) {
  return (
    <div id='add-task-fail-container'>
      <h3 id='add-task-fail-title'><span id='add-task-error-title'>Error</span>{`: "${name}" exists`}</h3>
      <span id='add-task-fail-msg'>The task already exists - no action taken </span>
    </div>
  );
}

class App extends Component {
  constructor(props) {
      super(props);

      this.recentlyRemovedId = undefined; //keeps the removed task (less than a second ago) from also being selected
      this.failedToAddTaskId = undefined; //used to display the name of the task that was not added in error message

      this.state = {
          displayMenu: false, //displays the task menu component

          displayAddTask: false, //displays the task add component
          displayAddTaskSuccess: false, //displays successfully added task window
          displayAddTaskFail: false, //displays failed to add task window

          theme: {
            id: 'dark-theme',
            path: './themes/dark-theme.css',
            arcFill: '#25282E',
            arcStroke: '#58D9FA'
          },

          selectedTask: undefined,

        allTasks: [
          {
            name: 'code',
            completedDuration: {
              hr: 0,
              min: 0,
              sec: 0
            },
            totalDuration: {
                hr: 2,
                min: 5,
                sec: 30
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
      this.onToggleAddTask = this.onToggleAddTask.bind(this); //toggles the add task modal window
      this.createNewTask = this.createNewTask.bind(this); //creates new task based on add task window
      this.removeTask = this.removeTask.bind(this); //removes selected task from task menu

      this.onSaveTasks = this.onSaveTasks.bind(this); //saves all tasks as a JSON object to a text file
      this.onLoadTasks = this.onLoadTasks.bind(this); //loads tasks from user selected file

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

  onToggleAddTask(e = undefined) {
    if ( e ) {
      e.preventDefault();
    }

    console.log('onToggleAddTask() updating toggle state');

    this.setState({
      displayAddTask: !this.state.displayAddTask
    });
  }

  createNewTask(task) {
    console.log(`createNewTask(): ${JSON.stringify(task)}`);

    let doesTaskExist = this.state.allTasks.filter( t => t.name.toLocaleLowerCase() === task.name.toLocaleLowerCase() ); //filters all out except for the same task name if it exists

    if ( !doesTaskExist.length  ) {  //if SAME task doesn't already exist
      console.log('createNewTask(): adding new task to all tasks :D');
      let allTasks = this.state.allTasks;
      
      let taskToAdd = {
        name: task.name,
        completedDuration: {
          hr: 0,
          min: 0,
          sec: 0
        },
        totalDuration: {
          hr: task.hr,
          min: task.min,
          sec: task.sec
        }
      };
      
      
      allTasks.unshift( taskToAdd );
      
      if ( typeof( this.state.selectedTask ) !== 'undefined' ) { //if a task is currently selected
        this.setState({ 
          allTasks: allTasks,
          displayAddTaskSuccess: true
        });
      }

      else { //no tasks previously existed - select added task
        this.setState({
          allTasks: allTasks,
          selectedTask: allTasks[0], //selects new task
          displayAddTaskSuccess: true
        })
      }

      setTimeout( () => {
        this.setState({
          displayAddTaskSuccess: false
        })
      }, 2000);
    }

    else {
      console.log('createNewTask(): task already exists - no action taken');
      //display failed to add task modal here, then use setTimeout to remove it

      this.failedToAddTaskId = task.name; //used in error message
      this.setState({
        displayAddTaskFail: true
      });

      setTimeout( () => {
        this.failedToAddTaskId = undefined;

        this.setState({
          displayAddTaskFail: false
        });
      }, 2000);
    }
  }

  removeTask(e) {
    e.preventDefault();
    this.recentlyRemovedId = e.currentTarget.id.replace('-delete', ''); //gets the id of the selected task to remove
    console.log(`removeTask() attempting to remove: ${this.recentlyRemovedId}\n`);

    let allTasks = this.state.allTasks.filter(task => task.name !== this.recentlyRemovedId); //removes the selected task from all tasks

    if ( this.state.selectedTask ) { //selected task exists
      console.log('removeTask(): selected task exists');
      if ( this.recentlyRemovedId === this.state.selectedTask.name ) { //removed task is also the selected task
        console.log('removeTask(): task to remove is also selected task');
        this.setState({
          allTasks: allTasks,
          selectedTask: undefined,
        });
      }

      else {
        console.log('removeTask(): task to remove is NOT selected task');
        this.setState({ allTasks });
      }
    }

    else {
      console.log('removeTask(): selected task does not exist - removing task & updating state');
      this.setState({ allTasks });
    }

    setTimeout( () => {
      this.recentlyRemovedId = undefined; //reset
    }, 1000);
  }

  onSaveTasks() {
    console.log('onSaveTasks()');

    //let blob = new Blob([ JSON.stringify( this.state.allTasks ) ], {type: 'text/plain; charset=utf-8'});
    let blob = new Blob([ JSON.stringify( this.state.allTasks ) ], {type: 'application/json; charset=utf-8'});
        FileSaver.saveAs(blob, 'tasks.txt');
  }

  onLoadTasks(file) {
    console.log('onLoadTasks()');

    let reader = new FileReader();

    reader.onload = (e) => {
      console.log(`onLoadTasks() data loaded: ${reader.result}`);
      
    }
  }

  onTaskSelect(e) {
    try {
      e.preventDefault();
      console.log('onTaskSelect()');
      let selectedId = e.currentTarget.id;

      if ( selectedId !== this.recentlyRemovedId ) { //only allows the task to be selected if it wasn't just removed 
        console.log('\n*ENTERING onTaskSelect()');
        console.log(`onTaskSelect selection: ${selectedId}`);

        //if ( selectedId !== this.state.selectedTask.name ) { //selected task is not the same as the current task

        //if no selected task exists or the current selected task differs from the user selected task
        if ( ( typeof( this.state.selectedTask ) === 'undefined' ) || ( selectedId !== this.state.selectedTask.name ) ) {
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
            arcFill: 'transparent',
            arcStroke: '#B983F8'
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
            <Titlebar themeId={this.state.theme.id} onMenu={this.onMenu} onClose={this.onClose} />

            <DisplayMenu displayMenu={this.state.displayMenu} allTasks={this.state.allTasks} onTaskSelect={this.onTaskSelect}
                         themeId={this.state.theme.id} onThemeSelect={this.onColorThemeSelect} removeTask={this.removeTask} />
            
            <DisplayAddTask themeId={this.state.theme.id} displayAddTask={this.state.displayAddTask} onClose={this.onToggleAddTask} createTask={this.createNewTask} />
            {this.state.displayAddTaskSuccess ? <DisplayAddTaskSuccess name={this.state.allTasks[0].name} /> : null}
            {this.state.displayAddTaskFail ? <DisplayAddTaskFail name={this.failedToAddTaskId} /> : null}

            <TaskView task={this.state.selectedTask} allTasks={this.state.allTasks} theme={this.state.theme}
                      onToggleAddTask={this.onToggleAddTask} onSave={this.onSaveTasks} onLoad={this.onLoadTasks} />
        </div>
    );
  }
}

export default App;
