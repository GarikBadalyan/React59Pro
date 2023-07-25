// // import s from './news.module.css'
// import React, { useRef, useEffect } from 'react';
// import TextField from '@material-ui/core/TextField';
// import {Grid} from "@material-ui/core";
// let namesData = 'AAAAAA'
// console.log('namesData.length-9-9-9-9-9-9-9-9', namesData.length)
// const News = () => {
//     const textFieldRef = useRef(null);
//
//     // useEffect(() => {
//     //     textFieldRef.current.focus();
//     //     textFieldRef.current.setSelectionRange(namesData.length, namesData.length);
//     // }, []);
//
//     let value = ''
//     return (
//         <Grid>
//             <TextField
//                 label="Write something here"
//                 multiline
//                 value={namesData}
//                 variant="outlined"
//                 inputRef={textFieldRef}
//                 style={{ height: 40 }}
//                 // onChange={ (evt) => {
//                 //     value = evt.target.value;
//                 // }}
//             />
//         </Grid>
//     )
// }
//
// export default News


// import React, { useState } from 'react';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { Grid, Paper } from '@mui/material';
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));
//
// const ColorPaper = withStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText,
//     },
// }))(Paper);
//
// const News = () => {
//     const classes = useStyles();
//     const [selected, setSelected] = useState(-1);
//
//     const handleClick = (index) => {
//         setSelected(index);
//     };
//
//     return (
//         <div className={classes.root}>
//             <Grid container spacing={3}>
//                 {Array.from({ length: 10 }, (_, i) => (
//                     <Grid item xs={3} key={i}>
//                         <ColorPaper
//                             className={classes.paper}
//                             onClick={() => handleClick(i)}
//                             style={{
//                                 backgroundColor: i === selected ? '#ff6f00' : 'primary.main',
//                                 color: i === selected ? '#ffffff' : 'primary.contrastText',
//                             }}
//                         >
//                             {i}
//                         </ColorPaper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };
//
// export default News;


// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '40px',
//         height: '40px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         cursor: 'pointer',
//         backgroundColor:'yellow',
//     },
//     selected: {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText
//     }
// }));
//
// const News = () => {
//     const [selected, setSelected] = useState(null);
//     const classes = useStyles();
//
//     const handleClick = (index) => {
//         setSelected(index);
//     };
//
//     return (
//         <Grid container>
//             {[...Array(4)].map((item, index) => (
//                 <Grid key={index} item>
//                     <Grid
//                         className={`${classes.root} ${selected === index ? classes.selected : ''}`}
//                         onClick={() => handleClick(index)}
//                     >
//                         {index}
//                     </Grid>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };
//
// export default News;


// import { createTheme } from '@mui/material/styles';
//
// const theme = createTheme();
//
// const colorList = [
//     theme.palette.primary.main,
//     theme.palette.secondary.main,
//     theme.palette.error.main,
//     // Add more colors as needed
// ];
//
// function News() {
//     return (
//         <div style={{ display: 'flex' }}>
//             {colorList.map((color) => (
//                 <div
//                     key={color}
//                     style={{
//                         width: '20px',
//                         height: '20px',
//                         marginRight: '5px',
//                         backgroundColor: color,
//                     }}
//                 />
//             ))}
//         </div>
//     );
// }
// export default News;

// #999999 #5856D6 #AF52DE #13C2C2 #52C41A


// import { createTheme } from '@mui/material/styles';
// import { Box, Grid } from '@mui/material';
//
// const theme = createTheme();
//
// const colorList = [
//     theme.palette.primary.main,
//     theme.palette.secondary.main,
//     theme.palette.error.main,
//     // Add more colors as needed
// ];
//
// function News() {
//     return (
//         <Grid container spacing={1}>
//             {colorList.map((color) => (
//                 <Grid item key={color}>
//                     <Box
//                         sx={{
//                             width: '20px',
//                             height: '20px',
//                             backgroundColor: color,
//                         }}
//                     />
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }
//
// export default News;




