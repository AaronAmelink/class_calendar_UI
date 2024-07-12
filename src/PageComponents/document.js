import '../App.css';
import Container from '@mui/material/Container';
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./TopBar";
import { useEffect } from "react";
import allThemes from "../theme";
import {Outlet, useNavigate, useParams} from "react-router-dom";

function Document() {
    const params = useParams() //pageID: number
    const navigate = useNavigate();

    useEffect(() => {
        if (window.sessionStorage.getItem("authToken") === null) {
            navigate('/');
        }
    });

    return (
        <div>
            <ThemeProvider theme={allThemes.dark}>
                <CssBaseline/>
                <Container maxWidth={false} disableGutters={true}>
                    <TopBar pageID={params.pageID}/>
                    <Outlet/>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Document;
