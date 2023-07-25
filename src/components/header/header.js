import s from './header.module.css';
import {NavLink} from "react-router-dom";
import React from "react";

const Header = (props) => {
    // debugger
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LDHZ4mvg3wbeNtVZ1DtNBjTOh6klXQ5bVw&usqp=CAU"
                alt=""/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header