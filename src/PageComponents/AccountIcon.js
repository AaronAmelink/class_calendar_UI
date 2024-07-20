import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from "@mui/material/Menu";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import SettingsDialog from "./SettingsDialog";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function AccountIcon() {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);

    function openSettings() {
        setSettingsOpen(true);
    }

    function closeSettings() {
        setSettingsOpen(false);
    }

    const handleMenuClick = (event: MouseEvent) =>{
        if (menuVisible && !settingsOpen){
            handleMenuClose(event);
        } else {
            handleMenuOpen(event);
        }
    }
    const handleMenuClose= () => {
        setMenuVisible(false);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event : React.MouseEvent) => {
        if (!settingsOpen) {
            setMenuVisible(true);
            setAnchorEl(event.currentTarget);
        }
    }

    function handleLogOut() {
        window.sessionStorage.removeItem("authToken");
        window.sessionStorage.removeItem("user_id");
        navigate('/');
    }

    return (
        <div>
            <IconButton sx={{ml:3}} onClick={handleMenuClick}>
                <AccountBoxIcon sx={{color:"icon.main"}}/>
                <SettingsDialog open={settingsOpen} handleClose={closeSettings}/>
                <Menu
                    spacing={0}
                    open={menuVisible}
                    id={"Add-Props-Menu"}
                    onClose={handleMenuClose}
                    anchorEl={anchorEl}
                    anchorOrigin=	{{ vertical: 'bottom', horizontal: 'left', }}
                    sx={
                        { mt: "1px", "& .MuiMenu-paper":
                                { backgroundColor: "menu.main", },
                        }
                    }
                >
                    <Stack divider={<Divider flexItem variant="middle"/>}>
                        <MenuItem onClick={openSettings}>
                            <SettingsIcon sx={{mr:1}}/>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <LogoutIcon sx={{mr:1}}/>
                            Log Out
                        </MenuItem>
                    </Stack>

                </Menu>
            </IconButton>
        </div>
    );
}