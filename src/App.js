
import './App.css';

import Navbar from "./components/navbar/navbar";

import News from "./components/news/news";
import {Route} from "react-router-dom";

import DialogsContainer from "./components/Dialogs/dialogsContainer";

import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/headerContainer";
import Login from "./components/login/login";
import { CssBaseline } from '@mui/material';
const App = (props) => {
    // console.log(props)
    // console.log({props.state.profilePage.dialogsData})
    return (
        <>

            <div className='app-wrapper'>
                <CssBaseline />
                <HeaderContainer />
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer />}/>
                    <Route path='/login' render={() => <Login />}/>
                    <Route path='/news' component={News}/>
                    {/*<News />*/}
                </div>
            </div>
        </>
    )
}
export default App

