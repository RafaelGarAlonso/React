import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Stack, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { VerticalModal } from '../VerticalModal/VerticalModal';

export const RegisterPage = () => {

    const [modalTitle, setModalTitle] = React.useState('');
    const [modalText, setModalText] = React.useState('');
    const [modalShow, setModalShow] = React.useState(false);

    const navigate = useNavigate();

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
            userRegisterFetch(form.name, form.email, form.password).then( (resp) => {
                console.log('resp', resp);
                if (resp.ok) {
                    printModal({title: 'Usuario creado', text: 'Usuario creado con éxito'});
                } else {
                    printModal({title: 'Error inesperado', text: resp.msg});
                }
            });
        }
    }

    const findFormErrors = () => {
        const { name, email, password, confirmPassword } = form;
        const newErrors = {}
        if ( !name || name === '' ) newErrors.name = 'Introduzca un nombre';
        if ( !email || email === '' ) newErrors.email = 'Introduzca un correo electrónico';
        if ( !password || password === '' ) newErrors.password = 'Introduzca una contraseña';
        if ( !confirmPassword || confirmPassword === '' ) newErrors.confirmPassword = 'Confirme una contraseña';
        if ( confirmPassword !== password ) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        return newErrors;
    }

    const userRegisterFetch = (name, email, password) => {
        return fetch('http://localhost:3000/api/usuarios', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ nombre: name, email, password })
        })
        .then( response => {
            return response.json().then((data) => {
                return data;
            });
        });
    }

    const registerPageRedirect = () => {
        navigate('/login', {
            replace: true
        });
    }

    const printModal = ({title, text}) => {
        setModalTitle(title);
        setModalText(text);
        setModalShow(true);
    }

    return (
        <Container fluid style={ { backgroundColor: '#e9e8e4' } }>
            <Form onSubmit={ onFormSubmit }>
                <Stack gap={2} className="col-md-4 mx-auto my-auto login-form">

                    <Row className="mb-2">
                        <Image className="mx-auto" style={{ maxWidth: '16rem' }} src="assets/logo-register.png" fluid />
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={ e => setField('name', e.target.value) } 
                                          type="text" 
                                          placeholder="Nombre" 
                                          isInvalid={ !!errors.name } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.name }
                            </Form.Control.Feedback>
                        </Form.Group>
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
                                          placeholder="Introduce una contraseña" 
                                          isInvalid={ !!errors.password } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.password }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridConfirmPassword">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control onChange={ e => setField('confirmPassword', e.target.value) } 
                                          type="password" 
                                          placeholder="Confirmar contraseña" 
                                          isInvalid={ !!errors.confirmPassword } />

                            <Form.Control.Feedback type='invalid'>
                                { errors.confirmPassword }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Button  className="mx-auto mt-4" style={{ minWidth: '10rem', minHeight: '3rem' }} variant="primary" type="submit">
                        Registrarse
                    </Button>

                    <Row className="mt-4 mx-left">
                        <div style={{ display: 'flex', alignItems: 'center' }} className="my-auto">
                            ¿Ya tienes cuenta? 
                            <Button variant="link" 
                                    style={{ maxWidth: '50%', padding: '0.2rem' }} 
                                    onClick= { registerPageRedirect }> Accede aquí 
                            </Button>
                        </div>
                    </Row>

                </Stack>
            </Form>

            <VerticalModal 
                show = { modalShow } 
                title = { modalTitle } 
                text = { modalText }
                onHide = { () => setModalShow(false) } 
            />

        </Container>
    )
}
