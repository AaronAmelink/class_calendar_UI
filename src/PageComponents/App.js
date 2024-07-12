import {useEffect, useState} from "react";
import {Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./LogInPage";
import Document from "./document";
import ErrorPage from "./ErrorPage";
import DocumentPage from "./documentPage";
import documentManager from "../managment/documentManager";
function App(){
    const [userLogged, setUserLogged] = useState(window.sessionStorage.getItem("authToken") !== null);
    useEffect(() => {
        const authToken = window.sessionStorage.getItem("authToken");
        setUserLogged(authToken !== null);
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <LogInPage setLoggedin={setUserLogged}/>,
            errorElement: <ErrorPage/>
        },
        {
            path: '/page',
            element: <Document/>,
            children: [
                {
                    path: '/page/:pageID',
                    element: <DocumentPage/>,
                    loader: async ({params}) => {
                        return await documentManager.changePage(params.pageID);
                    }
                },
                {
                    path: '/page/classes',
                    element: <ErrorPage/>
                }
            ]
        }
    ]);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;