import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardMedico } from '../components/DashboardMedico/DashboardMedico';
import { DashboardPaciente } from '../components/DashboardPaciente/DashboardPaciente';
import { Profile } from '../components/Profile/Profile';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ListPatients } from '../components/ListPatients/ListPatients';
import { Patient } from '../components/Patient/Patient';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../auth/authContext';

export const DashboardRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <Container fluid style={ { height: '100%', backgroundColor: '#e9e8e4', display: 'flex', padding: '0', minHeight: '100vh' } }>
            <Sidebar />
            <div className="wrapper" style={ { padding: '10px', width: '100%' } }>
                <Navbar />
                    <h3 className="mb-5">Sesión iniciada: {user.name}</h3>

                {
                    user.role === 'ADMIN' ? 
                <Routes>
                    <Route path="/dashboard" element={ <DashboardMedico /> } />
                </Routes>
                :
                <Routes>
                    <Route path="/dashboard" element={ <DashboardPaciente /> } />
                </Routes>
                }

                <Routes>
                    <Route path="/perfil" element={ <Profile /> } />
                </Routes>

               <Routes>
                    <Route exact path="/pacientes" element={ <ListPatients /> } />
                </Routes>

                <Routes>
                    <Route exact path="/pacientes/:id" element={ <Patient /> } />
                </Routes>

                {/*<Routes>
                    <Route path="/estadisticas*" element={ <Dashboard /> } />
                </Routes>

                <Routes>
                    <Route path="/*" element={ <Dashboard /> } />
                </Routes> */}
            </div>
        </Container>
    )
}
