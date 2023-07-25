import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize:5,
    totalUsersCount: 6,
    currentPage:4,// @ntacik ej@ aragin@ :
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    console.log('action.userId===433', action.userId)
    console.log('action=FFF===', action)
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state, // piti state-@ qopi anenq vor karoxananq meji objekt@ kopy anenq
                users: state.users.map(usr => {
                    console.log('usr.id==ttt===', usr.id)
                    if (usr.id === action.userId) { // es if -i imast@ ayn e vor gtnenq mer click arac element@
                        return {...usr,  // ete id ham@nknum e veradarcnum enq copy-n poxvac tesqov : es true -i
                        followed: true                     // darcnelu imastn ayn e vor gna ej@ nkarveluc stugi ete true - e
                        }                                // buttoni mej gri unfollow ete false -e follow
                    }
                    return usr // ete chi ham@nknum id nuyn bann enq veradarcnum
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(usr => {
                    if (usr.id === action.userId) {
                        console.log('usr.id=', usr.id)
                        console.log('action.userId=', action.userId)
                        return {...usr, followed: false}
                    }
                    return usr // ete chi ham@nknum id nuyn bann enq veradarcnum
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
            ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount:action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching:action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress,action.userId]
                    :state.followingInProgress.filter( (id) => {
                    return id !== action.userId
                } )
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId:userId});
export const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId:userId });

export const setUser = (users) => {
    console.log('setUserAC-i users', users)
    return {
        type: SET_USERS,
        users:users
    }
}
export const setCurrentPage = (currentPage) => ({type:SET_CURRENT_PAGE,currentPage:currentPage})
export const setUsersTotalCount = (totalUsersCount) => ({type:SET_TOTAL_USERS_COUNT, count:totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        usersAPI.getUsers(currentPage, pageSize).then((data) => {
            // debugger
            dispatch(toggleIsFetching(false))
            dispatch(setUser(data.items))
            dispatch(setUsersTotalCount(data.totalCount / 100))
        })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId).then((data) => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId));
                dispatch(toggleFollowingProgress(false, userId));
            }
        })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unFollow(userId).then((data) => {
            if (data.resultCode === 0) {
                dispatch(unFollowSuccess(userId));
                dispatch(toggleFollowingProgress(false, userId))
            }
        })
        // dispatch(unFollowSuccess(userId))
    }
}
export default usersReducer