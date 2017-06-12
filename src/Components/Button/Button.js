import React from 'react';
import './button.css';

const Button = props => {
    const {fullWidth, blue} = props;
    // const classes = props.fullWidth ? 'button button--full-width' : 'button';
    const classes = `button ${fullWidth ? 'button--full-width' : ''} ${blue ? 'button--blue' : ''}`;

    return (
        <button className={classes} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
