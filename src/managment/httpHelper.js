const {axios} = require('axios');

class httpHelper{

    constructor() {
        if (!httpHelper.instance){
            httpHelper.instance = this;
        }

        return httpHelper.instance;
    }

    async getPages(){
        try {
            const response = (await fetch("http://localhost:5050/api/data/getPages", {
                headers: {"Authorization": window.sessionStorage.getItem("authToken")},
            })).json()
            return response;
        }
        catch (e){
            console.log(e);
            return ("error fetching");
        }
    }

    async loginRequest(email, password) {
        try {
            const response = await fetch("http://localhost:5050/api/user/login", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({email : email , password: password}), // body data type must match "Content-Type" header
            });
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }


    async registerRequest(userName, email, password){
        try{
            const response = await fetch("http://localhost:5050/api/user/addUser", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({email : email , password: password, userName}), // body data type must match "Content-Type" header
            });
            return response.json();
        }
        catch (e){
            console.log(e);
        }
    }




}

const instance = new httpHelper();
module.exports = instance;