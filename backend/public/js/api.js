const API = "http://localhost:3000";

function getToken() {
    return localStorage.getItem("token");
}

async function request(url, method = "GET", body = null) {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(API + url, options);

    return response.json();
}