// import React, {useDebugValue} from "react";
// import axios from "axios";
// import Users from "./Users";
//
// class UsersAPIComponent extends React.Component {
//     componentDidMount(){
//         // console.log('componentDidMount=XXX===', )
//        // alert('sarqvum e nor object') // aysinqn erb vor ej@ tarmacnum enq kam gnum enq orinak profile page kam Messages -i mej alert@ ashxatum e isk erb sexmum enq follow kam unfollow et vaxt el pererisovka chi gnum arajva pes rerender chi linum
//         // stex props inchpes functiayi depqum avtomat galis e UsersContaineri migic inch uxarkum enq et el galisa
//
//                                                                        // api -i migi page         ev api-i migi count@
//           // aysinqn menq zapros aneluc asecinq qo page = mer propsic ekac currentPage -in isk count@ = props.pageSize-in
//         axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
//             .then((response) => {
//                  // debugger
//                  console.log('items =====333=', response.data.items)
//                 this.props.setUsers(response.data.items)
//             })
//     }
//     onPageChanged = (pageNumber) => {
//         this.props.setCurrentPage(pageNumber)                       // stex ushadir menq get parametr page-in talis enq pageNumber@
//         axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
//             .then((response) => {
//                 this.props.setUsers(response.data.items)
//                 // debugger
//                 console.log('response.data.totalCount=', response.data.totalCount)
//                 this.props.setTotalUsersCount(response.data.totalCount / 100)
//             })
//     }
//     render() {   // render -@ asum e tur indz jsx heto es kmtacem inch anem dra hamar ashxatum e skzbic render@ heto componentDidMount -i mej zapros e linum vercvum e respons@ talis e props.setUsers-in u heto galis e nkarum
//         return <Users totalUsersCount = {this.props.totalUsersCount}
//                       pageSize = {this.props.pageSize}
//                       currentPage = {this.props.currentPage}
//                       onPageChanged = {this.onPageChanged}
//                       users = {this.props.users}
//                       follow = {this.props.follow}
//                       unfollow = {this.props.unfollow}
//         />
//
//     }
// }
//
// export default UsersAPIComponent