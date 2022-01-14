import  React, { useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import NotAllowed from './notAllowed';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css';

var getPost = async(id) => {
    var post;
    console.log(id);
    await axios.post("https://al-faisaliah-highschool.herokuapp.com/search", {_id: id}).then(response => post = response.data).catch(err => console.log(err))
    console.log(post)
    return post;
}

var EditPost = () => {
    var history = useHistory();
    var postId = useParams();
    var [post, setPost] = useState();

    var [postInfo, setPostInfo] = useState();

    if(!post && !postInfo){getPost(postId.id).then(res => {
        setPost(res);
        setPostInfo(res)
        console.log(postInfo)
    })
}

    var titleChanged = (e) => {
        e.preventDefault();
        setPostInfo({
            title: e.target.value, 
            discraption: postInfo.discraption, 
            picture: postInfo.picture, 
            content: postInfo.content, 
            link: postInfo.link, 
            linkTitle: postInfo.linkTitle})
    }

    var discraptionChanged = (e) => {
        e.preventDefault();
        setPostInfo({
            title: postInfo.title, 
            discraption: e.target.value, 
            picture: postInfo.picture, 
            content: postInfo.content, 
            link: postInfo.link, 
            linkTitle: postInfo.linkTitle})
    }
    var pictureChanged = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let inFile = e.target.files[0];
        reader.onloadend = () => {
            console.log(1 + reader.result)
            setPostInfo({
                title: postInfo.title, 
                discraption: postInfo.discraption, 
                picture: reader.result, 
                content: postInfo.content, 
                link: postInfo.link, 
                linkTitle: postInfo.linkTitle})
    }
    reader.readAsDataURL(inFile);
    }
    var contentChanged = (e) => {
        e.preventDefault();
        setPostInfo({
            title: postInfo.title, 
            discraption: postInfo.discraption, 
            picture: postInfo.picture, 
            content: e.target.value, 
            link: postInfo.link,
            linkTitle: postInfo.linkTitle})
    }
    var linkChanged = (e) => {
        e.preventDefault();
        setPostInfo({
            title: postInfo.title, 
            discraption: postInfo.discraption,
            picture: postInfo.picture, 
            content: postInfo.content, 
            link: e.target.value, 
            linkTitle: postInfo.linkTitle})
    }
    var linkTitleChanged = (e) => {
        e.preventDefault();
        setPostInfo({
            title: postInfo.title, 
            discraption: postInfo.discraption, 
            picture: postInfo.picture, 
            content: postInfo.content, 
            link: postInfo.link, 
            linkTitle: e.target.value})
    }
    var cancel = () => {
        history.push('/manager');
    }
    if(localStorage.getItem('userInfo') && sessionStorage.getItem('loggedIn')){
        var submit = async() => {
            await axios.post('https://al-faisaliah-highschool.herokuapp.com/edit-news', {title: postInfo.title, discraption: postInfo.discraption, content: postInfo.content, picture: postInfo.picture, link: postInfo.link, linkTitle: postInfo.linkTitle, _id: postId, author: JSON.parse(localStorage.getItem("userInfo")).name})
                .then(res => {
                    history.push('/manager')
                    toast.success('تم تعديل المنشور', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }).catch(err => {
                    console.log(err);
                    toast.error('حدث خطأ في الخادم, نرجو المحاولة لاحقًا', {
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
        if(post && postInfo){
            return(
                <div className="addPost">
                    <br />
                    <br />
                    <form>
                        <section className="section">
                            <h4>
                                العنوان
                            </h4>
                            <input onChange={titleChanged} type="text" value={postInfo.title} className="form-control" />
                        </section>
                        <section className="section">
                            <h4>
                                الوصف
                            </h4>
                            <input onChange={discraptionChanged} type="text" value={postInfo.discraption} className="form-control" />
                        </section>
                        <section className="section">
                            <h4>
                                الصورة
                            </h4>
                            <input type="file" onChange={pictureChanged}  filenamw={postInfo.picture} className="form-control" />
                            <img alt="alfaisaliah-highschool" src={postInfo.picture} />
                        </section>
                        <section className="section">
                            <h4>
                                المحتوى
                            </h4>
                            <textarea type="text" onChange={contentChanged}  value={postInfo.content} className="form-control" />
                        </section>
                        <section className="section">
                            <h4>
                                الرابط
                            </h4>
                            <input type="text" onChange={linkChanged} value={postInfo.link || ""} className="form-control" />
                        </section>
                        <section className="section">
                            <h4>
                                عنوان الرابط
                            </h4>
                            <input type="text" onChange={linkTitleChanged} value={postInfo.linkTitle || ""} className="form-control" />
                        </section>
                    </form>
                    <br />
                    <div className="">
                        <button onClick={submit} className="btn btn-success form-button">حفظ</button>
                        <button onClick={cancel} className="btn btn-danger form-button">إلغاء</button>
                    </div>
                </div>
            )
        }
        else{
            return <h1>لم يتم إيجاد المنشور الذي تبحث عنه</h1>
        }
    }
    else{
        return(
            <NotAllowed />
        )
    }
}

export default EditPost;