// import { createTheme } from '@mui/material/styles';
// import { List, ListItem, ListItemIcon } from '@mui/material';
//
// const theme = createTheme();
//
// const colorList = [
//     theme.palette.primary.main,
//     theme.palette.secondary.main,
//     theme.palette.error.main,
//     // Add more colors as needed
// ];
//
// function News() {
//     return (
//         <List sx={{ display: 'flex' }}>
//             {colorList.map((color) => (
//                 <ListItem key={color}>
//                     <ListItemIcon>
//                         <div
//                             style={{
//                                 width: '20px',
//                                 height: '20px',
//                                 backgroundColor: color,
//                             }}
//                         />
//                     </ListItemIcon>
//                 </ListItem>
//             ))}
//         </List>
//     );
// }
// export default News;



//
// import React from 'react';
// import { List, ListItem, ListItemText } from '@mui/material';
//
// function News() {
//     return (
//         <List sx={{ '& .MuiTypography-body1': { fontWeight: 'bold' } }}>
//             <ListItem>
//                 <ListItemText primary="item1" />
//             </ListItem>
//             <ListItem>
//                 <ListItemText primary="item2" />
//             </ListItem>
//             <ListItem>
//                 <ListItemText primary="item3" />
//             </ListItem>
//             <ListItem>
//                 <ListItemText primary="item4" />
//             </ListItem>
//         </List>
//     );
// }
//
// export default News;




// import { createTheme } from '@mui/material/styles';
// import { Box, Grid } from '@mui/material';
//
// const theme = createTheme();
//
// const colorList = [
//     "#999999",
//     "#5856D6",
//     "#AF52DE",
//     "#13C2C2",
//     "#52C41A",
// ];
//
// function News() {
//     return (
//         <Grid container spacing={1}>
//             {colorList.map((color) => (
//                 <Grid item key={color}>
//                     <Box
//                         sx={{
//                             width: '30px',
//                             height: '30px',
//                             backgroundColor: color,
//                         }}
//                     />
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }
//
// export default News;





// import { createTheme } from '@mui/material/styles';
// import { Box, Grid, TextField } from '@mui/material';
//
// const theme = createTheme();
//
// const colorList = [
//     "#999999",
//     "#5856D6",
//     "#AF52DE",
//     "#13C2C2",
//     "#52C41A",
// ];
//
// function News() {
//     return (
//         <Grid container spacing={1}>
//             {colorList.map((color) => (
//                 <Grid item key={color}>
//                     <Box
//                         sx={{
//                             width: '30px',
//                             height: '30px',
//                             backgroundColor: color,
//                         }}
//                     />
//                 </Grid>
//             ))}
//             <Grid item>
//                 <TextField id="outlined-basic" label="Type Something" variant="outlined" />
//             </Grid>
//         </Grid>
//     );
// }
//
// export default News;







// import { Box, Grid, TextField } from '@mui/material';
// import { useState } from 'react';
//
//
// const colorList = [
//     "#999999",
//     "#5856D6",
//     "#AF52DE",
//     "#13C2C2",
//     "#52C41A",
// ];
//
// function News() {
//     const [selectedColor, setSelectedColor] = useState(colorList[0]);
//
//     const handleInputChange = (event) => {
//         setSelectedColor(event.target.value);
//     };
//
//     return (
//         <Grid container spacing={1}>
//
//             <Grid item>
//                 <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     defaultValue=""
//                     inputProps={{style: {color: selectedColor}}}
//                     onChange={handleInputChange}
//                 />
//             </Grid>
//
//             {colorList.map((color) => (
//                 <Grid item key={color}>
//                     <Box
//                         sx={{
//                             width: '30px',
//                             height: '30px',
//                             backgroundColor: color ,
//                             border: `2px solid ${color}`,
//                         }}
//                         onClick={() => setSelectedColor(color)}
//                     />
//                 </Grid>
//             ))}
//
//         </Grid>
//     );
// }
//
// export default News;




