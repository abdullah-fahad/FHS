import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotAllowed from './notAllowed';

var getPost = async(id) => {
    var post;
    console.log(id);
    await axios.post("https://al-faisaliah-highschool.herokuapp.com/search", {_id: id}).then(response => post = response.data).catch(err => console.log(err))
    console.log(post)
    return post;
}

var removeComment = async(id, index) => {
    await axios.post('https://al-faisaliah-highschool.herokuapp.com/remove-comment', {id, index})
    window.location.reload()
}

var showComments = (post) => {
    var rawComments = post.comments;
    var comments = [];
    if(rawComments.length === 0){
        return (<p className="post-view-content">لا يوجد تعليق حتى الآن</p>);
    }
    else{
        for(var x = rawComments.length; x > 0; x--){
            comments.push(<div className="comment">
                <p>{rawComments[x - 1]}</p>
                <button name={x-1} onClick={e => removeComment(post._id, 1)} className="btn btn-outline-danger btn-sm">حذف التعليق</button>
            </div>)
        }
    }
    return comments
}

var Comments = () => {
    var postId = useParams();
    var [post, setPost] = useState();
    var [title, setTitle] = useState();
    var [comments, setComments] = useState();
    if(!post){getPost(postId.id).then(res => setPost(res))}
    if(post && !comments && !title){setComments(showComments(post)); setTitle(post.title)}
    if(localStorage.getItem('userInfo') && sessionStorage.getItem('loggedIn')){
        return(
            <div>
                <br />
                <br />
                <h3>التعليقات على المنشور <a href={`/home/${postId.id}`}>{title}</a></h3>
                {comments}
            </div>
        );
    }
    else{
        return(
            <NotAllowed />
        )
    }
}

export default Comments;