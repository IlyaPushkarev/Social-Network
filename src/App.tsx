import React from 'react';/*Библиотека из node_modules*/
import {BrowserRouter, Route,  withRouter} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import NewsContainer from "./components/News/NewsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./components/HOC/witSuspense/withSuspense";
import {rootStateType} from "./redux/redux-store";

// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(()=>import("./components/Profile/ProfileContainer"))
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(()=> import("./components/Dialogs/DialogsContainer"));

const SuspenseDialogsContainer = withSuspense(DialogsContainer)
const SuspenseProfileContainer = withSuspense(ProfileContainer)
type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp:()=>void
}
class App extends React.Component<MapPropsType&MapDispatchPropsType> {
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

                        <Route path="/dialogs" render={()=><SuspenseDialogsContainer/> }/>

                        <Route path="/profile/:userId?" render={()=><SuspenseProfileContainer/>}/>

                        <Route path="/users" render={() => <UsersContainer />}/>

                        <Route path="/news" render={() => <NewsContainer/>}/>

                        <Route path="/music" component={Music}/>

                        <Route path="/settings" component={Settings}/>

                    </div>
                </div>
                </BrowserRouter>
        );
    }
}
const mapStateToProps = (state:rootStateType)=>{
    return{
        initialized: state.app.initialized
    }
}
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
