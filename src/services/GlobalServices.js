const registerMedicFetch = (name, email, password, role) => {
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

const registerPatientFetch = (name, email, password, role) => {
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

const accessMedicFetch = (email, password) => {
    return fetch('http://localhost:3000/api/login/medico', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })})
    .then( response => {
        return response.json().then((data) => {
            localStorage.setItem('token', JSON.stringify(data.token));
            return data;
        });
    });
}

const accessPatientFetch = (email, password) => {
    return fetch('http://localhost:3000/api/login/paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })})
    .then( response => {
        return response.json().then((data) => {
            localStorage.setItem('token', JSON.stringify(data.token));
            return data;
        });
    });
}

const getMedicsFetch = (from, limit) => {
    return fetch(`http://localhost:3000/api/medicos?from=${from}&limit=${limit}`, {
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

const getPatientsFetch = (from, limit) => {
    return fetch(`http://localhost:3000/api/pacientes?from=${from}&limit=${limit}`, {
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

const updateMedic = (name, email, address, province, surname, gender_selector, uid) => {
    return fetch(`http://localhost:3000/api/medicos/${uid}`, { 
        method: 'PUT',
        body: JSON.stringify({ name, email, address, province, surname, gender: gender_selector }),
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

const updatePatient = (name, email, address, province, surname, gender_selector, uid) => {
    return fetch(`http://localhost:3000/api/pacientes/${uid}`, { 
        method: 'PUT',
        body: JSON.stringify({ name, email, address, province, surname, gender: gender_selector }),
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
    registerMedicFetch, 
    registerPatientFetch, 
    accessMedicFetch, 
    accessPatientFetch,
    getMedicsFetch,
    getPatientsFetch,
    updateMedic,
    updatePatient
};