import {useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {Button, Divider, Grid, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import {TypeSpecimen} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import DocumentManager from "../managment/documentManager";
import TextValue from "./PropertiesComponents/TextValue";
import Property from "./PropertiesComponents/Property";
import AddPropertyMenu from "./PropertiesComponents/AddPropertyMenu";

export default function PropertiesMenu(props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [properties, SetProperties] = useState([...DocumentManager.getCurrentPageProperties()]);

    useEffect(() => {
        SetProperties([...DocumentManager.getCurrentPageProperties()]);
    }, [props.pageID]);


    const updateProperties = () => {
        SetProperties([...DocumentManager.getCurrentPageProperties()]);
    }



    function removeProperty(id){
        DocumentManager.removeProperty(id);
        SetProperties([...DocumentManager.getCurrentPageProperties()]);
    }

    const handleMenuClick = (event: MouseEvent) =>{
        if (menuVisible){
            handleMenuClose(event);
        }
        else{
            handleMenuOpen(event);
        }
    }
    const handleMenuClose= (event : React.MouseEvent) => {
        setMenuVisible(false);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event : React.MouseEvent) => {
        setMenuVisible(true);
        setAnchorEl(event.currentTarget);
    }

    return(
        <Grid item sx={{m:0, minwidth:4/8, mt:2.5}}>
            <IconButton
                aria-label="menu"
                onClick={handleMenuClick}
                aria-controls={menuVisible ? 'basic-menu' : undefined}
                sx={{color:"text.main", maxWidth: '100px', maxHeight: '50px', minWidth: '100px', minHeight: '50px'}}
            >
                <ArrowDropDownIcon />
                <Typography variant="subtitle1">
                    Properties
                </Typography>
            </IconButton>
            <Menu
                open={menuVisible}
                id={"Props-Menu"}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin=	{{ vertical: 'bottom', horizontal: 'left', }}
                sx={
                    { mt: "1px", "& .MuiMenu-paper":
                            { backgroundColor: "primary.main", },
                    }
                }

            >
                <MenuItem>
                    <Stack container>
                        {
                            properties.map(prop => {
                                return (<Property property={prop} removeProperty={removeProperty}/>);
                            })
                        }
                    </Stack>
                </MenuItem>
                <AddPropertyMenu updateProperties={updateProperties}/>
            </Menu>
        </Grid>

    );
}