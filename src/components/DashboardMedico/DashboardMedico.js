import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { VerticalModal } from '../VerticalModal/VerticalModal';
import { DataTable } from '../DataTable/DataTable';
import { ScreenSpinner } from '../ScreenSpinner/ScreenSpinner';
import { getMedicosFetch } from '../../services/GlobalServices';

export const DashboardMedico = () => {

    const [totalMedicos, setTotalMedicos ] = React.useState(0);
    const [dashboardInfo, setDashboardInfo ] = React.useState({});
    const [showSpinner, setShowSpinner ] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState('');
    const [modalText, setModalText] = React.useState('');
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        setShowSpinner(true);
        getMedicosFetch(0, 0).then(resp => {
            if (resp.ok) {
                setTotalMedicos(resp.total);
                setShowSpinner(false);
            } else {
                printModal({title: 'Error inesperado', text: resp.msg});
            }
        });
    }, [ dashboardInfo ]);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const listCards = [
        {
            title: 'PACIENTES REGISTRADOS',
            quantity: 20,
            icon: 'table',
            iconColor: 'icon-blue'
        },
        {
            title: 'MÉDICOS DISPONIBLES',
            quantity: totalMedicos,
            icon: 'table',
            iconColor: 'icon-green'
        },
        {
            title: 'CITAS GENERADAS',
            quantity: 20,
            icon: 'table'
        }
    ]

    const printModal = ({title, text}) => {
        setModalTitle(title);
        setModalText(text);
        setModalShow(true);
    }

    return (
        <>
            <Container>
                <Row>
                    <h3 className="mb-5">Sesión iniciada: {user}</h3>
                </Row>

                <Row>
                    { 
                        listCards.map((card, key) => {
                            return  <Col xl={4} key = { key }>
                                        <Card title     = { card.title }
                                            quantity  = { card.quantity }
                                            icon      = { card.icon }
                                            iconColor = { card.iconColor }>
                                        </Card>
                                    </Col>
                        })
                    }
                </Row>

                <Row className="mt-5">
                    <h2>Últimos pacientes registrados</h2>
                    <DataTable />
                </Row>
            </Container>

            <ScreenSpinner show = {showSpinner}></ScreenSpinner>

            <VerticalModal 
                show = { modalShow } 
                title = { modalTitle } 
                text = { modalText }
                onHide = { () => setModalShow(false) } 
            />
        </>
    )
}
