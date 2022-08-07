import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../../api/axios';

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function List_Admin(props) {

    const [admins, setAdmins] = useState([]);

    const fetchdata = async () => {
        await API.get(`admin`)
            .then(res => {
                const result = res.data.data;
                setAdmins(result);
                console.log(result);
            });
    }

    const deleteAdmin = async id => {
        await API.delete(`admin/${id}`);
        window.location.reload();
    }

    const confirmDelete = id => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='divDelete'>
                        <span className="deleteSpan1">DELETE ADMIN</span>
                        <span className="deleteSpan2">Are you sure you want to delete this Admin?</span>
                        <div className="deleteDivButtons">
                            <button
                                className="submitaddadmin"
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                onClick={() => {
                                    deleteAdmin(id);
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
        fetchdata();
    }, []);

    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF ADMINS</h2></div>
                <button onClick={() => props.history.push('/admin/create')} className="add-new"><i className="fa fa-plus"></i></button>
            </div>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <table className="table table-bordered">

                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {admins.map(admin =>
                                <tr key={admin.id}>
                                    <td>{admin.fname}</td>
                                    <td>{admin.lname}</td>
                                    <td>{admin.username}</td>
                                    <td>{admin.password}</td>
                                    <td>
                                        <Link to={`/admin/edit/${admin.id}`} className="editAdmin">
                                            <i className="material-icons">&#xE254;</i>
                                        </Link>

                                        <Link to="/admin/list" onClick={() => confirmDelete(admin.id)} className="deleteAdmin">
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