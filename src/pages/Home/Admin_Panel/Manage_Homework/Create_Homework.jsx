import React, { useState } from 'react';
import API from '../../../../api/axios';

import IN from '../../../components/Input';

export default function Create_Homework(props) { 

    const [state, updateState] = useState({
        descripton: "",
        teacher_id: ""
    });

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const handleChange = e => {
        let { description, value } = e.target;
        setState({ [description]: value });
    }

    const handleSave = async e => {
        e.preventDefault();
        let reqBody = state;
        await API.post(`homework`, reqBody);
        await props.history.push(`/homework/list`);
    }

    return (
        <div className="divaddhomework">
            <form onSubmit={handleSave}>
                <label for="description">Description</label>
                <IN
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    className="textaddhomework"
                    placeholder="Description"
                />
             
             
                <label for="lname">Teacher ID</label>
                <IN
                    type="number"
                    name="teacher_id"
                    value={state.teacher_id}
                    onChange={handleChange}
                    className="textaddhomework"
                    placeholder="Teacher_ID"
                />
                <div className="buttonshomework">
                    <IN
                        type="button"
                        value="Cancel"
                        onClick={() => props.history.push('/homework/list')}
                        className="submitaddhomework"
                    />
                    <IN
                        type="submit"
                        value="Save"
                        className="submitaddhomework"
                    />
                </div>
            </form>
        </div>
    );
}