import React from "react";
import {connect} from "react-redux";

import {
    follow, getUsers,
    setCurrentPage,
    toggleFollowingProgress, unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
// import preloader from './../../assetc/images/preloader.gif'
import Preloader from "../common/preloader/preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }
    render() {   // render -@ asum e tur indz jsx heto es kmtacem inch anem dra hamar ashxatum e skzbic render@ heto componentDidMount -i mej zapros e linum vercvum e respons@ talis e props.setUsers-in u heto galis e nkarum
        return <>
            {this.props.isFetching ?
            <Preloader />
                :null}
        <Users totalUsersCount = {this.props.totalUsersCount}
                      pageSize = {this.props.pageSize}
                      currentPage = {this.props.currentPage}
                      onPageChanged = {this.onPageChanged}
                      users = {this.props.users}
                      follow = {this.props.follow}
                      unfollow = {this.props.unfollow}
                      followingInProgress = {this.props.followingInProgress}
        />
        </>

    }
}

let mapStateToProps = (state) => {  // mapStateToProps @ndunum e state-@ amboxjutyamb
    console.log('state=1AAA==', state)
    return {
        users: state.usersPage.users, // aysinqn mapStateToProps functian Users komponentin talis e users(key@)
        pageSize:state.usersPage.pageSize,                           // vori mej ka state.usersPage.users ner-@ : aysinqn inch@ petq e et
        totalUsersCount:state.usersPage.totalUsersCount,                           // vori mej ka state.usersPage.users ner-@ : aysinqn inch@ petq e et
        currentPage:state.usersPage.currentPage,                                                  // enq vercnum
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow: follow,
        unfollow:unfollow,
        setCurrentPage: setCurrentPage,
        toggleFollowingProgress:toggleFollowingProgress,
        getUsers:getUsers
    })
)(UsersContainer)


