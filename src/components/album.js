import React, {useState} from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade } from 'react-slideshow-image';
import axios from 'axios';
import './styles.css';


var getAlbum = async() => {
  var album;
  await axios.get("/album").then(response => album = response.data).catch(err => console.log(err))
  console.log(album)
  return album;
}

var Album = () => {
    var [album, setAlbum] = useState();
    if(!album){getAlbum().then(res => setAlbum(res))}
    console.log(Album)
    if(album){
    return (
        <div>
            <div className="slide-container">
        <Slide indicators transitionDuration={500} duration={1200} arrows={false}>
         {album.map((albumImage, index)=> (
            <div className="each-slide" key={index}>
              <img className="albumImage mx-auto d-block" src={albumImage.picture} />
              <h4 className="centered-text">{albumImage.picTitle}</h4>
            </div>
          ))} 
        </Slide>
      </div>
        </div>
    );
    }
    else{
      return(<p className="centered-text">لايوجد أي صور في الألبوم</p>);
    }
}

export default Album;