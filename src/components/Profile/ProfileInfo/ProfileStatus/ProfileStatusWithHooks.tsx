import React, {useEffect, useState} from "react";
import classes from "./ProfileStatus.module.css";
import Button from "../../../common/Button/Button";

type PropsType = {
    statusText: string

    updateStatus:(status:string)=>void
}
const ProfileStatusWithHooks: React.FC<PropsType>  = (props)=> {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.statusText);

    useEffect(()=>{
       setStatus( props.statusText)
    },[props.statusText])

    const activeEditMode = ()=>{
        setEditMode(true);
    }

    const deactivateEditMode = ()=>{
        setEditMode(false);
        if(status !== props.statusText){
            props.updateStatus(status);
        }
    }

    const  onStatusChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            setStatus(e.target.value)
    }
        return (
            <div className={classes.statusPanel}>
                {editMode
                    ? <div className={classes.statusPanel__editor}>
                        <input type="text"
                               autoFocus={true}
                               value={status?status:""}
                               onBlur={()=>deactivateEditMode()}
                               onChange={onStatusChange}
                               // maxLength= '300'
                        />
                        <Button text={"ADD status"}/>
                    </div>
                    : <div className={[classes["statusPanel__display"],classes["unselectable"]].join(" ")}>
                        <span onClick={()=>activeEditMode()}>{props.statusText ? props.statusText : "Write status"}</span>
                    </div>
                }

            </div>
        )
}

export default ProfileStatusWithHooks;