import axios from 'axios';
import omit from 'lodash/omit';

// const BASE_URL = `http://nominatim.openstreetmap.org/search?format=json&street={street}&city={city}&country={country}`;

function generateUrl({street, city, country}) {
    return `http://nominatim.openstreetmap.org/search?format=json&street=${street}&city=${city}&country=${country}`;
}

export default function getLocation(location) {
    const {street, city, country} = location;
    const url = generateUrl({street, city, country});

    return axios
        .get(url)
        .then(({data}) => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

export function addCoordinatesToLocation(location, coordinateData) {
    const data = coordinateData[0] || {};

    const latitude = data.lat ? Number(data.lat).toFixed(4) : null;
    const longitude = data.lat ? Number(data.lon).toFixed(4) : null;

    return {
        ...location,
        latitude,
        longitude
    };
}
