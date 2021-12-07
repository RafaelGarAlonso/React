import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Stack, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const LoginPage = () => {

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState({});

    const setField = (field, value) => {
        setForm( { ...form, [field]: value });
        if ( !!errors[field] ) setErrors({ ...errors, [field]: null });
    }
    

    const onFormSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
        } else {
            userLoginFetch(form.email, form.password).then(response => {
                const action = {
                    type: types.login,
                    payload: { name: 'Fernando' }
                }
                
                dispatch(action);
    
                const lastPath = localStorage.getItem('lastPath') || '/dashboard';
    
                navigate( lastPath, {
                    replace: true
                });
            });
        }
    }

    const findFormErrors = () => {
        const { email, password } = form;
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = 'Introduzca un correo electrónico';
        if ( !password || password === '' ) newErrors.password = 'Introduzca una contraseña';
        return newErrors;
    }

    const userLoginFetch = (email, password) => {
        return fetch('http://localhost:3000/login', { method: 'POST', body: JSON.stringify({ email, password })}).then( response => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    const registerPageRedirect = () => {
        navigate('/registro', {
            replace: true
        });
    }

    return (
        <Container fluid style={ { backgroundColor: '#e9e8e4' } }>
            <Form onSubmit={ onFormSubmit }>
                <Stack gap={2} className="col-md-4 mx-auto my-auto login-form">

                    <Row className="mb-2">
                        <Image className="mx-auto" style={{ maxWidth: '16rem' }} src="assets/logo-login.png" fluid />
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control onChange={ e => setField('email', e.target.value) } 
                                          type="email" 
                                          placeholder="Email" 
                                          isInvalid={ !!errors.email } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.email }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control onChange={ e => setField('password', e.target.value) } 
                                          type="password" 
                                          placeholder="Contraseña" 
                                          isInvalid={ !!errors.password } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.password }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Recordar usuario" />
                    </Form.Group>

                    <Button  className="mx-auto" style={{ minWidth: '10rem', minHeight: '3rem' }} variant="primary" type="submit">
                        Acceder
                    </Button>

                    <Row className="mt-4 mx-left">
                        <div style={{ display: 'flex', alignItems: 'center' }} className="my-auto">
                            ¿No tienes cuenta? 
                            <Button variant="link" 
                                    style={{ maxWidth: '50%', padding: '0.2rem' }} 
                                    onClick= { registerPageRedirect }> Registrarse 
                            </Button>
                        </div>
                    </Row>
    
                </Stack>
            </Form>
        </Container>
    )
}
