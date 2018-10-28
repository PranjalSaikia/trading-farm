import AuthService from './../auth_components/js/AuthService';


export function PostData(type, userData) {
    let Auth = new AuthService();
    let BaseURL = 'http://192.168.43.157/trading/';
    //let BaseURL = 'http://test.corexx.in/trading/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
                'Unit': '1'
            }
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export function GetData(type) {
    let Auth = new AuthService();
    let BaseURL = 'http://192.168.43.157/trading/';
    //let BaseURL = 'http://test.corexx.in/trading/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
                'Unit': '1'
            }
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}



export function PostFormData(type, userData) {
    let Auth = new AuthService();
    let BaseURL = 'http://192.168.43.157/trading/';
    //let BaseURL = 'http://test.corexx.in/trading/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
                'Unit': '1'
            }
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}