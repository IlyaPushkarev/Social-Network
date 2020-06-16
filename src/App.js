import React from 'react';/*Библиотека из node_modules*/
import {BrowserRouter, Route, withRouter} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import NewsContainer from "./components/News/NewsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
// import {getAuthUserData} from "./redux/auth-reducer";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
// import Preloader from "./components/common/Preloader/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">

                        <Route path="/login" render={() => <LoginContainer/>}/>

                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>

                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>

                        <Route path="/users" render={() => <UsersContainer/>}/>

                        <Route path="/news" render={() => <NewsContainer/>}/>

                        <Route path="/music" component={Music}/>

                        <Route path="/settings" component={Settings}/>

                    </div>


                </div>
                </BrowserRouter>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        initialized: state.app.initialized
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
