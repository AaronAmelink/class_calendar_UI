import AddNewClassMenu from "../ClassesPageComponents/AddNewClassMenu";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import UnorganizedClasses from "../ClassesPageComponents/UnorganizedClasses";
import OrganizedClasses from "../ClassesPageComponents/OrganizedClasses";
export default function AddAndOrganize() {

    return (
        <Box sx={{p:3, height:1}}>
            <Grid container spacing={2} sx={{height:'90vh'}}>
                <Grid item xs={6} sx={{height:1/3}}>
                    <AddNewClassMenu/>
                </Grid>
                <Grid item xs={6} sx={{height:1/3}}>
                    <UnorganizedClasses/>
                </Grid>
                <Grid item xs={12} sx={{height:2/3}}>
                    <OrganizedClasses/>
                </Grid>
            </Grid>
        </Box>
    );
}