import React, { useState } from 'react';
import API from '../../../../api/axios';


import TR from '../../../components/TR';
import IN from '../../../components/Input';
import Gender_Radio from '../../../components/Gender_Radio';

export default function Create_Student(props) {

    const [state, updateState] = useState({
        name: "",
        gender: "",
        phone: "",
        teacher_id: "",
        teacher_name: "",
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

    const handleSave = async e => {
        e.preventDefault();
        let reqBody = state;
        await API.post(`student`, reqBody);
        await props.history.push(`/student/list`);
    }

    const changeImage = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createImage(files[0]);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setState({ image: e.target.result });
            setState({ profile: e.target.result });
        };
    }

    return (
        <div className="divaddadmin">
            <form onSubmit={handleSave}>

                <div className="file-field">
                </div>

                <table className="tableCenterForm">
                    <TR
                        required
                        description="Name"
                        type="text"
                        name="Name"
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
                        type="number"
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
                        onClick={() => props.history.push('/student/list')}
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
    );
}