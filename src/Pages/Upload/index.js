import React, {Component} from 'react';
import Table from '../../Components/Table';
import FileDrop from '../../Components/FileDrop';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import getLocation, {addCoordinatesToLocation} from '../../utility/getLocation';
import phoneImage from './phone.png';
import './style.css';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: null,
            error: null
        };
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
                <Button blue onClick={e => this.clearLocations()}>
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

    renderContent(locations) {
        if (locations) return <Table data={locations} />;

        return (
            <div className="content">
                <FileDrop onFileRead={this.handleLocationsRead} />
                <div className="phone-picture__container">
                    <img className="phone-picture" src={phoneImage} alt="image of phone with the geocoding app" />
                </div>
            </div>
        );
    }

    render() {
        const {locations} = this.state;
        const actions = this.renderActions(locations);
        const content = this.renderContent(locations);

        return (
            <div className="App">
                <Header />

                <div>
                    {actions}
                    {content}
                </div>
            </div>
        );
    }
}

export default Upload;
