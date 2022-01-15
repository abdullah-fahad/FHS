import React, { useState } from 'react';
import NotAllowed from './notAllowed';
import axios from 'axios';
import './styles.css';
import { useHistory } from 'react-router';
import {toast} from 'react-toastify';

var AddPosts = () => {
    var history = useHistory();
    var [postTitle, setPostTitle] = useState("");
    var [postDiscraption, setPostDiscraption] = useState("");
    var [postImage, setPostImage] = useState({
        imageURL: "",
        picFile: null
    });
    var [postContent, setPostContent] = useState("");
    var [postLink, setPostLink] = useState("");
    var [postLinkTitle, setPostLinkTitle] = useState("");

    var titleChanged = (e) => {
        e.preventDefault();
        setPostTitle(e.target.value);
        document.getElementById('title').className = "hide"
        document.getElementById('title-section').className = "section"
    }
    var discraptionChanged = (e) => {
        e.preventDefault();
        setPostDiscraption(e.target.value);
        document.getElementById('discraption').className = "hide"
        document.getElementById('discraption-section').className = "section"
    }
    var imageChanged = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let inFile = e.target.files[0];
        reader.onloadend = () => {
            console.log(1 + reader.result)
           setPostImage({
              imageURL: reader.result
           })
    }
    reader.readAsDataURL(inFile);
    document.getElementById('image').className = "hide"
    document.getElementById('image-section').className = "section"
}
    var contentChanged = (e) => {
        e.preventDefault();
        setPostContent(e.target.value);
        document.getElementById('content').className = "hide"
        document.getElementById('content-section').className = "section"

    }
    var linkChanged = (e) => {
        e.preventDefault();
        setPostLink(e.target.value);
    }
    var linkTitleChanged = (e) => {
        e.preventDefault();
        setPostLinkTitle(e.target.value);
    }
    var cancel = () => {
        history.push('/manager');
    }
    if(localStorage.getItem('userInfo') && sessionStorage.getItem('loggedIn')){
        var post = async() =>{
            if(!postTitle){
                document.getElementById('title').className = "text-light"
                document.getElementById('title-section').className = "section-danger"
            }if(!postDiscraption){
                document.getElementById('discraption').className = "text-light"
                document.getElementById('discraption-section').className = "section-danger"
            }if(!postImage.imageURL){
                document.getElementById('image').className = "text-light"
                document.getElementById('image-section').className = "section-danger"
            }if(!postContent){
                document.getElementById('content').className = "text-light"
                document.getElementById('content-section').className = "section-danger"
            }else{
                await axios.post('/add-news', {title: postTitle, discraption: postDiscraption, content: postContent, picture: postImage.imageURL, link: postLink, linkTitle: postLinkTitle, author: JSON.parse(localStorage.getItem("userInfo")).name})
                .then(res => {
                    history.push('/manager')
                    toast.success('تم إضافة المنشور', {
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
        }
        return(
            <div className="addPost">
                <br />
                <br />
                <h1>
                    إضافة منشور جديد
                </h1>
                <p>املأ الحقول أدناه بمعلومات المنشور ليتم إضافته</p>
                <div className="preview">
                    <label>معاينة</label><br />
                    <div className="post">
                    <img alt="alfaisaliah-highschool" className="post-img" src={postImage.imageURL || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"} /> 
                    <h3 className="post-thumb-title">{postTitle || "العنوان"}</h3>
                    <span className="author1">من {JSON.parse(localStorage.getItem('userInfo')).name || "مجهول"}</span>
                    <p className="post-thumb-text">{postDiscraption || "وصف المنشور"}</p>
                    <button className="btn btn-success post-btn">اقرأ الخبر</button>
                    </div>
                </div>
                <hr />
                <form>
                    <section id="title-section" className="section">
                        <h4>*عنوان المنشور</h4>
                        <input onChange={titleChanged} className="form-control" type="text" placeholder="أدخل عنوان المنشور هنا" />
                        <p id="title" className="text-light hide">عليك إضافة عنوان  المنشور</p>
                    </section>

                    <section id="discraption-section" className="section">
                        <h4>*وصف المنشور</h4>
                        <input onChange={discraptionChanged} className="form-control" type="text" placeholder="أدخل وصف المنشور هنا" />
                        <p id="discraption" className="text-light hide">عليك إضافة وصف  المنشور</p>
                    </section>

                    <section id="image-section" className="section">
                        <h4>*صورة المنشور</h4>
                        <input onChange={imageChanged} className="form-control" type="file" />
                        <p id="image" className="text-light hide">عليك إضافة صورة  منشور صحيحة</p>
                    </section>

                    <section id="content-section" className="section">
                        <h4>*محتوى المنشور</h4>
                        <textarea onChange={contentChanged} className="form-control" type="text" placeholder="أدخل محتوى المنشور هنا" />
                        <p id="content" className="text-light hide">عليك إضافة محتوى  المنشور</p>
                    </section>

                    <section id="link-section" className="section">
                        <h4>الرابط</h4>
                        <input onChange={linkChanged} className="form-control" type="text" placeholder="في حال تواجد صفحة أو ملف متعلق بهذا المنشور, ادخل الرابط هنا" />
                    </section>

                    <section id="linkTitle-section" className="section">
                        <h4>عنوان الرابط</h4>
                        <input onChange={linkTitleChanged} className="form-control" type="text" placeholder="أدخل عنوان رابط المنشور هنا" />
                    </section>

                    <button type="button" onClick={post} className="btn btn-success form-button">نشر</button>
                    <button type="button" onClick={cancel} className="btn btn-danger form-button">عودة</button>
                </form>
            </div>  
        );
    }
    else{
        return <NotAllowed />
    }
}

export default AddPosts;