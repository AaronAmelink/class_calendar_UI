import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Menu from "@mui/material/Menu";
import ShortTextIcon from '@mui/icons-material/ShortText';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArticleIcon from '@mui/icons-material/Article';
import usePageData from "../../customHooks/pageDataHook";
import {useParams} from "react-router-dom";

const {v4: uuidv4} = require('uuid');
export default function AddContentMenu(props) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const params = useParams();
    const {addContent} = usePageData();

    const handleTextAddClick = () => {
        addContent(props.index, {type: "text", value: "", id: uuidv4()}, params.pageID);
    }

    const handleDivAddClick = () => {
        addContent(props.index, {type: "divider", id: uuidv4()}, params.pageID);
    }

    const handleCheckBoxAddClick = () => {
        addContent(props.index, {type: "checkbox", value: "", id: uuidv4(), checked: false, indent: 0}, params.pageID);
    }

    const handlePageAddClick = () => {
        addContent(props.index, {type: "page", id: uuidv4(), linkedPageID: uuidv4()}, params.pageID);
    }

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
        <IconButton aria-label="plus" onClick={handleMenuClick}>
            <AddIcon/>
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
                <MenuItem onClick={handleTextAddClick}>
                    <ShortTextIcon/>
                    <Typography variant="subtitle1">
                        Add Text
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleDivAddClick}>
                    <HorizontalRuleIcon/>
                    <Typography variant="subtitle1">
                        Add Divider
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleCheckBoxAddClick}>
                    <CheckBoxIcon/>
                    <Typography variant="subtitle1">
                        Add Checkbox
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handlePageAddClick}>
                    <ArticleIcon/>
                    <Typography variant="subtitle1">
                        Add New Page
                    </Typography>
                </MenuItem>
            </Menu>
        </IconButton>
    );
}