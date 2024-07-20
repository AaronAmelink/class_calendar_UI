import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useEffect, useState} from "react";
import SaveIcon from "./SaveIcon";
import TopBarDirectory from "../ContentComponents/TopBarDirectory";
import {useLocation, useNavigate} from "react-router-dom";
import pageURLs from "./pageURLs";
import {useDispatch, useSelector} from "react-redux";
import AccountIcon from "./AccountIcon";
import ClassTab from "./ClassTab";
import Divider from "@mui/material/Divider";


function MenuNavigator({ text, url }) {
    const navigate = useNavigate();
    const handleMenuNavigate = () => {
        navigate(url);
    }
    return (
        <MenuItem key={text} onClick={handleMenuNavigate}>
            {text}
        </MenuItem>
    );
}

export default function TopBar(props) {
    const location = useLocation();
    const lastAccessedPage = useSelector((state) => state.pageData.lastAccessedPage);


    useEffect(() => {
        console.log(lastAccessedPage);
    }, [lastAccessedPage]);


    const handleMenuClick = (event) =>{
        if (menuIconsVisible){
            handleMenuClose(event);
        }
        else{
            handleMenuOpen(event);
        }
    }

    const handleMenuClose= (event) => {
        setMenuIconsVisible(false);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event) => {
        setMenuIconsVisible(true);
        setAnchorEl(event.currentTarget);
    }

    const [menuIconsVisible, setMenuIconsVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{maxHeight:50}}>
                <Toolbar sx={{mt:-1}}>
                    <Box display='flex' flexGrow={1}>
                        <IconButton
                            aria-label="menu"
                            onClick={handleMenuClick}
                            aria-controls={menuIconsVisible ? 'basic-menu' : undefined}
                            sx={{color:"icon.main"}}
                        >
                        <MenuIcon />
                            <Divider orientation="vertical" sx={{pl:3}}/>
                        </IconButton>
                        <Menu
                            open={menuIconsVisible}
                            id={"Nav-Menu"}
                            onClose={handleMenuClose}
                            anchorEl={anchorEl}
                            sx={
                                { mt: "1px", "& .MuiMenu-paper":
                                        { backgroundColor: "menu.main", },
                                }
                            }

                        >
                            {
                                lastAccessedPage.id ?
                                    (<MenuNavigator url={pageURLs.page + '/' + lastAccessedPage.id} text={lastAccessedPage.name}/>) : <div></div>
                            }
                            <MenuNavigator url={pageURLs.classes} text='Classes'/>

                        </Menu>
                        {
                            props.pageID && location.pathname.includes(props.pageID) ?
                            (<Typography variant="h6" sx={{ml:4}} >
                                <TopBarDirectory/>
                            </Typography>) : (<div></div>)
                        }
                        {
                            location.pathname.includes(pageURLs.classes) ?
                                (
                                    <ClassTab/>
                                ) : (<div></div>)
                        }
                    </Box>
                    <SaveIcon/>
                    <AccountIcon/>
                </Toolbar>

            </AppBar>
        </Box>
    );
}
