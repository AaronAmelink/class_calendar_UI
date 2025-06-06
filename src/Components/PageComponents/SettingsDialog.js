import Dialog from '@mui/material/Dialog';
import StyleIcon from '@mui/icons-material/Style';
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import {Button, Switch} from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import allThemes from "../../theme";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {setTheme} from "../../slices/siteDataSlice";


/*
<Box sx={{width:1, height:1}}>
                    <Button sx={{color:'text.primary'}} variant={'outlined'} endIcon={<ArrowDropDown/>} onClick={handleColorClick}>Accent Color</Button>
                    <Menu
                        open={colorPickerVisible}
                        id={"Props-Menu"}
                        onClose={handleColorClick}
                        anchorEl={anchorEl}
                        display="flex"
                        anchorOrigin=	{{ vertical: 'bottom', horizontal: 'left', }}
                    >
                        <Box
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ColorPicker setColor={(color) => dispatch(setColor(color))}/>
                        </Box>
                    </Menu>
                </Box>
 */

const menuItems = {
    'Account': {
        Icon: (<AccountCircleIcon sx={{mr: 1}}/>),
        component: (<AccountCircleIcon/>)
    },
    'Appearance': {
        Icon: (<StyleIcon sx={{mr: 1}}/>),
        component: (<AppearanceGrid/>)
    },
    'Notifications': {
        Icon: (<NotificationsIcon sx={{mr: 1}}/>),
        component: (<NotificationsIcon/>)
    },
    'Connections': {
        Icon: (<DataSaverOnIcon sx={{mr: 1}}/>),
        component: (<DataSaverOnIcon/>)
    }
}

function SettingTitle({name}) {
    return (
        <div>
            <Typography variant={'h4'} sx={{py: 2}}>{name}</Typography>
            <Divider flexItem variant="fullWidth" sx={{pr: 70}}/>
            <Box sx={{pb: 2}}/>
        </div>
    );
}

function AppearanceGrid() {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.siteData.theme)
    const [lightModeSwitch, setLightModeSwitch] = useState(currentTheme === 'light')
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    function switchTheme() {
        if (lightModeSwitch) {
            setLightModeSwitch(false);
            dispatch(setTheme('dark'))
        } else {
            setLightModeSwitch(true);
            dispatch(setTheme('light'))
        }
    }

    const handleColorClick = (event: MouseEvent) => {
        if (colorPickerVisible) {
            handleColorClose(event);
        } else {
            handleColorOpen(event);
        }
    }
    const handleColorClose = () => {
        setColorPickerVisible(false);
    }

    const handleColorOpen = () => {
        setColorPickerVisible(true);
    }

    return (
        <Container sx={{pr: -10}}>
            <Stack spacing={2}>
                <SettingTitle name='Appearance' sx={{pb: 5}}/>
                <Stack spacing={2} direction='row'>
                    <Typography variant='subtitle1' sx={{pt: 0.5}}>
                        Theme: {currentTheme.theme}
                    </Typography>
                    <Switch
                        checked={!lightModeSwitch}
                        onChange={switchTheme}
                    />
                </Stack>

            </Stack>
        </Container>
    );

}

function MenuButton({theme, item, setSelected, selected}) {
    function handleClick() {
        setSelected(item);
    }

    return (
        <Button
            style=
                {{
                    textTransform: 'none',
                    backgroundColor: selected ? allThemes[theme.mode].palette.menu.selected : allThemes[theme.mode].palette.menu.button,
                    justifyContent: "flex-start"
                }}
            variant='contained'
            disableElevation={true}
            onClick={handleClick}
        >
            {
                menuItems[item].Icon
            }
            <Typography variant={'h9'}>{item}</Typography>
        </Button>
    )
}


export default function SettingsDialog({handleClose, open}) {
    const theme = useSelector((state) => state.siteData.theme);
    const [selected, setSelected] = useState('Account');

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            sx={
                {
                    "& .MuiPaper-root":
                        {backgroundColor: "menu.settings",},
                }
            }
        >
            <Stack
                maxWidth="md"
                direction="row"
                useFlexGap
                divider={<Divider flexItem orientation="vertical" variant="middle"/>}
                spacing={4}
                sx={{m: 2, xs: 1, sm: 2}}
            >
                <Stack
                    spacing={1}
                    divider={<Divider flexItem variant="middle"/>}
                >
                    {
                        Object.keys(menuItems).map((key, index) => {
                            return (
                                <MenuButton theme={theme} item={key} setSelected={setSelected}
                                            selected={selected === key} key={'setting-' + index}/>
                            );
                        })
                    }

                </Stack>
                {
                    menuItems[selected].component
                }
            </Stack>
        </Dialog>
    );
}