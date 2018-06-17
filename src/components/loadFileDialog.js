import React, {Component} from 'react';
import './style/loadFileDialog.css';

//given the initial id name/names, adds and returns the theme
function addTheme(classes, theme) {
    switch( theme ) {
        case 'dark-theme':
            classes += ' dark-theme';
            break;

        case 'light-theme':
            classes += ' light-theme';
            break;
    }

    return classes;
}

//checks the formatting of the data from the loaded file
//returns true if formatting is correct, false otherwise
function isFileFormatValid(data) {
    try {
        //determines if the format of each object in the file is valid
        let isFormatInvalid = data.filter( item => 
                                           !item.name &&
                                           !item.completedDuration.hr &&
                                           !item.completedDuration.min &&
                                           !item.completedDuration.sec &&
                                           !item.totalDuration.hr &&
                                           !item.totalDuration.min &&
                                           !item.totalDuration.sec
                                        );
    
        console.log(`isFileFormatValid() invalid count: ${isFormatInvalid.length}`);
        if ( isFormatInvalid.length > 0 ) { //format is invalid at at least once
            console.log('isFileFormatValid(): loaded file is INVALID');
            return false;
        }
    
        console.log('isFileFormatValid(): loaded file is VALID  :D');
        return true; //format is valid
    }
    catch(err) {
        console.log(`ERR isFileFormatValid(): ${err.message}`);
        return false;
    }
}

class LoadFileDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filename: 'N/A', //name of file selected by user
            displayDialog: true //displays the load file dialog by default, but can be closed in this component
        };

        this.selectedFile = undefined; //selected file to load, updated when onFileChange() is called
        this.loadRef = undefined;  //reference for file to load
        this.setLoadRef = element => { //sets the reference for the load file once the element exists
            this.loadRef = element;
        } 
        
        this.onFileSelect = this.onFileSelect.bind(this); //callled when component mounts and when selection button is clicked - opens file directory
        this.onFileChange = this.onFileChange.bind(this); //called when a user selects a file from the directory
    }

    componentDidMount() {
        this.onFileSelect(); //opens file directory for file selection
    }

    onFileChange(e) {
        e.preventDefault();
        console.log(`onFileChange() loadref files: ${this.loadRef.files}`);

        if ( typeof( this.loadRef.files[0] ) !== 'undefined' ) { //new file not loaded - triggered when user closes file directory window
            let reader = new FileReader;

            reader.onload = (e) => {
                try {
                    let results = JSON.parse( reader.result );
                    console.log(`result type: ${ typeof(results) }`);
                    console.log(`file data: ${results}`);
                    console.log(`file data JSON: ${ JSON.stringify(results) }\n\n`);
                    
                    if ( isFileFormatValid( results ) ) { //tests formatting of file before updating allTasks state
                        this.props.onLoad( results ); //updates allTasks to loaded tasks
                    }
                }
                catch(err) {
                    console.log(`onFileChange reader ERROR: ${err.message}`);
                }

            }

            reader.onerror = (e) => {
                console.log(`ERR onFileChange(): ${reader.error}`);
            }

    
            this.setState({
                filename: this.loadRef.files[0].name
            });
    
            reader.readAsText( this.loadRef.files[0] );
        }

        else {
            console.log('onFileChange() file unable to load - no action taken');
        }
    }

    onFileSelect(e = undefined) {
        if ( this.loadRef ) { //reference to file select exists
            this.loadRef.click(); //opens file directory for selection
        }
    }

    render() {
        let fileCloseClasses = addTheme('load-file-close', this.props.themeId);
        console.log(`file close: ${fileCloseClasses}`);

        return (
            <div id='load-file-dialog-container'>
                <img className={fileCloseClasses} src='./images/titlebar-icons/close.svg' alt='load file close unable to load' onClick={this.props.onClose} />
                
                <div id='load-file-info'>
                    <h4 id='load-file-title'>Load file:</h4>
                    <span id='load-file-name'>{this.state.filename}</span>
                </div>

                <button id='load-file-select' onClick={this.onFileSelect}>select file</button>

                <input id='load-file-input' type='file' ref={this.setLoadRef} onChange={this.onFileChange} />
            </div>
        );
    }
}

export default LoadFileDialog;