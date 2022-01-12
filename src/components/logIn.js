import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './styles.css';
 
var LogIn = () => {
    var history = useHistory();
    if(localStorage.getItem("role")){
        if(localStorage.getItem("role") === "manager" && sessionStorage.getItem("loggedIn") && localStorage.getItem("userInfo")){
            history.push(`/manager`)
        }
        else if(localStorage.getItem("role" === "teacher" && sessionStorage.getItem("loggedIn") && localStorage.getItem("userInfo"))){
            history.push(`/teacher`)
        }
    }

    var [passcode, setPasscode] = useState();
    var [reRender, setReRender] = useState();

    var passcodeChanged = (e) => {
        e.preventDefault();
        setPasscode(e.target.value);
    }

    var submit = async() => {
        await axios.post('/login', {passcode: passcode}).then(res => {
            if(res.data.role === "manager"){
                localStorage.setItem("userInfo", JSON.stringify({name: res.data.name, picture: res.data.picture}))
                localStorage.setItem("role", "manager")
                sessionStorage.setItem("loggedIn", "true")
                setReRender(1)
            }
            else if(res.data.role === "teacher"){
                localStorage.setItem("userInfo", JSON.stringify({name: res.data.name, picture: res.data.picture}))
                localStorage.setItem("role", "teacher")
                sessionStorage.setItem("loggedIn", "true")
                setReRender(1)
            }
        })
    }
    return(
        <div className="big">
            <br /><br /><br />
            <div className="login-form">
                <h1 className="login-form-header">أدخل رمز المرور الخاص بك</h1>
                <br />
                <input type="number" onChange={passcodeChanged} className="form-control" />
                <br />
                <button className="btn text-light button" onClick={submit}><span>دخول</span></button>
            </div>
        </div>
    )
}

export default LogIn;