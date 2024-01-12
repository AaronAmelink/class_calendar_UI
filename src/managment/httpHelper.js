const axios = require('axios');

class httpHelper{

    constructor() {
        if (!httpHelper.instance){
            httpHelper.instance = this;
        }

        return httpHelper.instance;
    }

    async loginRequest(email, password) {
        try {
            console.log("request sent");
            const response = await axios.post('localhost:5050/api/user/login',
                {
                    email: email,
                    password: password
                });
            console.log(response.json());
        } catch (e) {
            console.log(e);
        }
    }




}

const instance = new httpHelper();
module.exports = instance;