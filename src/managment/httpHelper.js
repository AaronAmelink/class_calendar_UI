const url = 'http://localhost:8080';

class HttpHelper {
    async getPages() {
        try {
            // noinspection UnnecessaryLocalVariableJS
            const response = (await fetch(url + "/api/data/getPages", {
                headers: {"Authorization": window.sessionStorage.getItem("authToken")},
            })).json()
            return response;
        } catch (e) {
            console.log(e);
            return ([]);
        }
    }

    async getChildPages(parentID) {
        try {
            // noinspection UnnecessaryLocalVariableJS
            const response = (await fetch(url + "/api/data/getChildPages", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Authorization": window.sessionStorage.getItem("authToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({parent_id: parentID})
            })).json();
            return response;
        } catch (e) {
            console.log(e);
            return ([]);
        }
    }

    async getPage(pageID) {
        try {
            // noinspection UnnecessaryLocalVariableJS
            const response = (await fetch(url + `/api/data/getPage/${pageID}`, {
                headers: {
                    "Authorization": window.sessionStorage.getItem("authToken"),
                }
            })).json();
            return response;
        } catch (e) {
            console.log(e);
            return ({});
        }
    }


    async addNewPage(referenceID, newID) {
        try {
            const response = await fetch(url + "/api/data/addNewPage", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Authorization": window.sessionStorage.getItem("authToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({page_name: "New Page", parent_id: referenceID, new_page_id: newID})
            })
            return response.json();
        } catch (e) {
            console.log(e);
            return ("error fetching");
        }
    }

    async submitChanges(updateObj) {
        try {
            const response = await fetch(url + "/api/data/updatePage", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Authorization": window.sessionStorage.getItem("authToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({pageUpdates: updateObj})
            })
            return response.json();
        } catch (e) {
            console.log(e);
            return ("error fetching");
        }
    }

    async loginRequest(email, password) {
        try {
            const response = await fetch(url + "/api/user/login", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({email: email, password: password}), // body data type must match "Content-Type" header
            });
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }


    async registerRequest(userName, email, password) {
        try {
            const response = await fetch(url + "/api/user/addUser", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({email: email, password: password, userName}), // body data type must match "Content-Type" header
            });
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }
}


const httpHelper = new HttpHelper();
export default httpHelper;



