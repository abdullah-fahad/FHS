import React, {useState} from 'react';
import axios from 'axios';
import './styles.css';
import { useParams } from 'react-router';

var getPost = async(id) => {
    var post;
    console.log(id);
    await axios.post("https://al-faisaliah-highschool.herokuapp.com/search", {_id: id}).then(response => post = response.data).catch(err => console.log(err))
    console.log(post)
    return post;
}
var showComments = (post) => {
    var rawComments = post.comments;
    var comments = [];
    if(rawComments.length === 0){
        return (<p className="post-view-content">لا يوجد تعليق حتى الآن</p>);
    }
    else{
        for(var x = rawComments.length; x > 0; x--){
            comments.push(<p className="comment">{rawComments[x - 1]}</p>)
        }
    }
    return comments
}

var showLikesNumber = async(post) => {
    var likes;
    await axios.post('/likes', {id: post._id}).then(res => likes = res.data);
    return likes;
}

var PostView = () => {
    var postId = useParams();
    console.log(postId.id)
    var [post, setPost] = useState();
    var [comments, setComments] = useState();
    var [comment, setComment] = useState();
    var [reRender, setReRender] = useState();
    console.log(reRender)
    var [likes, setLikes] = useState();
    if(!post){getPost(postId.id).then(res => setPost(res))}
    if(post && !comments){setComments(showComments(post))}
    if(!likes && post){showLikesNumber(post).then(res => setLikes(res))}
    console.log(post)

    var commentChanged = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    }

    var submit = async() => {
        await axios.post('https://al-faisaliah-highschool.herokuapp.com/add-comment', {id: post._id, comment: comment});
        if(!localStorage.getItem("comments")){
            localStorage.setItem("comments", [{postId: post._id, comment: comment}])
        }
        else{
            localStorage.setItem("comments", JSON.stringify(localStorage.getItem("comments").push({postId: post._id, commant: comment})))
        }
        setReRender(1);
    }


    if(post){
        return(
            <div>
                <br />
                <br />
                <h1 className="post-view-title">{post.title}</h1>
                <img alt="alfaisaliah-highschool"className="post-view-image mx-auto d-block" src={post.picture} />
                <span className="author">من {post.author || "مجهول"}</span>
                <p className="post-view-content">{post.content}</p>
                <hr />
                <br />
                <br />
                <form>
                    <input className="form-control" onChange={commentChanged} placeholder="اترك تعليق!" />
                    <button className="btn btn-primary" onClick={submit}>إرسال</button>
                </form>
                <br />

                <h3>التعليقات:</h3>
                {comments}
            </div>
        );
    }
    else{
        return(
            <div>
                <br />
                <br />
                <h1>لم يتم إيجاد المنشور الذي تبحث عنه !</h1>
            </div>
        )
    }
}

export default PostView;