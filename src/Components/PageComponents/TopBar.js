import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SaveIcon from "./SaveIcon";
import {useLocation, useNavigate} from "react-router-dom";
import pageURLs from "./pageURLs";
import {useSelector} from "react-redux";
import AccountIcon from "./AccountIcon";
import ClassTab from "./ClassTab";
import Divider from "@mui/material/Divider";
import TopBarDirectory from "../ContentComponents/TopBarDirectory";


function MenuNavigator({text, url}) {
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

export default function TopBar() {
    const location = useLocation();
    const lastAccessedPage = useSelector((state) => state.pageData.lastAccessedPage);
    const editPageLoaded = useSelector((state) => state.pageData.loaded);


    const handleMenuClick = (event) => {
        if (menuIconsVisible) {
            handleMenuClose(event);
        } else {
            handleMenuOpen(event);
        }
    }

    const handleMenuClose = () => {
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
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{maxHeight: 50}}>
                <Toolbar sx={{mt: -1}}>
                    <Box display='flex' flexGrow={1}>
                        <IconButton
                            aria-label="menu"
                            onClick={handleMenuClick}
                            aria-controls={menuIconsVisible ? 'basic-menu' : undefined}
                            sx={{color: "icon.main"}}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Menu
                            open={menuIconsVisible}
                            id={"Nav-Menu"}
                            onClose={handleMenuClose}
                            anchorEl={anchorEl}
                            sx={
                                {
                                    mt: "1px", "& .MuiMenu-paper":
                                        {backgroundColor: "menu.main",},
                                }
                            }

                        >
                            {
                                lastAccessedPage.id ?
                                    (<MenuNavigator url={pageURLs.page + '/' + lastAccessedPage.id}
                                                    text={lastAccessedPage.name}/>) : <div></div>
                            }
                            <MenuNavigator url={pageURLs.classes} text='Classes'/>

                        </Menu>
                        <Divider orientation="vertical" sx={{mx: 3}} flexItem variant='middle'/>


                        {
                            (editPageLoaded && location.pathname.includes(pageURLs.page)) ?
                                (<TopBarDirectory/>) : (<div></div>)
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
