import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../../api/axios';

import IN from '../../../components/Input';
import Gender_Radio from '../../../components/Gender_Radio';

export default function List_Student(props) {

    const [state, updateState] = useState({
        students: [],
        name: "",
        teacher_id: "",
        gender: ""
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

    const reqBody = {
        fname: state.name,
        teacher_id: state.teacher_id,
        gender: state.gender
    };

    const fetchdata = async () => {
        await API.post(`student`)
            .then(res => {
                let result = res.data.data;

                if (state.name != "") {
                    result = result.filter(r =>
                        ((r.name.slice(0, state.name.length)).toLowerCase() == (state.name).toLowerCase())
                    );
                }
                if (state.teacher_id != "") {
                    result = result.filter(r => r.teacher_id == state.teacher_id);
                }
                if (state.gender != "") {
                    result = result.filter(r => r.gender == state.gender);
                }

                setState({ students: result });
            });
    }

    useEffect(() => {
        fetchdata(reqBody);
    }, [JSON.stringify(reqBody)]);

    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">LIST OF STUDENTS</h2></div>
                <button onClick={() => props.history.push('/student/create')} className="add-new"><i className="fa fa-plus"></i></button>
            </div>
            <div className="divFilterS">
                <div>
                    <IN
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Search"
                        className="inputSearchSpan"
                    />
                    <span className="searchspan">
                        <i className="fa fa-search"></i>
                    </span>
                </div>

                <div className="divrowselect">
                   <td>
                    <input
                        name="teacher_id"
                        id={state.teacher_id}
                        onChange={handleChange}
                        className="filterClass"
                    />
                    </td>
                </div>

                <Gender_Radio
                    onChange={handleChange}
                    check={state.gender}
                    className="malefemalename"
                    classFlexRadio="classFlexRadio"
                />

            </div>

            <div className="flexRowStu">
                {state.students.map(student => (
                    <Link onClick={() => props.history.push(`/student/info/${student.id}`)}>
                        <div key={student.id} className="container mt-5 d-flex justify-content-center widthAndDiv">
                            <div className="card p-3">
                                <div className="d-flex align-items-center">
                                   
                                    <div className="ml-3 w-100">
                                        <h4 className="mb-0 mt-0">{student.name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div >
        </div >
    );
}