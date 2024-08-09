import {useSelector} from "react-redux";
import {useState} from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import * as React from "react";


export default function ClassDialog({classID}) {
    const selectedClass = useSelector((state) => state.classData.selectedClass);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            sx={
                { "& .MuiPaper-root":
                        { backgroundColor: "menu.settings", },
                }
            }
        >
            <Stack
                maxWidth="md"
                direction="row"
                useFlexGap
                divider={<Divider flexItem orientation="vertical" variant="middle"/>}
                spacing={4}
                sx={{m:2, xs: 1, sm: 2}}
            >
                <SideMenu theme={theme} setSelected={setSelected} selected={selected}/>
                {
                    menuItems[selected].component
                }
            </Stack>
        </Dialog>
    );

}