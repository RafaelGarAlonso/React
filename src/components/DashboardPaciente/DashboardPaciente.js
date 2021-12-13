import React from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ScreenSpinner } from '../ScreenSpinner/ScreenSpinner';

export const DashboardPaciente = () => {

    const [ dashboardInfo, setDashboardInfo ] = React.useState({});
    const [ showSpinner, setShowSpinner ] = React.useState(false);

    useEffect(() => {
       console.log('LANZAR SERVICIO')
    }, [ dashboardInfo ]);

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
            <Container>
                <Row>
                    <h3 className="mb-5">Sesión iniciada: {user}</h3>
                </Row>

                <Row>
                    <h1>PANEL PACIENTE</h1>
                </Row>
            </Container>

            <ScreenSpinner show = {showSpinner}></ScreenSpinner>
        </>
    )
}
