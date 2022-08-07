import React from 'react';

export default function Gender_Radio(props) {

    return (
        <div className={props.classFlexRadio}>
            <div>
                <input
                    checked
                    type="radio"
                    name="gender"
                    value="Male"
                    id="male"
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    checked={props.check === 'Male'}
                    onChange={props.onChange}
                />
                <label htmlFor="male" className={props.className}> Male</label>
            </div>
            <div>
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    id="female"
                    checked={props.check === 'Female'}
                    onChange={props.onChange}
                />
                <label htmlFor="female" className={props.className}> Female</label>
            </div>
        </div>
    );
}