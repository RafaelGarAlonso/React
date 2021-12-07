import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Stack, Image } from 'react-bootstrap';


export const LoginPage = () => {

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
            userLoginFetch(form.email, form.password);
        }
    }

    const findFormErrors = () => {
        const { email, password } = form;
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = 'Introduzca un correo electrónico';
        if ( !password || password === '' ) newErrors.password = 'Introduzca una contraseña';
        return newErrors;
    }

    const userLoginFetch = async (email, password) => {
        const resp = await fetch('http://localhost:3000/login', { method: 'POST', body: JSON.stringify({ email, password, nombre: null })});
        const { userLoginData } = await resp.json();
        console.log('DATA', userLoginData);
    }

    return (
        <Container fluid style={ { backgroundColor: '#e9e8e4' } }>
            <Form onSubmit={ onFormSubmit }>
                <Stack gap={2} className="col-md-5 mx-auto my-auto login-form">

                    <Row className="mb-3">
                        <Image className="mx-auto" style={{ maxWidth: '18rem' }} src="assets/logo-text.png" fluid />
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control onChange={ e => setField('email', e.target.value) } 
                                          type="email" 
                                          placeholder="Enter email" 
                                          isInvalid={ !!errors.email } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.email }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control onChange={ e => setField('password', e.target.value) } 
                                          type="password" 
                                          placeholder="Password" 
                                          isInvalid={ !!errors.password } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.password }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Recordar usuario" />
                    </Form.Group>

                    <Button  className="mx-auto" style={{ minWidth: '15.625rem', minHeight: '3.125rem' }} variant="primary" type="submit">
                        Acceder
                    </Button>

                </Stack>
            </Form>
        </Container>
    )
}
