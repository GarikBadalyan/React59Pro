import React from "react";
import {sendMessageCreator, updateNewMessageBodyActionCreator,} from "../../redux/dialogs-reducer";
import Dialogs from "./dialog";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage:state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {
           dispatch(updateNewMessageBodyActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs) // vercra Dialogs-@ tur withAuthRedirect(Dialogs) functiayin vori veradarcracn el tur  connect-in





