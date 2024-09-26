import {useSelector} from "react-redux";
import * as React from "react";
import {useMemo} from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {makeClassSelector} from "../../slices/classDataSlice";
import Typography from "@mui/material/Typography";
import Property from "../ContentComponents/PropertiesComponents/Property";
import AddPropertyMenu from "../ContentComponents/PropertiesComponents/AddPropertyMenu";


export default function ClassDialog({classID, open, handleClose}) {
    const classSelector = useMemo(makeClassSelector, [])

    const selectedClass = useSelector(state =>
        classSelector(state, classID)
    )

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleClose}
            sx={
                {
                    "& .MuiPaper-root":
                        {backgroundColor: "menu.settings",},
                }
            }
        >
            {
                classID ?
                    (<Stack
                        maxWidth="md"
                        useFlexGap
                        spacing={2}
                        sx={{p: 2}}
                    >
                        <Typography variant='h3'>{selectedClass.name}</Typography>
                        <Typography
                            variant='subtitle1'>{selectedClass.courseCode}</Typography>
                        <Divider/>
                        {
                            selectedClass.properties.map(prop => {
                                return (<Property id={prop.id} type={prop.type} classID={selectedClass.id}/>)
                            })
                        }
                        <AddPropertyMenu classID={selectedClass.id}/>
                    </Stack>) : (<div></div>)
            }
        </Dialog>
    )
}