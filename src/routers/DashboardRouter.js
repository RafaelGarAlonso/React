import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardMedico } from '../components/DashboardMedico/DashboardMedico';
import { DashboardPaciente } from '../components/DashboardPaciente/DashboardPaciente';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Container } from 'react-bootstrap';

export const DashboardRouter = () => {

    const [ typeOfDashboard, setTypeOfDashboard ] = React.useState('ADMIN');

    useEffect(() => {
        const { title } = JSON.parse(localStorage.getItem('menu'));
        setTypeOfDashboard(title);
     }, [typeOfDashboard]);

    return (
        <Container fluid style={ { height: '100%', backgroundColor: '#e9e8e4', display: 'flex', padding: '0' } }>
            <Sidebar />
            <div className="wrapper" style={ { padding: '10px', width: '100%' } }>
                <Navbar />

                {
                    typeOfDashboard === 'ADMIN' ? 
                <Routes>
                <Route path="/dashboard" element={ <DashboardMedico /> } />
                </Routes>
                :
                <Routes>
                    <Route path="/dashboard" element={ <DashboardPaciente /> } />
                </Routes>
                }
{/* 
                <Routes>
                    <Route path="/perfil" element={ <Dashboard /> } />
                </Routes>

                <Routes>
                    <Route path="/pacientes*" element={ <Dashboard /> } />
                </Routes>

                <Routes>
                    <Route path="/citas*" element={ <Dashboard /> } />
                </Routes>

                <Routes>
                    <Route path="/estadisticas*" element={ <Dashboard /> } />
                </Routes> */}

                {/* <Routes>
                    <Route path="/*" element={ <Dashboard /> } />
                </Routes> */}
            </div>
        </Container>
    )
}
