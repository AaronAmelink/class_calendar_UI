import * as React from "react";
import {useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Property from "./PropertiesComponents/Property";
import AddPropertyMenu from "./PropertiesComponents/AddPropertyMenu";
import {useSelector} from "react-redux";
import {store} from "../../slices/store";
import {getLastModifiedPropertyId, getPropertyBasics} from "../../slices/pageDataSlice";

export default function PropertiesMenu() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const lastModifiedItemId = useSelector(getLastModifiedPropertyId);
    const [idArr, setIdArr] = useState(getPropertyBasics(store.getState()));
    console.log(idArr);
    useEffect(() => {
        setIdArr(getPropertyBasics(store.getState()));
    }, [lastModifiedItemId]);
    const handleMenuClick = (event) => {
        if (menuVisible) {
            handleMenuClose(event);
        } else {
            handleMenuOpen(event);
        }
    }
    const handleMenuClose = () => {
        setMenuVisible(false);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event) => {
        setMenuVisible(true);
        setAnchorEl(event.currentTarget);
    }

    return (
        <Grid sx={{m: 0, minwidth: 4 / 8, mt: 2.5}}>
            <IconButton
                aria-label="menu"
                onClick={handleMenuClick}
                aria-controls={menuVisible ? 'basic-menu' : undefined}
                sx={{color: "text.main", maxWidth: '100px', maxHeight: '50px', minWidth: '100px', minHeight: '50px'}}
            >
                <ArrowDropDownIcon/>
                <Typography variant="subtitle1">
                    Properties
                </Typography>
            </IconButton>
            <Menu
                open={menuVisible}
                id={"Props-Menu"}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                sx={{mt: "1px"}}
            >
                {
                    (idArr?.length > 0) ?
                        (idArr.map(entry => {
                            return (
                                <MenuItem key={entry.id}>
                                    <Property id={entry.id} type={entry.type}/>
                                </MenuItem>
                            )
                        })) : (<div></div>)
                }
                <AddPropertyMenu/>
            </Menu>
        </Grid>

    );
}