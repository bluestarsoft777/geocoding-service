import React from 'react';
import './header.css';
import './logo.css';
import logo from '../../logo.png';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">
                <img className="header__logo" src={logo} />
            </h1>
        </header>
    );
};

export default Header;
