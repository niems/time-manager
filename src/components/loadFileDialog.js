import React, {Component} from 'react';
import './style/loadFileDialog.css';

class LoadFileDialog extends Component {
    constructor(props) {
        super(props);

        this.loadRef = undefined;
        this.setLoadRef = element => {
            this.loadRef = element;
        }
    }

    render() {
        return (
            <div id='load-file-dialog-container'>
                load file dialog test
            </div>
        );
    }
}

export default LoadFileDialog;