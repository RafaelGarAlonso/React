import { Container, Row, Col } from 'react-bootstrap';
import './Card.css'

export const Card = (props) => {
  return (
    <div className="card-container">
      <div className="card-body">
        <Row>
          <Col>
            <span className="info">
              {props.title}
            </span>
            <span className="info">
              {props.quantity}
            </span>
          </Col>
        </Row>
      </div>
    </div>
  )
}