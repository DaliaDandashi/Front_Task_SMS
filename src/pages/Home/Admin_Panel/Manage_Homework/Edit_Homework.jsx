import React, { useState, useEffect } from 'react';
import API from '../../../../api/axios';

import IN from '../../../components/Input';

export default function Edit_Admin(props) {

    const [state, updateState] = useState({
        fname: "",
        lname: "",
        username: "",
        password: ""
    });

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setState({ [name]: value });
    }

    const getAdmin = async id => {
        await API.get(`admin/${id}`)
            .then(res => {
                const result = res.data.data;
                setState(result);
            });
    }

    const handleSave = async e => {
        e.preventDefault();
        const id = props.match.params.id;
        let reqBody = state;
        await API.put(`admin/${id}`, reqBody);
        await props.history.push(`/admin/list`);
    }

    useEffect(() => {
        getAdmin(props.match.params.id);
    }, []);

    return (
        <div className="divaddadmin">
            <form onSubmit={handleSave}>
                <label for="fname">First Name</label>
                <IN
                    type="text"
                    name="fname"
                    value={state.fname}
                    onChange={handleChange}
                    className="textaddadmin"
                    placeholder="First Name"
                />
                <label for="lname">Last Name</label>
                <IN
                    type="text"
                    name="lname"
                    value={state.lname}
                    onChange={handleChange}
                    className="textaddadmin"
                    placeholder="Last Name"
                />
                <label for="lname">Username</label>
                <IN
                    type="text"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    className="textaddadmin"
                    placeholder="Username"
                />
                <label for="lname">Password</label>
                <IN
                    type="text"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    className="textaddadmin"
                    placeholder="Password"
                />
                <div className="buttonsadmin">
                    <IN
                        type="button"
                        value="Cancel"
                        onClick={() => props.history.push('/admin/list')}
                        className="canceladdadmin"
                    />
                    <IN
                        type="submit"
                        value="Update"
                        className="submitaddadmin"
                    />
                </div>
            </form>
        </div>
    );
}