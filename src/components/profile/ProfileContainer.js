import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        // debugger
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 26784
        }
       this.props.getUserProfile(userId);
       this.props.getStatus(userId);
    }

    render() {
        // debugger

        return (
            <div>
                < Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);