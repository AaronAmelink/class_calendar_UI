import {useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Stack from "@mui/material/Stack";
import DocumentManager from "../managment/documentManager";
import Property from "./PropertiesComponents/Property";
import AddPropertyMenu from "./PropertiesComponents/AddPropertyMenu";
import {setSaved} from "../slices/pageDataSlice";
import {useDispatch} from "react-redux";

export default function PropertiesMenu(props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const [properties, SetProperties] = useState([...DocumentManager.getCurrentPageProperties()]);

    useEffect(() => {
        SetProperties([...DocumentManager.getCurrentPageProperties()]);
    }, [props.pageID]);


    const updateProperties = () => {
        SetProperties([...DocumentManager.getCurrentPageProperties()]);
    }



    function removeProperty(id){
        DocumentManager.removeProperty(id);
        dispatch(setSaved(false));
        SetProperties([...DocumentManager.getCurrentPageProperties()]);
    }

    const handleMenuClick = (event) =>{
        if (menuVisible){
            handleMenuClose(event);
        }
        else{
            handleMenuOpen(event);
        }
    }
    const handleMenuClose= (event) => {
        setMenuVisible(false);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event) => {
        setMenuVisible(true);
        setAnchorEl(event.currentTarget);
    }

    return(
        <Grid sx={{m:0, minwidth:4/8, mt:2.5}}>
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
                            { backgroundColor: "menu.main", },
                    }
                }

            >
                <MenuItem>
                    <Stack>
                        {
                            properties.map(prop => {
                                return (<Property property={prop} removeProperty={removeProperty} key={prop?.id}/>);
                            })
                        }
                    </Stack>
                </MenuItem>
                <AddPropertyMenu updateProperties={updateProperties}/>
            </Menu>
        </Grid>

    );
}