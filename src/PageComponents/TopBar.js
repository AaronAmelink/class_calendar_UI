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
import DocumentManager from "../managment/documentManager";
import PageButtonStackItem from "../ContentComponents/StackItems/PageButtonStackItem";
import SaveIcon from "./SaveIcon";
import {Breadcrumbs} from "@mui/material";
import TopBarDirectory from "../ContentComponents/TopBarDirectory";
export default function TopBar(props) {
    const [pageID, setPageID] = useState(props.pageID);
    const [, setSaved] = useState(props.saved);
    useEffect(() => {
        setPageID(props.pageID);
    }, [props.pageID]);

    useEffect(() => {
        setSaved(props.saved);
    }, [props.saved]);





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
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <Box sx={{ flexGrow: 1, mt:0.5 }}>
            <AppBar position="static" sx={{maxHeight:40}}>
                <Toolbar sx={{mt:-1.5}}>
                    <Box display='flex' flexGrow={1}>
                        <IconButton
                            aria-label="menu"
                            onClick={handleMenuClick}
                            aria-controls={menuIconsVisible ? 'basic-menu' : undefined}
                            sx={{color:"text.main"}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            open={menuIconsVisible}
                            id={"Nav-Menu"}
                            onClose={handleMenuClose}
                            anchorEl={anchorEl}
                            sx={
                                { mt: "1px", "& .MuiMenu-paper":
                                        { backgroundColor: "primary.main", },
                                }
                            }

                        >
                            <MenuItem sx={{color:"text.main"}} key='root page'>
                                Root Page
                            </MenuItem>
                        </Menu>
                        <Typography variant="h6" sx={{ml:4, color:"text.main"}} >
                            <TopBarDirectory pageID={props.pageID}/>
                        </Typography>
                    </Box>
                    <SaveIcon/>
                </Toolbar>

            </AppBar>
        </Box>
    );
}
