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
        props.updateUserStatus(status);
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
                        />
                        <Button text={"ADD status"}/>
                    </div>
                    : <div className={[classes["statusPanel__display"],classes["unselectable"]].join(" ")}>
                        <span onClick={()=>activeEditMode()}>{props.status}</span>
                    </div>
                }

            </div>
        )
}

export default ProfileStatusWithHooks;