import '../App.css';
import Container from '@mui/material/Container';
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./TopBar";
import { useEffect } from "react";
import allThemes from "../theme";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function Document() {
    const params = useParams() //pageID: number
    const navigate = useNavigate();
    const theme = useSelector((state) => state.siteData.theme);

    useEffect(() => {
        if (window.sessionStorage.getItem("authToken") === null) {
            console.log('not logged in... redirecting');
            navigate('/');
        }
    });

    return (
        <div>
            <ThemeProvider theme={allThemes[theme]}>
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
