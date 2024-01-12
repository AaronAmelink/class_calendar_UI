import {useEffect, useState} from "react";
import Document from './document';
import LogInPage from "./LogInPage";

function App(){
    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        setUserLogged(window.sessionStorage.getItem("authToken"));
    }, [window.sessionStorage.getItem("authToken")]);

    const RenderedPage = () => {
        if (!userLogged){
            return (<LogInPage/>);
        }
        else {
            return (<Document/>)
        }

    }


    return (
        <RenderedPage/>
    )
}

export default App;