import React, {useState} from 'react';
import './styles.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';

var getTeachers = async() => {
    var teachers;
    await axios.get("https://al-faisaliah-highschool.herokuapp.com/get-teachers").then(response => {teachers = response.data; console.log(response.data)}).catch(err => console.log(err))
    return teachers;

}

var ShowTeachers = () => {
    var history = useHistory();
    var [teachers, setTeachers] = useState();
    var prettyTeachers = []
    if(!teachers){getTeachers().then(res => {setTeachers(res); console.log(teachers)})}

    var remove = async e => {
        e.preventDefault();
        console.log(e.target.name)
        if(teachers[e.target.name]._id){
            await axios.post('https://al-faisaliah-highschool.herokuapp.com/remove-teacher', {_id: teachers[e.target.name]._id}).then(res => {
                history.push('/manager')
                toast.success('تم إزالة المستخدم', {
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
    else{
        toast.danger('حدث خطأ ما, الرجاء إعادة المحاولة لاحقًا', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
}

    if(teachers && teachers.length === 0 || !teachers){
        return(
            <h1 className='not-found'>لايوجد أي معلمين حتى الآن</h1>
        )
    }
    else if(teachers){
        console.log(teachers)
        for(var x = teachers.length; x > 0; x--){
            console.log(x-1)
            prettyTeachers.push(
                <>
                <div className="teacher container">
                    <img alt="alfaisaliah-highschool"src={teachers[x-1].picture} className='teacher-image' />
                    <br />
                    <div className='row'>
                        <div className="col-6">
                            {teachers[x-1].name}
                        </div>
                        <div className="col-6">
                            <div className="btn-group">
                                <button name={x-1} className="btn btn-primary" onClick={e => history.push(`/manager/edit-teacher/${teachers[e.target.name]._id}`)} ><img alt="alfaisaliah-highschool" src="https://img.icons8.com/ios-glyphs/20/ffffff/edit--v1.png"/></button>
                                <button name={x-1} className="btn btn-danger" onClick={remove}><img src="https://img.icons8.com/material-rounded/20/ffffff/filled-trash.png"/></button>
                            </div>
                        </div>
                    </div>
                        {teachers[x-1].classes[0].grade}
                        <br />
                        {teachers[x-1].classes[0].section}
            </div>
            <br />
                </>
            )
        }
        return prettyTeachers;
    }

}

var ManagerTeachers = () => {
    var history = useHistory()

    var addTeacher = () => history.push("/manager/add-teacher")

    return(
        <div>
            <h1>المعلمين</h1>
            <p>حيث يمكنك الاطلاع على المعلمين, اضافة معلمين او تعديل معلوماتهم</p>
            <button className="btn btn-success" type="button" onClick={addTeacher}>إضافة معلم <img alt="alfaisaliah-highschool" src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/></button>
            <ShowTeachers />
        </div>
    );
}

export default ManagerTeachers;