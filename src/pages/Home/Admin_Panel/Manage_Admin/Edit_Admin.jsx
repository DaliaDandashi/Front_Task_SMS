import React, { useState, useEffect } from 'react';
import API from '../../../../api/axios';

import IN from '../../../components/Input';

export default function Edit_Homework(props) {

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

    const getHomework = async id => {
        await API.get(`homework/${id}`)
            .then(res => {
                const result = res.data.data;
                setState(result);
            });
    }

    const handleSave = async e => {
        e.preventDefault();
        const id = props.match.params.id;
        let reqBody = state;
        await API.put(`homework/${id}`, reqBody);
        await props.history.push(`/homework/list`);
    }

    useEffect(() => {
        getHomework(props.match.params.id);
    }, []);

    return (
        <div className="divaddhomework">
            <form onSubmit={handleSave}>
                <label for="fname">Description</label>
                <IN
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    className="divaddhomework"
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
                        className="canceladdhomework"
                    />
                    <IN
                        type="submit"
                        value="Update"
                        className="submitaddhomework"
                    />
                </div>
            </form>
        </div>
    );
}