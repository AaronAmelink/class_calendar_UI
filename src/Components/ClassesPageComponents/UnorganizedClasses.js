import Box from "@mui/material/Box";
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ClassChip from "./ClassChip";
import Stack from "@mui/material/Stack";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ClassDialog from "./ClassDialog";
import {setIsLookingAtClass} from "../../slices/siteDataSlice";

function CenteredChip({code, id, handleClick}) {
    return (
        <Grid item xs='auto'>
            <Box
                justifyContent="center"
                alignItems="center">
                <ClassChip code={code} id={id} handleClick={handleClick}/>
            </Box>
        </Grid>

    )
}

export default function UnorganizedClasses() {
    const classes = useSelector((state) => state.classData.classes);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedClassID, setSelectedClassID] = useState(null);
    const dispatch = useDispatch();

    function handleDialogClose() {
        setDialogOpen(false);
        dispatch(setIsLookingAtClass(false));
    }

    function handleChipClick(courseID) {
        setSelectedClassID(courseID);
        setDialogOpen(true);
        return courseID;
    }

    return (
        <Paper elevation={0}
               variant='outlined'
               sx={{bgcolor: 'background.elevated', boxShadow: 5, width: 1, height: 1}}
               display="flex"
               justifyContent="center"
               alignItems="center">
            <ClassDialog classID={selectedClassID} handleClose={handleDialogClose} open={dialogOpen}/>
            <Stack container sx={{height: 1}} divider={<Divider variant={'middle'}/>}>
                <Box
                    sx={{width: 1, height: 1 / 8, my: 2}}
                    display="flex"
                    justifyContent="center"
                >
                    <Typography variant='h5' sx={{fontStyle: 'italic'}}>Unorganized Classes</Typography>
                </Box>
                <Grid container columnSpacing={2} rowSpacing={1} display="flex"
                      justifyContent="center"
                      sx={{overflow: 'auto', height: 1 / 1.4, my: 2}}>
                    {
                        classes.map(classItem => {
                            console.log(classItem);
                            if (classItem.properties.length === 0 || !classItem.properties.find(property => property && property.name === 'planned')) {
                                return (<CenteredChip
                                    code={classItem.courseCode ?? classItem.name}
                                    id={classItem.id}
                                    handleClick={handleChipClick}/>);
                            } else {
                                return null;
                            }
                        })
                    }
                </Grid>
            </Stack>
        </Paper>
    )
}