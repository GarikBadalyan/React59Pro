import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    console.log('action.userId===4333333333333333333', action.id)
    console.log('action=FFF===', action)
    console.log('action.data', action.data)
    switch (action.type) {
        case SET_USER_DATA: {
            // debugger
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state;
    }
}


export const setAuthUseData = (userId, email, login) => {
    console.log('loginnnnnnnnnnnnnnnnnnn', login,email, userId)
  return   {
      type: SET_USER_DATA,
      data: {userId, email, login}
    }

}

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me().then((response) => {
            if (response.data.resultCode === 0) {
                // ete menq login exac enq set enq anum id email ev login
                console.log('AAAAAAAAAAresponse.data.data', response.data.data)
                let {id, login, email} = response.data.data
                dispatch(setAuthUseData(id, email, login))
            }
        })
    }
}
export default authReducer