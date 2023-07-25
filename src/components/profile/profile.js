import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostContainer";
import {updateStatus} from "../../redux/profile-reducer";


const Profile = (props) => {
    // debugger
    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile