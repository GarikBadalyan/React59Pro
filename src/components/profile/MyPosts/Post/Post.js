import s from "./Post.module.css";


const Post = (props) => {
    //console.log(props) sa obyekt e
    console.log("Post.js-n e ashxatel")
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFUGYnfwWubPdcPbkc35TSaHA5qQarlYhew&usqp=CAU"
                alt=""/>
            {props.messages}
            {props.anun} , {props.azganun}
            <div>
                <span>Like</span>{props.likeCount}
                <span>{props.age}</span>
            </div>
        </div>
    )
}

export default Post