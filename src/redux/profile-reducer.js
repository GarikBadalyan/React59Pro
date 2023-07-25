import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postData: [
        {id: "1", messages: "How tu you111'", likeCount: "000"},
        {id: "2", messages: "what is your name222", likeCount: "10"},
        {id: "3", messages: "Inche qo anun@", likeCount: "20"},
        {id: "4", messages: "AAAAAAAAAAAAAA34", likeCount: "30"},
        {id: "5", name: "like5555 ", age: "AAA34"},
        {id: "6", anun: "Garik12", azganun: "Badalyan"},
    ],
    newPostText: "it-kamasutre.com",
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
     console.log('111kanchvum e profileReducer@ ')
    switch (action.type) {
        case ADD_POST: {
            console.log('swich1 swich1  swich1')
            let newPost = {
                id: "10",
                messages: state.newPostText,
                likeCount: "0"
            }
            return  {
                ...state,
                postData: [...state.postData, newPost], // stex menq storaketic heto masivi mej avelacnum enq element
                newPostText: ''
            }

        }
        case SET_USER_PROFILE: {
           return {
                ...state,
                profile: action.profile
            }
        }
        case UPDATE_NEW_POST_TEXT: {
           return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}) // sa karch dzevn e aranc returni veradarcnum e uxxaki type-@ ADD_POST
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId).then((response) => {
            dispatch(setUserProfile(response.data));
        })
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then((response) => {
            dispatch(setStatus(response.data));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
    }
}

export default profileReducer