import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {Button, Grid, Typography} from "@mui/material";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import {useId, useState} from "react";
import ShortTextIcon from '@mui/icons-material/ShortText';
import DocumentManager from '../../managment/documentManager';

export default function AddPropertyMenu(props) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleAddClick = ()=> {
        //need to fix state delay
        DocumentManager.addTextProperty();
        props.updateProperties();
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
        <MenuItem sx={{color:"text.main",mr:1,ml:1,mt:0,mb:0}} onClick={menuVisible ? null : handleMenuOpen}>
            <AddIcon/>
            <Typography variant="subtitle1">
                Add Property
            </Typography>
            <Menu
                spacing={0}
                open={menuVisible}
                id={"Add-Props-Menu"}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin=	{{ vertical: 'bottom', horizontal: 'left', }}
                sx={
                    { mt: "1px", "& .MuiMenu-paper":
                            { backgroundColor: "primary.main", },
                    }
                }
            >
                <MenuItem sx={{m:0}}>
                    <Stack container>
                        <Stack item aria-label="add text" sx={{color:"text.main", minWidth:"200px"}}>
                            <Grid container onClick={handleAddClick}>
                                <Grid item>
                                    <ShortTextIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" >
                                        Text Property
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </MenuItem>
            </Menu>
        </MenuItem>
    );
}