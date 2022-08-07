import React from 'react';

export default function TR(props) {

    return (
        <tr>
            <td > <label for={props.for}>{props.description}</label></td>
            <td>
                <input
                    readOnly={props.readOnly}
                    required={props.required}
                    
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    value={props.value}
                    id={props.id}
                    onChange={props.onChange}
                    className="textaddadmin"
                />
            </td>
        </tr>
    );
}