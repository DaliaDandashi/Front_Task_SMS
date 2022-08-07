import React from 'react';

export default function Input(props) {
    return (
        <input
            readOnly={props.readOnly}
            required={props.required}
            
            type={props.type}
            name={props.name}
            value={props.value}
            onClick={props.onClick}
            onChange={props.onChange}
            className={props.className}
            placeholder={props.placeholder}
        />
    );
}