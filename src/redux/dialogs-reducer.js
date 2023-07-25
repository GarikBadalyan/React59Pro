const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
  console.log("222kanchvum e dialogsReducer@")
   // stateCopy.messages = [...state.messages] vorpisi es tox@ chgrenq miangamic verev@ mtcrel enq stateCopy objecti mej
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
    return  {
        ...state,
        newMessagesBody:action.body
      };
    case SEND_MESSAGE:
      let body = state.newMessagesBody;
      return  {
        ...state,
        newMessagesBody: '',
        messages: [ ...state.messages, {id: 7, message: body} ]
      };
      // stateCopy.messages.push({id: "6", message: body}) vorpisi el push@ chogtagorcenq miangamic grum enq
        //   message: [ ...state.messages, {id: "6", message: body} ]
    default:
      return state;
  }


}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text
  }
}

export default dialogsReducer