import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assetc/images/user.jpg";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";


let Users = (props) => {
    // debugger
    console.log('props.followingInProgress---------->>>>>>>', props.followingInProgress)
    let pagesCount =Math.ceil(props.totalUsersCount / props.pageSize) // aysinqn userneri qanak@ pajanac amen eji exac userneri qanak@ kstananq pages-i chap@
    console.log('verjum nor mtav Users u nkarec @st stacvac usersContaineri popoxvac tvyalneri')
    let pages = [];
    for (let i = 1; i <= pagesCount; i ++ ){
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map((p) => {
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={(e) => {
                                 console.log('pppppppp=', p)
                                 props.onPageChanged(p)
                             }
                             }>{p}</span>
            })}
        </div>
        {
            props.users.map(usr =>
                <div key={usr.id}>
               <span>
                   <div>
                       <NavLink to={'/profile/' + usr.id}>
                       <img src={(usr.photos.small) != null ? usr.photos.small : userPhoto}
                            className={styles.userPhoto}/>
                           </NavLink>
                   </div>
                   <div>
                       {usr.followed
                           ? <button disabled={props.followingInProgress.some((id) => {
                               return id === usr.id
                           })} onClick={() => {
                               props.unfollow(usr.id)
                           }}> UnFollow </button>
                           : <button disabled={props.followingInProgress.some((id) => {
                               return id === usr.id
                           })} onClick={() => {
                               props.follow(usr.id)
                           }}> Follow </button>}
                   </div>
               </span>
                <span>
                    <span>
                      <div>
                          {usr.name}
                      </div>
                        <div>
                            {usr.status}
                        </div>
                    </span>
                    <span>
                         <div>
                             {"usr.location.country"}
                         </div>
                        <div>
                             {"usr.location.city"}
                        </div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users