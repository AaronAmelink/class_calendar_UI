import Box from "@mui/material/Box";
import { Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ClassChip from "./ClassChip";
import Stack from "@mui/material/Stack";
import {useSelector} from "react-redux";
import StackItem from "../ContentComponents/StackItem";


function CenteredChip({code, id}) {
    return (
        <Grid item xs='auto'>
            <Box
                justifyContent="center"
                alignItems="center">
                <ClassChip code={code} id={id}/>
            </Box>
        </Grid>

    )
}

export default function UnorganizedClasses() {
    const classes = useSelector((state) => state.classData.classes);


    return (
        <Paper elevation={0}
               variant='outlined'
               sx={{bgcolor:'background.elevated', boxShadow:5, width:1, height:1}}
               display="flex"
               justifyContent="center"
               alignItems="center">
            <Stack container sx={{height:1}} divider={<Divider variant={'middle'}/>}>
                <Box
                    sx={{width:1, height:1/8, my:2}}
                    display="flex"
                    justifyContent="center"
                >
                    <Typography variant='h5' sx={{ fontStyle: 'italic' }}>Unorganized Classes</Typography>
                </Box>
                <Grid container columnSpacing={2} rowSpacing={1} display="flex"
                      justifyContent="center"
                      sx={{overflow: 'auto', height:1/1.4, my:2}}>
                    {
                        classes.map(classItem => {
                            return(<CenteredChip code={classItem.courseCode} id={classItem.id}/>);
                        })
                    }
                </Grid>
            </Stack>
        </Paper>
    )
}