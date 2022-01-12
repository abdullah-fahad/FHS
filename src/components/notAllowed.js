import React, {useState} from 'react';
import './styles.css';

var NotAllowed = () => {
    return(
        <div>
            <br />
            <br />
            <h1>لست مصرح بعرض هذه الصفحة!</h1>
            <p>يتوجب عليك تسجيل الدخول من خلال رمزك الخاص لعرض هذه الصفحة</p>
            <a href="/login">تسجيل الدخول (للمعلمين)</a>
        </div>
    );
}

export default NotAllowed;