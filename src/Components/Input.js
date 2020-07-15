import React from 'react';

const Input = props => {
    return (
        <>
            <label htmlFor={props.label}>
                {props.placeholder}
            </label>
            <input
                name={props.name}
                type={props.type}
                id={props.name}
                placeholder={props.placeholder}
                onChange={props.handleChange}
                value={props.value}
            />
            {props.errors[props.name].length !== 0 && <p>{props.errors[props.name]}</p>}
        </>
    );
};

export default Input;