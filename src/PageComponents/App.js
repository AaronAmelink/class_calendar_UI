import {useEffect, useState} from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./LogInPage";
import Document from "./document";
import ErrorPage from "./ErrorPage";
import ClassesPage from "./ClassesPage";
import EditPage from "./EditPage";
import pageURLs from "./pageURLs";
import {useDispatch, useSelector} from "react-redux";
import {
    addCurrentPageToPages,
    addPageToState, changePage,
    fetchPage,
    getPageID,
    removePage,
    setCurrentPage
} from "../slices/pageDataSlice";
import {unwrapResult} from "@reduxjs/toolkit";
function App(){
    const dispatch = useDispatch();
    const [,setUserLogged] = useState(window.sessionStorage.getItem("authToken") !== null);
    useEffect(() => {
        const authToken = window.sessionStorage.getItem("authToken");
        setUserLogged(authToken !== null);
    }, []);
    const pages = useSelector(state => state.pageData.pages);
    const lastAccessedPage = useSelector(getPageID);
    console.log('app rerender', lastAccessedPage);

    const router = createBrowserRouter([
        {
            path: pageURLs.login,
            element: <LogInPage setLoggedin={setUserLogged}/>,
            errorElement: <ErrorPage/>
        },
        {
            path: pageURLs.document,
            element: <Document/>,
            children: [
                {
                    path: pageURLs.page + '/:pageID',
                    element: <EditPage/>,
                    loader: async function({params}) {
                        if (params.pageID === lastAccessedPage) return null;
                        let newPageIndex = pages.findIndex(page => page._id === params.pageID);
                        console.log(params.pageID);
                        console.log(newPageIndex);
                        if (newPageIndex !== -1) {
                            //get child pages
                            let linkedPages = pages[newPageIndex].content.filter(content => content.type === 'page');
                            if (linkedPages.length > 0) {
                                for (const pageContent of linkedPages) {
                                    if (pages.findIndex(page => page._id === pageContent.linkedPageID) === -1) {
                                        console.log(`fetching ${pageContent.linkedPageID}`)
                                        let childPage = await dispatch(fetchPage({pageID: pageContent.linkedPageID}));
                                        dispatch(addPageToState(unwrapResult(childPage)));
                                    }
                                }
                            }
                            dispatch(changePage({newPageID: params.pageID}));
                        } else {
                            let wrappedResult = await dispatch(fetchPage({pageID: params.pageID}));
                            let newPage = unwrapResult(wrappedResult);
                            //get all child pages
                            let linkedPages = newPage.content.filter(content => content.type === 'page')
                            if (linkedPages.length > 0) {
                                for (const pageContent of linkedPages) {
                                    let childPage = await dispatch(fetchPage({pageID: pageContent.linkedPageID}));
                                    dispatch(addPageToState(unwrapResult(childPage)));
                                }
                            }
                            dispatch(setCurrentPage(newPage));
                        }
                        return null;
                    }
                },
                {
                    path: pageURLs.classes,
                    element: <ClassesPage/>
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