//
// import { Box, Grid, TextField } from '@mui/material';
// import { useState } from 'react';
//
// const colorList = [
//     "#999999",
//     "#5856D6",
//     "#AF52DE",
//     "#13C2C2",
//     "#52C41A",
// ];
//
// function News() {
//     const [selectedColor, setSelectedColor] = useState(colorList[0]);
//
//     const handleInputChange = (event) => {
//         setSelectedColor(event.target.value);
//     };
//
//     return (
//         <Grid>
//             <Grid style={{
//                 display: 'inline-block',
//                 position: 'relative',
//                 margin: '10px'
//             }}>
//                 <TextField style={{
//                     width: ' 100%',
//                     fontSize: '16px'
//                 }}
//
//                            autoFocus={true}
//                            inputProps={{
//                                style: {color: selectedColor},
//                                disableUnderline: true,
//                            }}
//                            onChange={handleInputChange}
//
//                 />
//             </Grid>
//             <Grid>
//                 <Grid>Color</Grid>
//                 <Grid container spacing={1}>
//
//                     {colorList.map((color) => (
//                         <Grid item key={color}>
//                             <Box
//                                 sx={{
//                                     width: '18px',
//                                     height: '18px',
//                                     backgroundColor: color,
//                                     border: `2px solid ${color}`,
//                                 }}
//                                 onClick={() => setSelectedColor(color)}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// }
//
// export default News;




// import { Box, Grid, TextField } from '@mui/material';
// import { useState } from 'react';
// import CheckIcon from '@mui/icons-material/Check';
//
// const colorList = [  '#999999',  '#5856D6',  '#AF52DE',  '#13C2C2',  '#52C41A',];
//
// function News() {
//     const [selectedColor, setSelectedColor] = useState(colorList[0]);
//
//     const handleInputChange = (event) => {
//         setSelectedColor(event.target.value);
//     };
//
//     return (
//         <Grid>
//             <Grid
//                 style={{
//                     display: 'inline-block',
//                     position: 'relative',
//                     margin: '10px',
//                 }}
//             >
//                 <TextField
//                     style={{
//                         width: ' 100%',
//                         fontSize: '16px',
//                     }}
//                     autoFocus={true}
//                     inputProps={{
//                         style: { color: selectedColor },
//                         disableUnderline: true,
//                     }}
//                     onChange={handleInputChange}
//                 />
//             </Grid>
//             <Grid sx={{ marginBottom: '10px', color: 'blue' }}>
//                 Color
//             </Grid>
//             <Grid container spacing={1}>
//                 {colorList.map((color) => (
//                     <Grid item key={color}>
//                         <Box
//                             sx={{
//                                 position: 'relative',
//                                 width: '18px',
//                                 height: '18px',
//                                 backgroundColor: color,
//                                 border: `2px solid ${color}`,
//                                 cursor: 'pointer',
//                             }}
//                             onClick={() => setSelectedColor(color)}
//                         >
//                             {selectedColor === color && (
//                                 <Box
//                                     sx={{
//                                         position: 'absolute',
//                                         top: '50%',
//                                         left: '50%',
//                                         transform: 'translate(-50%, -50%)',
//                                         width: '10px',
//                                         height: '10px',
//                                         // backgroundColor: 'white',
//                                         // borderRadius: '50%',
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                     }}
//                                 >
//                                     <CheckIcon sx={{ fontSize: '20px', color: '#FFFFFF' }} />
//                                 </Box>
//                             )}
//                         </Box>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Grid>
//     );
// }
//
// export default News;

