import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//             (store) => {
//                 let state = store.getState();
//
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 }
//
//                 let onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text)
//                     store.dispatch(action)
//                 }
//                 return <MyPosts
//                     updateNewPostText={onPostChange}
//                     addPost={addPost}
//                     postData={state.profilePage.postData}
//                     newPostText={state.profilePage.newPostText}/>
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }
console.log('MyPostsContainer -n e ashxatum')

let mapStateToProps = (state) => {
    console.log('state444===', state)
 return {
     postData:state.profilePage.postData,
     newPostText:state.profilePage.newPostText
 }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text)=> {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPostActionCreator())
            // console.log('  dispatch(addPostActionCreator())=',  dispatch(addPostActionCreator()))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

// connecti mej ka nayev subscribe functian , aysinqn inq@ uni ira mej sepakan subscribe-n

export default MyPostsContainer

