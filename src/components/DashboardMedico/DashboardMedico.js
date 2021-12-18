import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';
import { VerticalModal } from '../VerticalModal/VerticalModal';
import { DataTable } from '../DataTable/DataTable';
import { ScreenSpinner } from '../ScreenSpinner/ScreenSpinner';
import { getMedicsFetch, getPatientsFetch } from '../../services/GlobalServices';

export const DashboardMedico = () => {

    const [ totalMedics, setTotalMedicos ] = React.useState(0);
    const [ totalPatients, setTotalPacientes ] = React.useState(0);
    const [ showSpinner, setShowSpinner ] = React.useState(false);
    const [ modalTitle, setModalTitle] = React.useState('');
    const [ modalText, setModalText] = React.useState('');
    const [ modalShow, setModalShow] = React.useState(false);
    const dataTableHeaders = ['#', 'Nombre', 'Apellidos', 'Email'];
    const [ dataTableRows, setDataTableRows ] = React.useState([]);
    
    useEffect(() => {
        getMedicos();
    }, []);
    
    const listCards = [
        {
            title: 'PACIENTES REGISTRADOS',
            quantity: totalPatients,
            icon: 'table',
            iconColor: 'icon-blue'
        },
        {
            title: 'MÉDICOS DISPONIBLES',
            quantity: totalMedics,
            icon: 'table',
            iconColor: 'icon-green'
        },
        {
            title: 'CITAS GENERADAS',
            quantity: 20,
            icon: 'table'
        }
    ]

    const getMedicos = () => {
        setShowSpinner(true);
        getMedicsFetch(0, 0).then(resp => {
            if (resp.ok) {
                setTotalMedicos(resp.total);
                getPacientes();
            } else {
                setShowSpinner(false);
                printModal({title: 'Error inesperado', text: resp.msg});
            }
        });
    }
    
    const getPacientes = () => {
        getPatientsFetch(0, 10).then(resp => {
            if (resp.ok) {
                setShowSpinner(false);
                setDataTableRows(resp.pacientes);
                setTotalPacientes(resp.total);
            } else {
                setShowSpinner(false);
                printModal({title: 'Error inesperado', text: resp.msg});
            }
        });
    }

    const printModal = ({title, text}) => {
        setModalTitle(title);
        setModalText(text);
        setModalShow(true);
    }

    const getRowId = (id) =>{
        return;
    }

    return (
        <>
            <Container>
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
                    <h2 className="mb-4">Últimos pacientes registrados</h2>
                    <DataTable headers = { dataTableHeaders }
                               rows = { dataTableRows }
                               parentCallback = { getRowId }>
                    </DataTable>
                </Row>
            </Container>

            <ScreenSpinner show = { showSpinner }></ScreenSpinner>

            <VerticalModal 
                show = { modalShow } 
                title = { modalTitle } 
                text = { modalText }
                onHide = { () => setModalShow(false) } 
            />
        </>
    )
}
