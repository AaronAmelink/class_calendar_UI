import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import {Grid, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import ShortTextIcon from '@mui/icons-material/ShortText';
import {useParams} from "react-router-dom";
import usePageData from "../../../customHooks/pageDataHook";

export default function AddPropertyMenu(classID = null) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {addProperty} = usePageData();
    const params = useParams();

    const handleTextAddClick = () => {
        addProperty({
            type: 'text',
            name: '',
            value: ''
        }, classID ? classID.classID : params.pageID);
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
        <MenuItem sx={{color: "text.main", mr: 1, ml: 1, mt: 0, mb: 0}} onClick={menuVisible ? null : handleMenuOpen}>
            <AddIcon/>
            <Typography variant="subtitle1">
                New Property
            </Typography>
            <Menu
                spacing={0}
                open={menuVisible}
                id={"Add-Props-Menu"}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                sx={
                    {
                        mt: "1px", "& .MuiMenu-paper":
                            {backgroundColor: "menu.main",},
                    }
                }
            >
                <MenuItem sx={{m: 0}}>
                    <Stack>
                        <Stack aria-label="add text" sx={{color: "text.main", minWidth: "200px"}}>
                            <Grid container onClick={handleTextAddClick}>
                                <Grid>
                                    <ShortTextIcon/>
                                </Grid>
                                <Grid>
                                    <Typography variant="subtitle1">
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