// import { Grid, MenuItem, ListItemText } from '@mui/material';
// import { EditOutlined } from '@ant-design/icons';
//
// import { useState } from 'react';
// import {Select, InputLabel, MenuItem, Grid} from '@mui/material';
// import {FormattedMessage} from "react-intl";
//
// const secondGridTextStyle = {
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     display: '-webkit-box',
//     '-webkit-line-clamp': 3,
//     '-webkit-box-orient': 'vertical',
// };
// function News() {
//     // const [selectedValue, setSelectedValue] = useState('');
//     // const [placeholder, setPlaceholder] = useState('Select an option');
//     //
//     // const handleChange = (event) => {
//     //     setSelectedValue(event.target.value);
//     //     setPlaceholder('');
//     // };
//     return (
//     //     <>
//     //         <Select
//     //             labelId="demo-simple-select-placeholder-label"
//     //             id="demo-simple-select-placeholder"
//     //             value={selectedValue}
//     //             onChange={handleChange}
//     //             displayEmpty
//     //         >
//     //             <MenuItem value="">
//     //                 <em>Select an opti555</em>
//     //             </MenuItem>
//     //             <MenuItem value={10}>Option 1</MenuItem>
//     //             <MenuItem value={20}>Option 2</MenuItem>
//     //             <MenuItem value={30}>Option 3</MenuItem>
//     //         </Select>
//     //         {placeholder && (
//     //             <InputLabel shrink htmlFor="demo-simple-select-placeholder-label">
//     //                 {placeholder}
//     //             </InputLabel>
//     //         )}
//     //     </>
//     // )
//         <Grid item sm={12}>
//             <Grid container sx={{mb: 2, mt: 2}}>
//                 <Grid item sm={6}
//
//                 >
//                     Lorem Ipsum is simply dummy
//                     text of the printing and typesetting industry.
//                     {/*<FormattedMessage id="browser-profile-modal-useragent" />:*/}
//                 </Grid>
//                 {/*<Grid item sm={6}><strong>  {userAgent && userAgent.value} </strong></Grid>*/}
//                 <Grid item sm={6} sx={secondGridTextStyle}><strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//
//
//                 </strong></Grid>
//             </Grid>yy
//         </Grid>
//     )
// }
//
// export default News;





// import {useState} from 'react';
// import {Grid, ToggleButton} from '@mui/material';
// import  styles from './news.module.css';


// const marks = [
//     {
//         value: 0,
//     },
//     {
//         value: 1,
//     },
//     {
//         value: 2,
//     },
//     {
//         value: 3,
//     }
// ];
//
// function News() {
//
//     const [selectedValue, setSelectedValue] = useState(null);
//
//     const handleButtonClick = (e) => {
//         const value = parseInt(e.target.value);
//
//
//         setSelectedValue(value);
//     };
//
//     return (
//         <>
//             {/*{*/}
//             {/*    marks.map((mediaItem, index) => (*/}
//             {/*        <ToggleButton*/}
//             {/*            key={index}*/}
//             {/*            value={mediaItem.value}*/}
//             {/*            sx={{px: 2, py: 0.5, gap: '5px'}}*/}
//             {/*            styles={{*/}
//             {/*                background: 'red'*/}
//             {/*            }}*/}
//             {/*            // className={mediaItem.value === selectedValue ? styles.defaultStyle : styles.choosenType}*/}
//             {/*            // className={styles.choosenType}*/}
//             {/*            onClick={handleButtonClick}*/}
//             {/*        >*/}
//             {/*            {mediaItem.value}*/}
//             {/*        </ToggleButton>*/}
//             {/*    ))*/}
//             {/*}*/}
//             <Grid container className={styles.toggleButtonWrapper}>
//                 {
//                     marks.map((mediaItem) => (
//                         <Grid
//                             item
//                             sx={{px: 2, py: 0.5}}
//                             sm={12/marks.length}
//                             xs={12/marks.length }
//                             key={mediaItem.value}
//                             // className={
//                             //     `${settingsItem === item ? styles.chooseType : styles.defaultStyle}
//                             //  ${disabled ? styles.disabled : ''}`
//                             // }
//                             className={mediaItem.value === selectedValue ? styles.defaultStyle : styles.choosenType}
//                             onClick={handleButtonClick}
//                         >
//                             {mediaItem.value}
//                         </Grid>
//                     ))
//                 }
//             </Grid>
//         </>
//     );
// }
//
// export default News;


