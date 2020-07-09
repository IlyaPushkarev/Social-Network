import React, {useEffect, useState} from "react";
import classes from "./ProfileStatus.module.css";
import Button from "../../../common/Button/Button";

const ProfileStatusWithHooks  = (props)=> {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
       setStatus( props.status)
    },[props.status])

    const activeEditMode = ()=>{
        setEditMode(true);
    }

    const deactivateEditMode = ()=>{
        setEditMode(false);
        if(status !== props.status){
            props.updateUserStatus(status);
        }
    }

    const  onStatusChange = (e)=>{
            setStatus(e.target.value)
    }
        return (
            <div className={classes.statusPanel}>
                {editMode
                    ? <div className={classes.statusPanel__editor}>
                        <input type="text"
                               autoFocus={true}
                               value={status}
                               onBlur={()=>deactivateEditMode()}
                               onChange={onStatusChange}
                               maxLength="300"
                        />
                        <Button text={"ADD status"}/>
                    </div>
                    : <div className={[classes["statusPanel__display"],classes["unselectable"]].join(" ")}>
                        <span onClick={()=>activeEditMode()}>{props.status ? props.status : "Write status"}</span>
                    </div>
                }

            </div>
        )
}

export default ProfileStatusWithHooks;