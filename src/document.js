import './App.css';
import Container from '@mui/material/Container';
import {CssBaseline, ThemeProvider} from "@mui/material";
import DocumentPage from "./PageComponents/documentPage";
import TopBar from "./TopBar";
import {useEffect, useState} from "react";
import allThemes from "./theme";
import DocumentManager from "./managment/documentManager";
import stateManager from "./managment/stateManager";

function Document(props) {
    const [currentTab, setCurrentTab] = useState(stateManager.tab);
    const [ignored, forceUpdate] = useState(false);

    const onPageUpdate = () => { //force a rerender. not BEST practice, but works for the scope of the project
        forceUpdate(!ignored);
    }

    useEffect(() => {
        setCurrentTab(stateManager.tab);
    }, []);

    const renderContent = () => {
        switch (currentTab) {
            case "document":
                return <DocumentPage onPageUpdate={onPageUpdate}/>;
            case "settings":
            case "login":
            default:
                return <h1>hello</h1>;
        }
    };


    return (
        <div>
            <ThemeProvider theme={allThemes.dark}>
                <CssBaseline/>
                <Container maxWidth={false} disableGutters={true}>
                    <TopBar pageID={DocumentManager.currentPage._id} onPageUpdate={onPageUpdate}/>
                    {renderContent()}
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Document;
