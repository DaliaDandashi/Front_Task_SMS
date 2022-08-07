import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../../api/axios';

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function List_Homework(props) {

    const [homeworks, setHomeworks] = useState([]);

    const fetchdata = async () => {
        await API.get(`homework`)
            .then(res => {
                const result = res.data.data;
                setHomeworks(result);
                console.log(result);
            });
    }

    const deleteHomework = async id => {
        await API.delete(`homework/${id}`);
        window.location.reload();
    }

    const confirmDelete = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='divDelete'>
                        <span className="deleteSpan1">DELETE HOMEWORK</span>
                        <span className="deleteSpan2">Are you sure you want to delete thisHomework?</span>
                        <div className="deleteDivButtons">
                            <button
                                className="submitaddhomework"
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteHomework(id);
                                    onClose();
                                }}
                                className="canceladdhomework"
                            > Delete </button>
                        </div>
                    </div>
                );
            }
        }) 
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF HOMEWORKS</h2></div>
                <button onClick={() => props.history.push('/homework/create')} className="add-new"><i className="fa fa-plus"></i></button>
            </div>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <table className="table table-bordered">

                        <thead>
                            <tr>
                                <th>Descriptin</th>
                                <th>Teache_ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {homeworks.map(homework =>
                                <tr key={homework.id}>
                                    <td>{homework.description}</td>
                                    <td>{homework.teacher_id}</td>
                                    <td>
                                        <Link to={`/homework/edit/${homework.id}`} className="editHomework">
                                            <i className="material-icons">&#xE254;</i>
                                        </Link>

                                        <Link to="/homework/list" onClick={() => confirmDelete(homework.id)} className="deleteHomework">
                                            <i className="material-icons">&#xE872;</i> 
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}