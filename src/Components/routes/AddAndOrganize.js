import AddNewClassMenu from "../ClassesPageComponents/AddNewClassMenu";
import {Button, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import UnorganizedClasses from "../ClassesPageComponents/UnorganizedClasses";
import OrganizedClasses from "../ClassesPageComponents/OrganizedClasses";
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function AddAndOrganize() {

    return (
        <Box sx={{p: 3, height: 1}}>
            <Grid container spacing={2} sx={{height: '90vh'}}>
                <Grid item xs={6} sx={{height: 5 / 12}}>
                    <AddNewClassMenu/>
                </Grid>
                <Grid item xs={6} sx={{height: 5 / 12}}>
                    <UnorganizedClasses/>
                </Grid>
                <Grid item xs={12} sx={{height: 6 / 12}}>
                    <OrganizedClasses/>
                </Grid>
                <Grid item xs={12} sx={{height: 1 / 20, pr: 1, width: 1}} container justifyContent="flex-end"
                >
                    <Button variant='contained' color='secondary' sx={{width: 1 / 12}} justifyContent="flex-end"
                            startIcon={<ShuffleIcon/>}>
                        Autosort
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}