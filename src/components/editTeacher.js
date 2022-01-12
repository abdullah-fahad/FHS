import React, {useState} from "react";
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import { toast } from "react-toastify";
import './styles.css';

var getTeacher = async(id) => {
    var teacher;
    console.log(id);
    await axios.post("https://al-faisaliah-highschool.herokuapp.com/search-teachers", {_id: id}).then(response => teacher = response.data).catch(err => console.log(err))
    console.log(teacher)
    return teacher;
}

var EditTeacher = () => {
    var history = useHistory();
    var postId = useParams();
    var [teacher, setTeacher] = useState();
    var [teacherInfo, setTeacherInfo] = useState();
    var cancel = () => {
        return null;
    }
    var submit = () => {
        return null;
    }

    var pictureChanged = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let inFile = e.target.files[0];
        reader.onloadend = () => {
            console.log(1 + reader.result)
            setTeacher({
                name: teacher.name, 
                passcode: teacher.passcode, 
                picture: reader.result, 
            })
    }
    reader.readAsDataURL(inFile);
    }
    
    var nameChanged = (e) => {
        e.preventDefault();
        setTeacher({
            name: e.target.value, 
            passcode: teacher.passcode, 
            picture: teacher.picture, 
        })
    }
    var passcodeChanged = (e) => {
        e.preventDefault();
        setTeacher({
            name: teacher.name, 
            passcode: e.target.value, 
            picture: teacher.picture, 
        })
    }
    var cancel = () => {
        history.push('/manager');
    }
    var submit = async() => {
        console.log(teacher)
        await axios.post('https://al-faisaliah-highschool.herokuapp.com/edit-teacher', {name: teacher.name, passcode: teacher.passcode, picture: teacher.picture, classes: teacher.classes, _id: teacherInfo._id})
            .then(res => {
                history.push('/manager');
                toast.success('تم تعديل بيانات المعلم', {
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

    console.log(postId)
    if(!teacher && !teacherInfo){getTeacher(postId.id).then(res => {
        setTeacher(res);
        setTeacherInfo(res)
        console.log(teacher)

    })
    return (
        <div>لم يتم ايجاد المعلومات التي تبحث عنها</div>
    )
}

    else if(teacher){
        return(
            <div>
                <br />
                <br />
                <h4>تعديل بيانات {teacher.name}</h4>
                <br />
                <form>
                    <label>الاسم</label>
                    <input type="text" className="form-control" placeholder={teacher.name} onChange={nameChanged}/>
                    <br />
                    <label>رمز الدخول</label>
                    <input type="text" className="form-control" placeholder={teacher.passcode} onChange={passcodeChanged}/>
                    <br />
                    <label>الصورة الشخصية</label><br />
                    <img className="teacher-image" src={teacher.picture} />
                    <input type="file" className="form-control" onChange={pictureChanged}/>
                    <br />
                <br />
                <br />
                <br />
                    <button type="button" onClick={submit} className="btn btn-success form-button">حفظ</button>
                    <button onClick={cancel} className="btn btn-danger form-button">إلغاء</button>
                </form>
                <br />
            </div>
        )   
    }
}

export default EditTeacher;