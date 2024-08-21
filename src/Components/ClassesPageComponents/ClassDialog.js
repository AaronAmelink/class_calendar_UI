import {useSelector} from "react-redux";
import {useMemo} from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {makeClassSelector} from "../../slices/classDataSlice";
import Typography from "@mui/material/Typography";


export default function ClassDialog({classID, open, handleClose}) {
    const classSelector = useMemo(makeClassSelector, [])

    const selectedClass = useSelector(state =>
        classSelector(state, classID)
    )

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
            {
                classID ?
                    (<Stack
                        maxWidth="md"
                        useFlexGap
                        spacing={2}
                        sx={{p:2}}
                    >
                        <Typography variant='h3'>{ selectedClass.className }</Typography>
                        <Typography variant='subtitle1'>{ selectedClass.courseCode }</Typography>
                        <Divider/>
                    </Stack>) : (<div></div>)
            }
        </Dialog>
    )
}