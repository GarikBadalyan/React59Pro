import s from './../dialog.module.css'
import {NavLink} from "react-router-dom"

const Dialogitem = (props) => {
    return (

        <div className={s.dialog} >
            <NavLink to ={"/dialogs/" + props.id} activeClassName={s.activeLink}>{props.name}</NavLink>
        </div>
    )
}
export default Dialogitem




