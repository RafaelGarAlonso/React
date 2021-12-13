const registrarMedicoFetch = (name, email, password, role) => {
    return fetch('http://localhost:3000/api/medicos/', { 
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

const registrarPacienteFetch = (name, email, password, role) => {
    return fetch('http://localhost:3000/api/pacientes', { 
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

const accesoMedicoFetch = (email, password) => {
    return fetch('http://localhost:3000/api/login/medico', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })})
    .then( response => {
        return response.json().then((data) => {
            localStorage.setItem('user', JSON.stringify(data.name));
            localStorage.setItem('id', JSON.stringify(data.id));
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('menu', JSON.stringify(data.menu));
            return data;
        });
    });
}

const accesoPacienteFetch = (email, password) => {
    return fetch('http://localhost:3000/api/login/paciente', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })})
    .then( response => {
        return response.json().then((data) => {
            localStorage.setItem('user', JSON.stringify(data.name));
            localStorage.setItem('id', JSON.stringify(data.id));
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('menu', JSON.stringify(data.menu));
            return data;
        });
    });
}

const getMedicosFetch = (desde, limit) => {
    return fetch(`http://localhost:3000/api/medicos?desde=${desde}&limite=${limit}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-token': getToken()
        }})
    .then( response => {
        return response.json().then((data) => {
            return data;
        });
    });
}

function getToken() {
    return localStorage.getItem('token');
}

export {   
    registrarMedicoFetch, 
    registrarPacienteFetch, 
    accesoMedicoFetch, 
    accesoPacienteFetch,
    getMedicosFetch
};