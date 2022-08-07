import React, { useState, useEffect } from 'react';
import API from '../../../../api/axios';


import TR from '../../../components/TR';
import IN from '../../../components/Input';
import Gender_Radio from '../../../components/Gender_Radio';

export default function Info_Classroom(props) {

    const [state, updateState] = useState({
        name: "",
        gender: "",
        phone: "",
        teacher_id: "",
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
        console.log(state);
    }

    const fetchdata = async (id) => {
        await API.get(`student/${id}`)
            .then(res => {
                const result = res.data.data;
                setState(result);
            });
    }

    const updateStudent = async e => {
        e.preventDefault();
        const id = props.match.params.id;
        let reqBody = state;
        console.log(reqBody);
        await API.put(`student/${id}`, reqBody);
        await props.history.push(`/student/list`);
    }

    useEffect(() => {
        fetchdata(props.match.params.id);
    }, []);


    return (
        <div>
            <div className="divaddadmin">
                <form onSubmit={updateStudent}>
                    <table className="tableCenterForm">
                        <TR
                            required
                            description="Name"
                            type="text"
                            name="name"
                            value={state.fname}
                            placeholder="Name"
                            onChange={handleChange}
                        />
                        
                        <tr>
                            <td><label>Gender</label></td>
                            <td>
                                <Gender_Radio
                                    name="gender"
                                    check={state.gender}
                                    onChange={handleChange}
                                    className="malefemalename"
                                    classFlexRadio="classFlexRadio"
                                />
                            </td>
                        </tr>
                        
                      
                        <TR
                            description="PhoneNumber"
                            type="text"
                            placeholder="PhoneNumber"
                            name="phone"
                            value={state.phone}
                            onChange={handleChange}
                        />
                       
                       
                    </table>

                    <div className="buttonsadmin">
                        <IN
                            type="button"
                            value="Cancel"
                            onClick={() => props.history.push(`/student/info/${props.match.params.id}`)}
                            className="canceladdadmin"
                        />
                        <IN
                            type="submit"
                            value="Save"
                            className="submitaddadmin"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}