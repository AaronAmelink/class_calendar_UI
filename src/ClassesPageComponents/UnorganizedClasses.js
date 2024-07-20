import Box from "@mui/material/Box";
import {Button, Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ClassChip from "./ClassChip";
import {Add} from "@mui/icons-material";
import Stack from "@mui/material/Stack";


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
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                    <CenteredChip code='CS 101' id='1'/>
                </Grid>
            </Stack>
        </Paper>
    )
}