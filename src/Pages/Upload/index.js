import React, {Component} from 'react';
import Table from '../../Components/Table';
import FileDrop from '../../Components/FileDrop';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import getLocation, {addCoordinatesToLocation} from '../../utility/getLocation';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: null,
            error: null
        };
    }

    renderContent(locations) {
        if (!locations) return null;
        return <Table data={locations} />;
    }

    getCoordinates = locationsData => {
        const promises = locationsData.map(location => {
            return getLocation(location).then(locationData => {
                return addCoordinatesToLocation(location, locationData);
            });
        });

        return Promise.all(promises)
            .then(locations => {
                this.setState({locations, error: null});
            })
            .catch(err => {
                console.log('error', err);
                this.setState({error: err});
            });
    };

    clearLocations = () => {
        this.setState({locations: null, error: null});
    };

    handleLocationsRead = ({locations}) => {
        this.setState({locations});
    };

    renderActions = locations => {
        if (!locations) return null;

        const encodedContent = encodeURIComponent(JSON.stringify(locations, null, 4));
        const href = `data:text/json;charset=utf-8,${encodedContent}`;

        return (
            <div className="actions">
                <Button onClick={e => this.clearLocations()}>
                    Upload locations again
                </Button>

                <Button onClick={e => this.getCoordinates(locations)}>
                    Get locations
                </Button>
                <a id="downloadAnchorElem" className="button download-link" download="locations.json" href={href}>
                    Download data
                </a>
            </div>
        );
    };

    render() {
        const {locations} = this.state;
        const actions = this.renderActions(locations);
        const content = this.renderContent(locations);

        return (
            <div className="App">
                <Header />

                <div className="App-intro">
                    {actions}
                    {content}

                    <FileDrop onFileRead={this.handleLocationsRead} />
                </div>
            </div>
        );
    }
}

export default Upload;
