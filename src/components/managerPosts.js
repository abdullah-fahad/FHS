import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import './styles.css';
import { toast } from 'react-toastify';

var getPosts = async() => {
    var posts;
    await axios.get("/get-news").then(response => posts = response.data).catch(err => console.log(err))
    return posts;

}



var ShowPosts = () => {
    var history = useHistory(); 
    var [posts, setPosts] = useState();
    if(!posts){getPosts().then(res => setPosts(res))}
    var prettyPosts = []

    var remove = async e => {
        e.preventDefault();
        await axios.post('https://al-faisaliah-highschool.herokuapp.com/remove-news', {_id: posts[e.target.name]._id}).then(res => {
            window.location.reload();
            toast.success('تم حذف المنشور', {
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

    if((posts && posts.length === 0) || !posts){
        return (
            <div className="not-found">
                <h1>لا يوجد أي منشور حتى الآن</h1>
            </div>
        )
    }

    else if(posts){

        for(var x = posts.length; x > 0; x--){
            console.log(x)
            prettyPosts.push(
                <div className="post">
                    <img alt="alfaisaliah-highschool" className="post-img" src={posts[x-1].picture} /> 
                    <h3 className="post-thumb-title">{posts[x-1].title}</h3>
                    <span className="author1">من {posts[x-1].author || "مجهول"}</span>
                    <p className="post-thumb-text">{posts[x-1].discraption}</p>
                    <div class="btn-group">
                        <button name={x-1} type="button" class="btn btn-primary" onClick={e => history.push(`/manager/edit-post/${posts[e.target.name]._id}`)}>تعديل <img alt="" src="https://img.icons8.com/ios-glyphs/15/ffffff/edit--v1.png"/></button>
                        <button name={x-1} type="button" onClick={e => history.push(`/comments/${posts[e.target.name]._id}`)} class="btn btn-secondary">التعليقات<img alt="" src="https://img.icons8.com/material-rounded/15/ffffff/comments--v1.png"/></button>
                        <button name={x-1} type="button" onClick={remove} class="btn btn-danger">حذف<img alt="" src="https://img.icons8.com/small/16/ffffff/filled-trash.png"/></button>
                    </div>
                    <br />
                    <br />
                    <button name={x-1} className="btn btn-success post-btn" onClick={(e) => {
                        history.push(`/home/${posts[e.target.name]._id}`);
                        }}>انتقل إلى الخبر</button>
                </div>
            )
        }
        return prettyPosts;
    }
}

var ManagerPosts = () => {
    var history = useHistory();
    var addPost = () => {
        history.push('/manager/add-post')
    }
    return(
        <div>
            <h1>المنشورات</h1>
            <p>حيث يمكنك الإشراف على المنشورات, تعديلها أو حذفها أو إضافة منشور جديد</p>
            <button onClick={addPost} className="btn btn-success">إضافة منشور <img alt="alfaisaliah-highschool"src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/></button>
            <br />
            <ShowPosts />
        </div>
    );
}

export default ManagerPosts;