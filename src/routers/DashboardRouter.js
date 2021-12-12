import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Container } from 'react-bootstrap';

export const DashboardRouter = () => {
    return (
        <Container fluid style={ { position: 'absolute', height: '100%', backgroundColor: '#e9e8e4', display: 'flex', padding: '0' } }>
            <Sidebar />
            <div className="wrapper" style={ { padding: '10px', width: '100%' } }>
                <Navbar />
                <Routes>
                    <Route path="/dashboard" element={ <Dashboard /> } />
                </Routes>
            </div>
        </Container>
    )
}