// import {useEffect, useRef, useState} from 'react';
//
// function News() {
//     const [counter, setCounter] = useState(0);
//     const [name, setName] = useState('');
//     const [surName, setSurName] = useState('');
//
//     const nameRef = useRef()
//     const surNameRef = useRef()
//     let elRef = useRef()
//
//     function handlerFocus(e) {
//         if(e.keyCode === 'Enter' || e.keyCode === 13){
//             surNameRef.current.focus()
//         }
//     }
//
//     useEffect( () => {
//         console.log(' elRef.current',  elRef.current)
//         elRef.current = 0;
//     },[] )
//
//     return (
//     <div>
//         <button onClick={ () => {
//             console.log('ddccddcc', counter)
//             elRef.current++
//         }}> indz vra sexmel en {counter} angam</button>
//
//         <button onClick={ () => setCounter(elRef.current) }> obnawit</button>
//         <br/>
//
//         <form action="">
//             <input
//                 ref={nameRef}
//                 type="text"
//                 placeholder='name'
//                 value={name}
//                 onChange={ (e) => setName(e.target.value) }
//                 onKeyUp={handlerFocus}
//             />
//             <br/>
//             <input
//                 ref={surNameRef}
//                 type="text"
//                 placeholder='surName'
//                 value={surName}
//                 onChange={ (e) => setSurName(e.target.value) }
//             />
//         </form>
//     </div>
//     );
// }
//
// export default News;

// Import the necessary modules
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
//
// // Create a component that uses useParams() hook
// const UserProfile = () => {
//     // Access the route parameters using useParams()
//     let ttt = useParams();
//     console.log('ttt', ttt)
//     let { username, id, surname } = useParams();
//
//     return (
//         <div>
//             <h1>User Profile</h1>
//             <p>Username: {username}</p>
//             <p>ID: {id}</p>
//             <p>SURNAME: {surname}</p>
//         </div>
//     );
// };
//
// // Create a parent component that defines the routes
// const News = () => {
//     return (
//         <Router>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/user/johndoe/AAAA/123">John Doe</Link>
//                     </li>
//                     <li>
//                         <Link to="/user/janesmith/BBBB/456">Jane Smith</Link>
//                     </li>
//                 </ul>
//             </nav>
//
//             <Switch>
//                 {/* Define routes with dynamic parameters */}
//                 <Route path="/user/:username/:surname/:id" component={UserProfile} />
//             </Switch>
//         </Router>
//     );
// };
//
// export default News;


// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Popover from '@material-ui/core/Popover';
// import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
//
// const MyComponent = () => {
//     return (
//         <PopupState variant="popover" popupId="myPopoverId">
//             {(popupState) => (
//                 <React.Fragment>
//                     <Button {...bindTrigger(popupState)}>
//                         Open Popover1
//                     </Button>
//                     <Popover
//                         {...bindPopover(popupState)}
//                         anchorOrigin={{
//                             vertical: 'bottom',
//                             horizontal: 'center',
//                         }}
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'center',
//                         }}
//                     >
//                         <div style={{ padding: 16 }}>
//                             <h2>Popover Content</h2>
//                             <p>This is a popover example using PopupState.</p>
//                             <Button onClick={popupState.close}>Close</Button>
//                         </div>
//                     </Popover>
//                 </React.Fragment>
//             )}
//         </PopupState>
//     );
// };
//
// export default MyComponent;

