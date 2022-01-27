import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Album from './album';
var selectedPost;
var getPosts = async() => {
    var posts;
    await axios.get("https://al-faisaliah-highschool.herokuapp.com/get-news").then(response => posts = response.data).catch(err => console.log(err))
    return posts;

}

var ShowPosts = () => {
    var history = useHistory(); 
    var [posts, setPosts] = useState();
    var prettyPosts = []
    if(!posts){
        getPosts().then(res => setPosts(res))
        prettyPosts.push(
            <div className='box-center'>
                <br/>
                <br/>
                <h4>جارٍ تحميل المنشورات</h4>
                <div class="spinner-border" role="status">
                    <span class="sr-only">تحميل...</span>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
    
    if(posts){
        prettyPosts = []
        for(var x = posts.length; x > 0; x--){
            console.log(x)
            prettyPosts.push(
                <div className="post">
                    <img alt="alfaisaliah-highschool" className="post-img" src={posts[x-1].picture} /> 
                    <h3 className="post-thumb-title">{posts[x-1].title}</h3>
                    <span className="author1">من {posts[x-1].author || "مجهول"}</span>
                    <p className="post-thumb-text">{posts[x-1].discraption}</p>
                    <button name={x-1} className="btn btn-success post-btn" onClick={(e) => {
                        history.push(`/home/${posts[e.target.name]._id}`);
                        }}>اقرأ الخبر</button>
                </div>
            )
        }
    }
    console.log(prettyPosts)
    return prettyPosts;
}

var Posts = () => {
    return(
        <>
        <div id="main">
            <br />
            <br />
            <div className="welcome">
                <h3>مرحبًا بك في الموقع الرسمي لثانوية الفيصلية<img alt="alfaisaliah-highschool" src="https://img.icons8.com/material-outlined/30/2C9EA4/sparkling.png"/></h3>
            </div>
            <br />
            <h4>ألبوم المدرسة</h4>
                <Album />
            <br />
            <h4>المنشورات</h4>
            <div>
                <ShowPosts />
            </div>
        </div>
        <div id="postView" className="hide">
            <h1>{selectedPost? selectedPost.title:""}</h1>
            <img alt="alfaisaliah-highschool"src={selectedPost? selectedPost.picture:""} />
            <p>{selectedPost? selectedPost.content:""}</p>
        </div>
        </>
    );
}

export default Posts;