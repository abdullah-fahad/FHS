import React, {useState} from 'react'
import axios from 'axios'

var getAlbum = async() => {
    var album;
    await axios.get("https://al-faisaliah-highschool.herokuapp.com/album").then(response => album = response.data).catch(err => console.log(err))
    return album;
  }

var AlbumeManagement = () =>{
    var [album, setAlbum] = useState()
    if(!album){getAlbum().then(res => setAlbum(res))}
    if(album) {
        return (
            <div className='album-image-container'>
                <img className='album-image' alt="fff" src="https://via.placeholder.com/150" />
                <span className='album-caption'>Hey!</span>
                <div className='btn-group'>
                    <button className='btn btn-info album-btn'>تعديل الإسم</button>
                    <button className='btn btn-danger album-btn'>حذف</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <h1>
                لايوجد أي صور في الألبوم
            </h1>
        )
    }
}

export default AlbumeManagement;