// import React, { useState } from 'react';
// import { Grid, MenuItem, Modal } from '@material-ui/core';
//
// const News = () => {
//     const [selectedSetting, setSelectedSetting] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
//
//     let settings = [
//         {
//             name: 'add-folder',
//         },
//         {
//             name: 'change-proxy',
//         },
//         {
//             name: 'add-tags',
//         },
//         {
//             name: 'export-cookies',
//         },
//         {
//             name: 'delete',
//         },
//     ];
//
//     const handleMenuItemClick = (event, setting) => {
//         setSelectedSetting(setting);
//         setModalPosition({
//             top: event.currentTarget.offsetTop + event.currentTarget.offsetHeight,
//             left: event.currentTarget.offsetLeft,
//         });
//         setModalOpen(true);
//     };
//
//     const handleModalClose = () => {
//         setSelectedSetting(null);
//         setModalOpen(false);
//     };
//
//     return (
//         <Grid container spacing={1}>
//             {settings.map((setting, index) => (
//                 <Grid key={index} item>
//                     <MenuItem onClick={(event) => handleMenuItemClick(event, setting)} disabled={setting.disabled}>
//                         {setting.name && (
//                             <Grid>{setting.name}</Grid>
//                         )}
//                     </MenuItem>
//                 </Grid>
//             ))}
//             <Modal open={modalOpen} onClose={handleModalClose}>
//                 <div style={{
//                     position: 'fixed',
//                     top: modalPosition.top,
//                     left: modalPosition.left,
//                     backgroundColor: '#fff',
//                     padding: '20px',
//                 }}>
//                     {selectedSetting && selectedSetting.name}
//                 </div>
//             </Modal>
//         </Grid>
//     );
// };
//
// export default News;




//
// import React, { useState } from 'react';
// import { Grid, MenuItem } from '@material-ui/core';
//
// const News = () => {
//     const [selectedSetting, setSelectedSetting] = useState(null);
//
//     let settings = [
//         {
//             name: 'add-folder',
//         },
//         {
//             name: 'change-proxy',
//         },
//         {
//             name: 'add-tags',
//         },
//         {
//             name: 'export-cookies',
//         },
//         {
//             name: 'delete',
//         },
//     ];
//
//     const handleMenuItemClick = (setting) => {
//         setSelectedSetting(setting);
//     };
//
//     const handleCloseModal = () => {
//         setSelectedSetting(null);
//     };
//
//     return (
//         <Grid container spacing={1}>
//             {settings.map((setting, index) => (
//                 <Grid key={index} item>
//                     <MenuItem
//                         onClick={() => handleMenuItemClick(setting)} disabled={setting.disabled}
//
//                     >
//                         {setting.name && (
//                             <Grid>{setting.name}</Grid>
//                         )}
//                     </MenuItem>
//                     {selectedSetting && selectedSetting.name === setting.name && (
//                         <div
//                             style={{
//                                 position: 'relative',
//                                 top: '5px',
//                                 left: '0',
//                                 backgroundColor: '#fff',
//                                 padding: '20px',
//                                 border: '1px solid #ccc',
//                             }}
//                         >
//                             {selectedSetting.name}
//                             <button onClick={handleCloseModal}>Close</button>
//                         </div>
//                     )}
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };
//
// export default News;





// import EmojiPicker, { Emoji} from 'emoji-picker-react';

// function News() {
//     const customEmoji = {
//         name: 'Custom Emoji',
//         shortNames: ['custom'],
//         text: '',
//         emoticons: [],
//         keywords: ['custom'],
//         imageUrl: 'https://em-content.zobj.net/source/microsoft-teams/337/link_1f517.png',
//     };
//
//     const handleEmojiClick = (event, emojiObject) => {
//         if (emojiObject && emojiObject.shortNames && emojiObject.shortNames.includes('custom')) {
//             console.log('Custom emoji selected!');
//         } else {
//             console.log('Other emoji selected');
//         }
//     };
//     const categories = {
//         custom: {
//             title: 'Custom',
//             emoji: [customEmoji],
//         },
//         // Add other default or custom categories as needed
//     };
//
//     return (
//         <EmojiPicker
//             categories={categories}
//             onEmojiClick={handleEmojiClick}
//         />
//     );
// }
//
//
//
//
//
//



// import EmojiPicker from 'emoji-picker-react';
//
// function News() {
//     const handleEmojiClick = (event, emojiObject) => {
//         console.log(emojiObject);
//     };
//
//     // CSS style for the emoji list
//     // const emojiListStyle = {
//     //     display: 'grid',
//     //     gridTemplateColumns: 'repeat(10, 24px)', // Adjust the number and size of columns as needed
//     //     gap: '8px',
//     // };
//
//     // CSS style for each emoji
//     // const emojiStyle = {
//     //     width: '24px', // Adjust the width as needed
//     //     height: '24px', // Adjust the height as needed
//     // };
//
//     return (
//         <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//             // pickerStyle={emojiListStyle}
//             // emojiStyle={emojiStyle}
//         />
//     );
// }
// export default News;



