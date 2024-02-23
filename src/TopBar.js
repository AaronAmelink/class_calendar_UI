import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useEffect, useState} from "react";
import DocumentManager from ".//managment/documentManager";
import {Grid, useTheme} from "@mui/material";
import PageButtonStackItem from "./ContentComponents/StackItems/PageButtonStackItem";
import SaveIcon from "./SaveIcon";
export default function TopBar(props) {
    const [pageID, setPageID] = useState(props.pageID);
    const [saved, setSaved] = useState(props.saved);

    useEffect(() => {
        setPageID(props.pageID);
    }, [props.pageID]);

    useEffect(() => {
        setSaved(props.saved);
    }, [props.saved]);





    const handleMenuClick = (event: MouseEvent) =>{
        if (menuIconsVisible){
            handleMenuClose(event);
        }
        else{
            handleMenuOpen(event);
        }
    }

    const handleMenuClose= (event : React.MouseEvent) => {
        setMenuIconsVisible(false);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event : React.MouseEvent) => {
        setMenuIconsVisible(true);
        setAnchorEl(event.currentTarget);
    }

    const [menuIconsVisible, setMenuIconsVisible] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                            <MenuItem sx={{color:"text.main"}}>
                                Root Page
                            </MenuItem>
                        </Menu>
                        <Typography variant="h6" sx={{ml:4, color:"text.main"}} >
                            {
                                DocumentManager.getDirectoryOfDocument(pageID).map((pageID) => {
                                    return (<PageButtonStackItem pageID={pageID} onPageUpdate={props.onPageUpdate}/>);
                                })
                            }
                        </Typography>
                    </Box>
                    <SaveIcon/>
                </Toolbar>

            </AppBar>
        </Box>
    );
}
