import Header from "./header";
import React from "react";
import {getAuthUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        // console.log('4-4-4-4-4-44-4-4-4-44-4-4props', this.props)
        return < Header {...this.props} />
    }
}
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUserData}) (HeaderContainer)