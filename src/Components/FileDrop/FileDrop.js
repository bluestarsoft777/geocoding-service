import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import UploadIcon from './UploadIcon';
import { readJSON } from '../../utility/readFile';
import './style.css';

class FileDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    handleDrop = (acceptedFiles, rejectedFiles) => {
        const { onFileRead } = this.props;

        readJSON(acceptedFiles[0])
            .then(locations => {
                onFileRead({ locations });
                this.setState({ error: null });
            })
            .catch(error => {
                console.error('error', error);
                this.setState({ error });
            });
    };

    renderError() {
        const { error } = this.props;
        if (!error) return null;

        return (
            <p>
                {error}
            </p>
        );
    }

    render() {
        const errorMessage = this.renderError();

        return (
            <div>
                {errorMessage}
                <Dropzone
                    className="dropzone"
                    onDrop={this.handleDrop}
                    multiple={false}
                    activeClassName="dropzone--accept"
                    rejectClassName="dropzone-reject"
                >
                    Drop a JSON file containing locations <br />
                    or click to open the file dialog <br />
                    <UploadIcon />
                </Dropzone>
            </div>
        );
    }
}

export default FileDrop;
