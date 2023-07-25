import React from "react";
import s from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
    console.log('RENDERRRRRRRRRRRRRRRRRRRR++++++++++++++')
    let postElement = props.postData.map((elem) => {
        return <Post messages={elem.messages} key = {elem.id} likeCount={elem.likeCount}/>
    })

    let newPostElement = React.createRef()

    let onAddPost = () => {
        // console.log('skzbic onAddPost')
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        console.log("onPostChange-i meji text", text)
        props.updateNewPostText(text)
    }

    return (
        <div className={s.postBlock}>
            <h2> MyPosts </h2>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    )
}

export default MyPosts