import {useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import AddNewClassMenu from "../ClassesPageComponents/AddNewClassMenu";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Grid, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UnorganizedClasses from "../ClassesPageComponents/UnorganizedClasses";
import Stack from "@mui/material/Stack";
import ColorPicker from "./ColorPicker";

export default function AddAndOrganize(props) {
    const data = useLoaderData();
    const currentTab = useSelector((state) => state.siteData.currentClassTab);

    return (
        <Box sx={{p:3, height:1}}>
            <Grid container spacing={2} sx={{height:'90vh'}}>
                <Grid item xs={6} sx={{height:1/3}}>
                    <AddNewClassMenu/>
                </Grid>
                <Grid item xs={6} sx={{height:1/3}}>
                    <UnorganizedClasses/>
                </Grid>
            </Grid>
        </Box>
    );
}