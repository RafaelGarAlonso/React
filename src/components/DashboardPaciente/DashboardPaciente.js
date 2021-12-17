import React from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ScreenSpinner } from '../ScreenSpinner/ScreenSpinner';

export const DashboardPaciente = () => {

    const [ dashboardInfo, setDashboardInfo ] = React.useState({});
    const [ showSpinner, setShowSpinner ] = React.useState(false);

    return (
        <>
            <Container>
                <Row>
                    <h3 className="mb-5">Sesión iniciada:</h3>
                </Row>

                <Row>
                    <h1>PANEL PACIENTE</h1>
                </Row>
            </Container>

            <ScreenSpinner show = {showSpinner}></ScreenSpinner>
        </>
    )
}
