import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";


const ProfileStatusWithHook = (props) => {
    // lokal state
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    // const name1 = useSelector( state => state )
    // console.log('name11111111111111', name1)
    useEffect( () =>{
        setStatus(props.status)
    }, [props.status] )

   const activateEditMode = () => {
       setEditMode(true)
   }
   const deActivateEditMode = () => {
       setEditMode(false);
       props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={activateEditMode} >{props.status || "+++++++++"} </span>
            </div>
            }
            { editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHook