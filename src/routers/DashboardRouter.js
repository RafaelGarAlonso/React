import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Navbar } from '../components/Navbar/Navbar';
import { Container } from 'react-bootstrap';

export const DashboardRouter = () => {
    return (
        <>
            <Navbar />
            <Container fluid style={ { backgroundColor: '#e9e8e4' } }>
                <Routes>
                    <Route path="/dashboard" element={ <Dashboard /> } />
                </Routes>
            </Container>
        </>
    )
}
