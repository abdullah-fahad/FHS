import react from 'react';
import './styles.css';

var Header = () => {
    return(
        <div>
            <nav className="fixnav navbar navbar-expand-sm navbar-light fixed-top">
                <a className="navbar-brand" href="/home"><img className="header-logo" src="https://i.imgur.com/t50LvLm.jpeg" /></a>
                <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon text-light"></span>
                </button>
                <div className="collapse navbar-collapse mrtop" id="collapsibleNavbar">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <a className="nav-link navbarLink" href="/home"><img src="https://img.icons8.com/material-rounded/20/306CB0/home.png"/>الرئيسية</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbarLink" href="/login"><img src="https://img.icons8.com/ios-filled/20/306CB0/login-rounded-right.png"/>صفحة الإدارة(للمعلمين)</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbarLink" href="/contact-us"><img src="https://img.icons8.com/material-rounded/20/306CB0/mail.png"/>تواصل معنا</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;