//
// import React, { useState } from 'react';
// import EmojiPicker from 'emoji-picker-react';
//
// function News() {
//     const [selectedEmoji, setSelectedEmoji] = useState(null);
//
//     const handleEmojiClick = (event, emojiObject) => {
//         setSelectedEmoji(emojiObject);
//     };
//
//     const getRandomEmoji = () => {
//         const emojis = ['😀', '😄', '😊', '🥳', '😎', '🎉']; // Add more emojis as needed
//         const randomIndex = Math.floor(Math.random() * emojis.length);
//         return emojis[randomIndex];
//     };
//
//     const randomEmoji = getRandomEmoji();
//
//     return (
//         <div>
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//
//             <div className="emoji-display">{selectedEmoji ? selectedEmoji.emoji : randomEmoji}</div>
//         </div>
//     );
// }
//
// export default News;
//



// import EmojiPicker from 'emoji-picker-react';
//
// function News() {
//     const handleEmojiClick = (event, emojiObject) => {
//         console.log(emojiObject);
//     };
//
//     return (
//         <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//         />
//     );
// }
// export default News;


import React from 'react';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';

function News() {
    return (
        <PopupState variant="popover" popupId="myPopover">
            {(popupState) => (
                <div>
                    <button {...bindTrigger(popupState)}>Open Popover222</button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div style={{
                            width: '200px',
                            height: '200px',
                            border: '3px solid red'
                        }}>Popover content</div>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}

export default News;




// import {useEffect, useMemo, useState} from "react";
//
// const createUser = (name, surName) => {
//  const user = {name, surName}
//     console.log('createUser3=3==3=', user)
//     return user
// }
//
// function News() {
//     const [name, setName] = useState('');
//     const [surName, setSurName] = useState('');
//     const [counter, setCounter] = useState(0);
//
// const user = useMemo( () => createUser(name, surName),[name, surName])
// // const user =  createUser(name, surName)
//
//     useEffect( () => {
//         console.log('useEffect1-1-1-1-')
//     }, [] )
//
//     return (
//         <div >
//             <button
//            onClick={ () => setCounter(counter + 1) }
//             >
//                 na menya najali {counter} raz
//             </button>
//             <br/>
//             <input
//                 type="text"
//                 value={name}
//                 onChange={ (e) => setName(e.target.value) }
//             />
//             <br/>
//             <input
//                 type="text"
//                 value={surName}
//                 onChange={ (e) => setSurName(e.target.value) }
//             />
//             <br/>
//             {/*<pre>{user.name}</pre>*/}
//             {/*<br/>*/}
//             {/*<pre>{user.surName}</pre>*/}
//             <pre>{JSON.stringify(user,null ,2)}</pre>
//         </div>
//     );
// }
//
//
// export default News;

//
// import React, {useEffect, useState} from 'react';
//
// function News() {
//     const [operatingSystem, setOperatingSystem] = useState('');
//
//     useEffect(() => {
//         const platform = window.navigator.platform;
//         const osName = getOSName(platform);
//         setOperatingSystem(osName);
//     }, []);
//
//     const getOSName = (platform) => {
//         if (platform.includes('Win')) {
//             return 'Windows';
//         } else if (platform.includes('Linux')) {
//             return 'Linux';
//         } else if (platform.includes('Mac')) {
//             return 'macOS';
//         } else {
//             return 'Unknown OS';
//         }
//     };
//
//     return (
//         <div>
//             <h1>Operating System: {operatingSystem}</h1>
//         </div>
//     );
// }
//
// export default News;





// import React, {useEffect, useState} from 'react';
// import axios from "axios"
//
// function News() {
//     const [starships, setStarships] = useState([])
//     const [planets, setPlanets] = useState([])
//     const [films, setFilms] = useState([])
//
//     useEffect(() => {
//         async function fetchData() {
//             const resultData = await Promise.allSettled([
//                 axios.get(`https://swapi.dev/api/starships4444/`),
//                 axios.get(`https://swapi.dev/api/planets/`),
//                 axios.get(`https://swapi.dev/api/films/`),
//             ])
//
//             setStarships(resultData[0]?.value)
//             setPlanets(resultData[1]?.value)
//             setFilms(resultData[2]?.value)
//         }
//
//         fetchData()
//     }, [])
//
//
//     return (
//         <div style={{ display: "flex", justifyContent: "space-around" }}>
//             <div>
//                 {starships?.data?.results.map((item) => (
//                     <div key={item.name}>{item.name}</div>
//                 ))}
//             </div>
//             <div>
//                 {planets?.data?.results.map((item) => (
//                     <div key={item.name}>{item.name}</div>
//                 ))}
//             </div>
//             <div>
//                 {films?.data?.results.map((item) => (
//                     <div key={item.title}>{item.title}</div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default News;


// const runBrowser = async(agentPort: string, profileId: string) => {
//     const accessToken = await getAccessToken();
//     const browserRunUrl = process.env.REACT_APP_BROWSER_RUN_URL;
//
//     return axios.post(
//         `${browserRunUrl}:${agentPort}/v1/browser-profiles/${profileId}/start`,
//         {
//             "screen": {
//                 "width": screen.width,
//                 "height": screen.height,
//                 "dpr": window.devicePixelRatio
//             }
//         },
//         {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 Authorization: "Bearer " + accessToken,
//             },
//         }
//     );
// }
//
// const handleClickButton = async (event: React.MouseEvent) => {
//     event.stopPropagation();
//     const agentPort = localStorage.getItem('agentPort') || process.env.REACT_APP_DEFAULT_AGENT_PORT;
// }
//
//     return runBrowser(agentPort, ['1', '2', '3', '4', '5'])
//         .then((res: AxiosResponse) => {
//
//         })
//         .catch((err: any) => {
//             toast.error('Request Error!', {
//                 icon: <img src={crossError} alt={crossError}/>,
//             });
//
//             const message = err?.response?.data?.errors?.message;
//             logoutWithUnexpectedToken(message || '');
//         });
// }



// import React, { useState, useEffect } from 'react';
//
// function News() {
//     const [profileIdsList, setProfileIdsList] = useState([]);
//
//     const handleCloseModal = (mode) => {
//         let arr1 = [1, 2, 3, 5, 7, 76, 6768];
//         let arr2 = [1, 3, 7, 76, 545, 656, 56567, 77];
//
//         if (mode === 'run') {
//             let newArr = arr2.filter(item => !arr1.includes(item));
//             setProfileIdsList(newArr);
//         } else {
//             let newArr = arr2.filter(item => arr1.includes(item));
//             setProfileIdsList(newArr);
//         }
//     }
//
//     return (
//         <div>
//             {profileIdsList?.map((list, index) => (
//                 <div key={index}>
//                     <div>{list}</div>
//                 </div>
//             ))}
//             <button onClick={() => handleCloseModal('run')}>run</button>
//             <button onClick={() => handleCloseModal('stop')}>stop</button>
//
//         </div>
//     );
// }
//
// export default News;







//
// import React, { useState, useEffect } from 'react';
//
//
// function News() {
//     const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
//
//     const addNumber = () => {
//         const lastNumber = numbers[numbers.length - 1];
//         setNumbers([...numbers, lastNumber + 1]);
//     };
//
//     const handleScroll = () => {
//         console.log('ka scroll');
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll); // Attach the event listener to the window object
//         return () => {
//             window.removeEventListener('scroll', handleScroll); // Clean up the event listener on component unmount
//         };
//     }, []);
//
//     return (
//         <div>
//             <ul>
//                 {numbers.map((n) => {
//                     return <li key={n}>{n}</li>;
//                 })}
//             </ul>
//             <button onClick={addNumber}>dobawit</button>
//         </div>
//     );
// }
//
// export default News;



