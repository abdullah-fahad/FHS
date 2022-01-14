import react from 'react';
import './styles.css';

var Bottom = () => {
    return (
        <div>
            <nav className=" navbar navbar-expand-sm navbar-dark bg-dark justify-content-center">
                <div className="mrtop">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <a className="nav-link bottomLink" href="/home"><img alt="alfaisaliah-highschool"src="https://img.icons8.com/material-rounded/20/306CB0/home.png"/>الرئيسية</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bottomLink" href="/login"><img alt="alfaisaliah-highschool"  src="https://img.icons8.com/ios-filled/20/306CB0/login-rounded-right.png"/>صفحة الإدارة(للمعلمين)</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bottomLink lstbot" href="/contact-us"><img alt="alfaisaliah-highschool" src="https://img.icons8.com/material-rounded/20/306CB0/mail.png"/>تواصل معنا</a>
                        </li>
                    </ul>
                    <p className="navbar-text text-center text">All rights reserved<span>&copy;</span>2021 </p>
                </div>
            </nav>
        </div>
    )
}

export default Bottom;