import React, {Component} from 'react';
import FileSaver from 'file-saver';
import './style/fileMenu.css';

function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    return !!navigator.getUserMedia;
}

function loadFile( fileSelection ) {
    //load data from file here, then pass back to main to update state
    console.log('loadFile()');

    if ( fileSelection ) {
        //file selection click to trigger window open
        console.log('loadFile() file exists :D');
        fileSelection.click();
    }
}

class FileMenu extends Component {
    constructor(props) {
        super(props);

        this.videoTest = false;
        this.videoRef = undefined;


        this.loadFileSelection = undefined; //user-selected file

        this.onSubmit = this.onSubmit.bind(this);
    } 

    componentDidUpdate() {
        if ( !this.videoTest ) { 
            if ( this.props.load ) {
                console.log('componentDidUpdate() LOADING');
                loadFile( this.loadFileSelection );
            }

            else if ( this.props.save ) {
                console.log('componentDidUpdate() SAVING TASKS');
            }
        }
    }

    componentDidMount() {

        if ( !this.videoTest ) { 
            if ( this.props.load ) {
                console.log('componentDidUpdate() LOADING');
                loadFile( this.loadFileSelection );
            }

            else if ( this.props.save ) {
                console.log('componentDidUpdate() SAVING TASKS');
            }
        }

        else { //used only for testing webcam
            if ( hasUserMedia() ) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    
                navigator.getUserMedia({ video: true, audio: false }, (stream) => {
                    if ( this.videoRef ) {
                        this.videoRef.src = window.URL.createObjectURL(stream);
                    }
    
                    else {
                        console.log('componentDidMount(): failed to get video reference');
                    }
                }, (err) => {
                    console.log(`ERR componentDidMount(): ${err.message}`);
                });
            }
    
            else {
                console.log('WebRTC not supported');
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let reader = new FileReader();
        reader.onload = (e) => {
            var buffer = reader.result;

            console.log(`loadFile() buffer: ${JSON.stringify( JSON.parse(buffer) )}`);
        }

        reader.readAsText( this.loadFileSelection.files[0] );
    }

    render() {
        if ( this.videoTest ) {
            return (
                <div id='video-test-container'>
                    <video id='video-stream' ref={video => { this.videoRef = video; } } autoPlay='true'></video>
                </div>
            );
        }

        return (
            <div id='file-menu-container'>
                <form onSubmit={this.onSubmit}>
                    <input className='file-menu-input-selection' type='file' ref={input => {this.loadFileSelection = input; } } />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default FileMenu;