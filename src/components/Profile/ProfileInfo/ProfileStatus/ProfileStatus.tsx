import React, {ChangeEvent} from "react";
import classes from "./ProfileStatus.module.css";
import Button from "../../../common/Button/Button";

type PropsType = {
    status:string
    updateUserStatus(arg:string):void
}

type StateType = {
    editMode:boolean,
    status: string
}

class ProfileStatus extends React.Component<PropsType,StateType> {

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

    onStatusChange = (e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            status: e.target.value
        })
    }

    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
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
                        <span  onClick={this.activateEditMove}>{ this.state.status }</span>
                    </div>
                }

            </div>
        )
    }

}

export default ProfileStatus;