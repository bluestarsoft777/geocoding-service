import React from 'react';
import './style.css';

const Button = props => {
    return (
        <button className="button" {...props}>
            {props.children}
        </button>
    );
};

export default Button;
