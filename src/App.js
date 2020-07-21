import React from 'react';/*Библиотека из node_modules*/
import {BrowserRouter, Route,  withRouter} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";

import NewsContainer from "./components/News/NewsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
// import {getAuthUserData} from "./redux/auth-reducer";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./components/HOC/withSuspense/withSuspense";


// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(()=>import("./components/Profile/ProfileContainer"))

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(()=> import("./components/Dialogs/DialogsContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route path="/login" render={() => <LoginContainer/>}/>

                        <Route path="/dialogs" render={withSuspense(DialogsContainer) }/>

                        <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>

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
