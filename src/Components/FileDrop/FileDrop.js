import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import UploadIcon from './UploadIcon';
import CorrectIcon from './CorrectIcon';
import ErrorIcon from './ErrorIcon';
import {readJSON} from '../../utility/readFile';
import './file-drop.css';
import Button from '../Button';

class FileDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    handleDrop = (acceptedFiles, rejectedFiles) => {
        const {onFileRead} = this.props;

        readJSON(acceptedFiles[0])
            .then(locations => {
                onFileRead({locations});
                this.setState({error: null});
            })
            .catch(error => {
                console.error('error', error);
                this.setState({error});
            });
    };

    renderError() {
        const {error} = this.props;
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
            <div className="file-drop">
                <div className="file-drop__info">
                    The app will add coordinates <br />
                    for the locations by uploading them <br />
                    in a JSON format.
                </div>

                {errorMessage}
                <Button fullWidth onClick={e => this.dropzoneRef.open()}>
                    Upload file
                </Button>

                <Dropzone
                    ref={node => (this.dropzoneRef = node)}
                    className="dropzone"
                    accepts=".json"
                    onDrop={this.handleDrop}
                    multiple={false}
                    activeClassName="dropzone--accept"
                    rejectClassName="dropzone--reject"
                >
                    Drop a JSON file here
                    <UploadIcon />
                    <CorrectIcon />
                    <ErrorIcon />
                </Dropzone>

                <div className="file-drop__info file-drop__info--small">
                    You can see an example of the file
                    {' '}
                    <a href="/locations_example.json" download className="file-drop__info-link">
                        here.
                    </a>
                </div>
            </div>
        );
    }
}

export default FileDrop;
