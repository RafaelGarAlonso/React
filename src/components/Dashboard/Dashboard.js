import { Container, Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';

export const Dashboard = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <Container>
            <Row>
                <h3 className="mb-4">Sesión iniciada: {user}</h3>
            </Row>

            <Row>
            <Col sm={4}>
                <Card title = 'Ejemplo 01'
                       quantity = '20' 
                />
            </Col>
            <Col sm={4}>
                <Card title = 'Ejemplo 01'
                      quantity = '20' 
                />
            </Col>
            <Col sm={4}>
                <Card title = 'Ejemplo 01'
                      quantity = '20' 
                />
            </Col>
            </Row>
        </Container>
    )
}
