import React from "react";
import classes from "./ProfileStatus.module.css";
import Button from "../../../common/Button/Button";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,/*режим редактирования*/
        status: this.props.status
    }

    activateEditMove = ()=>{

        this.setState({

            editMode: true
        })
    }

    deactivateEditMove = ()=>{
        this.setState({
            editMode: false
        })

        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e)=>{
        this.setState({
            status: e.currentTarget.value

        })
    }

    componentDidUpdate(prevProps, prevState) {
        // debugger;
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }

    }

    render() {
        return (
            <div className={classes.statusPanel}>
                {this.state.editMode
                    ? <div className={classes.statusPanel__editor}>
                        <input type="text"
                               autoFocus={true}
                               value={this.state.status}
                               onBlur={this.deactivateEditMove}
                               onChange={this.onStatusChange}/>
                        <Button text={"ADD status"}/>
                    </div>
                    : <div className={[classes["statusPanel__display"],classes["unselectable"]].join(" ")}>
                        <span  onClick={this.activateEditMove}>{ this.props.status }</span>
                    </div>
                }

            </div>
        )
    }

}

export default ProfileStatus;