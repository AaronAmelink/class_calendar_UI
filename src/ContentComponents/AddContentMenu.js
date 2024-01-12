import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {Button, Grid, Typography} from "@mui/material";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import {useId, useState} from "react";
import ShortTextIcon from '@mui/icons-material/ShortText';
import DocumentManager from "../managment/documentManager";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArticleIcon from '@mui/icons-material/Article';

export default function AddContentMenu(props) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleTextAddClick = ()=> {
        DocumentManager.addTextContentByIndex(props.index);
        props.onPageUpdate();


    }

    const handleDivAddClick = () => {
        DocumentManager.addDividerContentByIndex(props.index);
        props.onPageUpdate();
    }

    const handleCheckBoxAddClick = () => {
        DocumentManager.addCheckBoxByIndex(props.index);
        props.onPageUpdate();
    }

    const handlePageAddClick = () => {
        DocumentManager.addNewPageByIndex(props.index, DocumentManager.currentPage._id);
        props.onPageUpdate();
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
        <IconButton aria-label="plus" sx={{color:"text.main"}} onClick={handleMenuClick}>
            <AddIcon />
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
                <MenuItem sx={{color:"text.main"}} onClick={handleTextAddClick}>
                    <ShortTextIcon/>
                    <Typography variant="subtitle1">
                        Add Text
                    </Typography>
                </MenuItem>
                <MenuItem sx={{color:"text.main"}} onClick={handleDivAddClick}>
                    <HorizontalRuleIcon/>
                    <Typography variant="subtitle1">
                        Add Divider
                    </Typography>
                </MenuItem>
                <MenuItem sx={{color:"text.main"}} onClick={handleCheckBoxAddClick}>
                    <CheckBoxIcon/>
                    <Typography variant="subtitle1">
                        Add Checkbox
                    </Typography>
                </MenuItem>
                <MenuItem sx={{color:"text.main"}} onClick={handlePageAddClick}>
                    <ArticleIcon/>
                    <Typography variant="subtitle1">
                        Add New Page
                    </Typography>
                </MenuItem>
            </Menu>
        </IconButton>
    );
}