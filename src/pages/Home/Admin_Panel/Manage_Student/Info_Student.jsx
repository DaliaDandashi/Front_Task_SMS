import React, { useState, useEffect } from 'react';
import API from '../../../../api/axios';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import TR from '../../../components/TR';
import IN from '../../../components/Input';

export default function Info(props) {

    const id = props.match.params.id;

    const [state, updateState] = useState({
        name: "",
        gender: "",
        phone: "",
        teacher_name: "",
    });

    const setState = (nextState) => {
        updateState(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    const fetchdata = async id => {

        await API.get(`student/${id}`)
            .then(res => {
                const result = res.data.data;
                setState(result);
            });
    }

    const deleteStudent = async id => {
        await API.delete(`student/${id}`);
        await props.history.push(`/student/list`);
    }

    const confirmDelete = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='divDelete'>
                        <span className="deleteSpan1">DELETE STUDENT</span>
                        <span className="deleteSpan2">Are you sure you want to delete this Student?</span>
                        <div className="deleteDivButtons">
                            <button
                                className="submitaddadmin"
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteStudent(id);
                                    onClose();
                                }}
                                className="canceladdadmin"
                            > Delete </button>
                        </div>
                    </div>
                );
            }
        })
    }

    useEffect(() => {
        fetchdata(props.match.params.id);
    }, []);

    return (
        <div className="divaddadmin">
            <form>

                <table className="tableCenterForm">
                    <TR
                        readOnly
                        description="ID"
                        type="text"
                        value={id}
                        placeholder="ID"

                    />

                    <TR
                        required
                        description="Name"
                        type="text"
                        name="name"
                        value={state.name}
                        placeholder=" Name"

                    />
                    <TR
                        description="PhoneNumber"
                        type="text"
                        placeholder="PhoneNumber"
                        name="phone"
                        value={state.phone}
                    />
                    <TR
                        description="Teacher"
                        type="text"
                        placeholder="Teacher"
                        name="teacher"
                        value={state.teacher_name}
                    />
                </table>
                <div className="buttonsadmin">

                    <IN
                        type="button"
                        value="Delete"
                        onClick={() => confirmDelete(state.id)}
                        className="canceladdadmin topright2"
                    />

                    <IN
                        type="button"
                        value="Edit Profile"
                        onClick={() => props.history.push(`/student/edit/${state.id}`)}
                        className="submitaddadmin topright"
                    />

                </div>
            </form>
        </div>
    );
}