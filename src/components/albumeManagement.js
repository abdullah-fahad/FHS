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
            <>
            {album.map((albumImage, index)=> (
                <div className='album-image-container'>
                <img className='album-image' alt="fff" src={albumImage.picture} />
                <p className='album-caption'>{albumImage.picTitle}</p>
                <div className='btn-group album-btns'>
                    <button key={index} className='btn btn-info album-btn'>تعديل الإسم</button>
                    <button key={index} className='btn btn-danger'>حذف</button>
                </div>
            </div>
          ))}
            </>
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