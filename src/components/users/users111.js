// import React, {useDebugValue} from "react";
// import styles from "./users.module.css";
// import axios from "axios";
// import userPhoto from '../../assetc/images/user.jpg'
//
// const Users = (props) => {
//     // debugger
//     console.log('popsPPPPPPPP===11==', props)
//     // console.log(props.users)
//     let getUsers = () => {
// if(props.users.length === 0) {
//     axios.get('https://social-network.samuraijs.com/api/1.0/users')
//         .then((response) => {
//             // debugger
//             console.log('items =====333=', response.data.items)
//             props.setUsers(response.data.items)
//         })
// }
//
//     // props.setUsers([
//     //     {
//     //         id: 1,
//     //         photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dmitry_Nagiev_2017_3.jpg/220px-Dmitry_Nagiev_2017_3.jpg',
//     //         followed: false,
//     //         fullName: "Garik B",
//     //         status: "I am a boss",
//     //         location: {city: "Erevan", country: "Armenia"}
//     //     },
//     //     {
//     //         id: 2,
//     //         photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dmitry_Nagiev_2017_3.jpg/220px-Dmitry_Nagiev_2017_3.jpg',
//     //         followed: true,
//     //         fullName: "Narek A",
//     //         status: "AAAAAAAAA",
//     //         location: {city: "Moscow", country: "Russia"}
//     //     },
//     //     {
//     //         id: 3,
//     //         photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dmitry_Nagiev_2017_3.jpg/220px-Dmitry_Nagiev_2017_3.jpg',
//     //         followed: false,
//     //         fullName: "Alberta A",
//     //         status: "BBBBBBBBB",
//     //         location: {city: "Berlin", country: "Germany"}
//     //     },
//     // ])
// }
//     return <div>
//         <button onClick={getUsers}> Get Users </button>
//         {
//             props.users.map(usr => <div key={usr.id}>
//                <span>
//                    <div>
//                        <img src={(usr.photos.small) != null ? usr.photos.small : userPhoto} className={styles.userPhoto} />
//                    </div>
//                    <div>
//                        {usr.followed
//                            ? <button onClick={() => {props.unfollow(usr.id)}}> UnFollow </button>
//                            : <button onClick={() => {
//                                props.follow(usr.id)
//                            }}> Follow </button>}
//                    </div>
//                </span>
//                 <span>
//                     <span>
//                       <div>
//                           {usr.name}
//                       </div>
//                         <div>
//                             {usr.status}
//                         </div>
//                     </span>
//                     <span>
//                          <div>
//                              {"usr.location.country"}
//                          </div>
//                         <div>
//                              {"usr.location.city"}
//                         </div>
//                     </span>
//                 </span>
//             </div>)
//         }
//     </div>
//
// }
//
// export default Users