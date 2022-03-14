import React from 'react';
import Album from './album';
import AlbumeManagement from './AlbumeManagement';
import './styles.css';

var ManagerAlbum = () => {
    return(
        <div className='container'>
            <h1>الألبوم</h1>
            <p>حيث يمكنك الإشراف على الألبوم, تعديله أو إضافة صور جديدة</p>
            <button className="btn btn-success">إضافة صورة <img alt="alfaisaliah-highschool"src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/></button>
            <br />
            <br />
            <h1><AlbumeManagement /></h1>
        </div>
    );
}

export default ManagerAlbum;