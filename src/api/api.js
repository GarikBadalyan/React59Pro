import axios from "axios";

const baseUrl = 'https://social-network.samuraijs.com/api/1.0/';

const instance = axios.create({
    withCredentials: true,
    // baseURL: 'https://social-network.samuraijs.com/api/1.0/', ete sa ogtagorcenq verevi baseUrl-@ karanq chogtagorcenq  ev inchpes withCredentials-@ baseURL -@ nuynpes arden mej@ kliner
    headers: {
        "API-KEY": "0664a199-258b-408e-a89a-8743e8701c03"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1,pageSize = 1 )  {
        return instance.get(baseUrl + `users?page=${currentPage}&count=${pageSize}`, {

        }).then(response => {
            return response.data
        })
    },
    follow(userId) {
        return instance.post(baseUrl +`follow/${userId}`, {}, {
        }).then(response => {
            return response.data
        })
    },

    unFollow(userId) {
        return instance.delete(baseUrl + `follow/${userId}`, {
        }).then(response => {
            return response.data
        })
    },

    getProfile(userId) {
        console.warn('please profileAPI')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(baseUrl + `profile/` + userId)
    },

    getStatus(userId) {
        return instance.get(baseUrl + `profile/status/` + userId)
    },

    updateStatus(status) {
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', status)
        return instance.put(baseUrl + `profile/status/`, {status})
    }
}

export const authAPI = {
    me() {
        return instance.get (baseUrl + `/auth/me`, {
            // withCredentials: true
        })
    }
}

