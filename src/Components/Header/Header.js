import React from 'react';
import './style.css';

const exampleString = `
[{
    street: '350 Fifth Avenue',
    city: 'New York',
    country: 'USA'
}, ...]
`;

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">
                <span>Geocoding</span> <span>service</span>
            </h1>
            <div className="header__info">
                To use upload a JSON file containing locations formatted like the
                {' '}
                <a
                    href="/locations_example.json"
                    download
                    className="header__info-link"
                >
                    following
                </a>
            </div>
        </header>
    );
};

export default Header;
