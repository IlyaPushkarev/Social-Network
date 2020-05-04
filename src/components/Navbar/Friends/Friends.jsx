import React from "react";
import classes from "./Friends.module.css";


const Friends = (props)=>{

    let iconsElem = props.friends.map((frndObj)=>(<img src={frndObj.url} alt="" key={frndObj.id}/>) );

    return (
        <div className={classes.friends}>
            <div className={classes.friends__header}>
                <h1>Friends</h1>
            </div>
            <div className={classes.friends__body}>
                <div className={classes.friends__icons}>
                    {iconsElem}
                </div>
                <div className={classes.friends__amount}>
                    <span>{iconsElem.length}: friends</span>
                </div>
            </div>
        </div>
    )
}

export default Friends;