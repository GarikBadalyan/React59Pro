import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                {id: "1", messages: "How tu you111'", likeCount: "000"},
                {id: "2", messages: "what is your name222", likeCount: "10"},
                {id: "3", messages: "Inche qo anun@", likeCount: "20"},
                {id: "4", messages: "AAAAAAAAAAAAAA", likeCount: "30"},
                {id: "5", name: "like5555 ", age: "AAA34"},
                {id: "6", anun: "Garik", azganun: "Badalyan"},
            ],
            newPostText: "it-kamasutre.com111",
        },
        dialogsPage: {
            messages: [
                {id: "1", message: "hiiii"},
                {id: "2", message: "How are you"},
                {id: "3", message: "What is your name"},
                {id: "4", message: "AAAAAAAABBBBB"},
            ],
            dialogsData: [
                {name: "Narek333666", id: "111",},
                {name: "Mari", id: "222"},
                {name: "Karen", id: "333"},
                {name: "Anahit", id: "444"},
                {name: "Armen", id: "555"},
            ],
            newMessagesBody : ""
        },
        sidebar:{}
    },
    _callSubscriber ()  {
        console.log("eee")
    },

    getState() {
        return this._state;
    },
     subscribe (observer)  {
        this._callSubscriber = observer
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage,action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action)
        this._state.sidebar = sidebarReducer(this._state.sidebar,action)

        this._callSubscriber(this._state)
    }


}

// window.state = state;

export default store;