import React, {useState} from 'react';
import ManagerPosts from './managerPosts';
import ManagerTeachers from './managerTeachers';
import ManagerAlbum from './managerAlbum';
import NotAllowed from './notAllowed';
import './styles.css';

var Manager = () => {
    var [managerInfo, setManagerInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
    setManagerInfo(managerInfo)
    var [view, setView] = useState(<ManagerPosts />);
    if(!sessionStorage.getItem("loggedIn") || !localStorage.getItem('userInfo')){
        return <NotAllowed />
    }
    else{
        var postsView = (e) => {
            e.preventDefault();
            setView(<ManagerPosts />);
            document.getElementById('posts').className = "col-4 btn btn-primary posts-btn"
            document.getElementById('teachers').className = "col-4 btn btn-outline-warning"
            document.getElementById('album').className = "col-4 btn btn-outline-success"
        }
        var teachersView = (e) => {
            e.preventDefault();
            setView(<ManagerTeachers />);
            document.getElementById('posts').className = "col-4 btn btn-outline-primary"
            document.getElementById('teachers').className = "col-4 btn btn-warning teachers-btn"
            document.getElementById('album').className = "col-4 btn btn-outline-success"
        }
        var albumView = (e) => {
            e.preventDefault();
            setView(<ManagerAlbum />);
            document.getElementById('posts').className = "col-4 btn btn-outline-primary"
            document.getElementById('teachers').className = "col-4 btn btn-outline-warning"
            document.getElementById('album').className = "col-4 btn btn-success"
        }
        console.log(managerInfo)
        return(
            <div>
                <br />
                <br />
                <h1> مرحبا {managerInfo.name} ! </h1>
                <div className="sticky-top">
                    <p>هذه هي صفحتك الخاصة لإدارة الموقع, قم باختيار ماتريد القيام به من الخيارات أدناه</p>
                    <div className="manager-nav">
                        <div className="row">
                            <button id="posts" onClick={postsView} className="col-4 btn btn-primary">
                                المنشورات
                            </button>
                            <button id="teachers" onClick={teachersView} className="col-4 btn btn-outline-warning">
                                المعلمين
                            </button>
                            <button id="album" onClick={albumView} className="col-4 btn btn-outline-success">
                                الألبوم
                            </button>
                        </div>
                    </div>
                </div>
                {view}
            </div>
        );
    }
}

export default Manager;