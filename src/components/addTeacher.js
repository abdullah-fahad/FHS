import React, { useState } from 'react';
import NotAllowed from './notAllowed';
import axios from 'axios';
import './styles.css';
import { useHistory } from 'react-router';
import {toast} from 'react-toastify';

var AddTeacher = () => {
    var history = useHistory();
    var [name, setName] = useState("");
    var [grades, setGrades] = useState("");
    var [sections, setSections] = useState("");
    var [passcode, setPasscode] = useState("");
    var [picture, setPicture] = useState("");
    var nameChanged = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    var passcodeChanged = (e) => {
        e.preventDefault();
        setPasscode(e.target.value);
    }
    var gradesChanged = (e) => {
        e.preventDefault();
        setGrades(e.target.value);
    }
    var sectionsChanged = (e) => {
        e.preventDefault();
        setSections(e.target.value);
    }
    var pictureChanged = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let inFile = e.target.files[0];
        reader.onloadend = () => {
            setPicture(reader.result);
    }
    reader.readAsDataURL(inFile);
}
    var cancel = () => {
        history.push('/manager')
    }
    var submit = async() => {
        console.log(name + grades + sections + passcode + picture)
        if(name === "" || passcode === "" || grades === "" || sections === ""){
            toast.error('عليك ملئ جميع الحقول بشكل صحيح', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            await axios.post('https://al-faisaliah-highschool.herokuapp.com/add-teacher', {name: name, picture: picture || "https://tse1.mm.bing.net/th?id=OIP.sVrMAmmEljdzKDEba8nttAHaHa&pid=Api&P=0&w=300&h=300", passcode: passcode, classes: {grades, sections}})
            .then(response => {
                history.push('/manager')
                toast.success('تم إضافة المعلم', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
        }
    }
    return(
        <div>
            <br />
            <br />
            <h1>إضافة معلم جديد</h1>
            <p>قم بملئ الحقول أدناه بمعلومات المعلم ليتم إضافته</p>
            <label>معاينة:</label>
            <div className="teacher container">
                    <img alt="alfaisaliah-highschool"src={picture || "https://tse1.mm.bing.net/th?id=OIP.sVrMAmmEljdzKDEba8nttAHaHa&pid=Api&P=0&w=300&h=300"} className='teacher-image' />
                    <br />
                    <div className='row'>
                        <div className="col-6">
                            {name || "اسم المعلم"}
                        </div>
                        <div className="col-6">
                            <div className="btn-group">
                                <button className="btn btn-primary"><img src="https://img.icons8.com/ios-glyphs/20/ffffff/edit--v1.png"/></button>
                                <button className="btn btn-danger"><img src="https://img.icons8.com/material-rounded/20/ffffff/filled-trash.png"/></button>
                            </div>
                        </div>
                    </div>
                        {grades || "الفصول"}
                        <br />
                        {sections || "الشعب"}
            </div>
            <br /><br />
            <form className='section'>
                <div>
                    <label>الإسم:</label>
                    <input onChange={nameChanged} className='form-control' type="text" placeholder='اسم المعلم' />
                </div>
                <div className='form-inline'>
                    <label>الفصول والشعب</label><br />
                    <input onChange={gradesChanged} className='form-control short-input inline' type="text" placeholder='الفصول' />
                    <input onChange={sectionsChanged} className='form-control short-input inline' type="text" placeholder='الشعب' />
                </div>
                <div>
                    <label>رمز الدخول</label>
                    <input onChange={passcodeChanged} className='form-control' type="number" placeholder='يتكون من 4 خانات' />
                </div>
                <div>
                    <label>الصورة الشخصية</label>
                    <input onChange={pictureChanged} className='form-control' type="file" />
                    <img alt="alfaisaliah-highschool" src={picture || "https://tse1.mm.bing.net/th?id=OIP.sVrMAmmEljdzKDEba8nttAHaHa&pid=Api&P=0&w=300&h=300"} />
                </div>
            </form>
            <br />
            <hr />
            <button onClick={submit} type="button" className="btn btn-success form-button">إضافة</button>
            <button onClick={cancel} type="button" className="btn btn-danger form-button">عودة</button>
        </div>
    )
}

export default AddTeacher;