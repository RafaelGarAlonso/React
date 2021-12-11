const userRegisterFetch = (name, email, password, role) => {
    return fetch('http://localhost:3000/api/usuarios', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
    })
    .then( response => {
        return response.json().then((data) => {
            return data;
        });
    });
}

const userLoginFetch = (email, password) => {
    return fetch('http://localhost:3000/api/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })})
    .then( response => {
        return response.json().then((data) => {
            sessionStorage.setItem('user', JSON.stringify(data.name));
            sessionStorage.setItem('id', JSON.stringify(data.id));
            sessionStorage.setItem('token', JSON.stringify(data.token));
            sessionStorage.setItem('menu', JSON.stringify(data.menu));
            return data;
        });
    });
}

export { userRegisterFetch, userLoginFetch };

