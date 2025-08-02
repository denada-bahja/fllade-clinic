import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './ServicesDetails.css'

const ServicesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/services/${id}`)
      .then(res => setService(res.data))
      .catch(err => console.error("Error fetching service:", err));
  }, [id]);

  if (!service) return <p className="text-center mt-5">Loading service details...</p>;

  return (
    <Container className="service-details-container">
      <Card className="shadow-lg border-0">
        <Row className="g-0 service-details-row align-items-stretch">
          <Col md={6} className="d-flex">
            <Card.Img
              variant="top"
              src={service.image}
              alt={service.title}
              className="service-details-img"
            />
          </Col>
          <Col md={6} className="d-flex flex-column">
            <Card.Body className="d-flex flex-column justify-content-between p-4">
              <div>
                <Card.Title className="fw-bold fs-2 mb-3">{service.title}</Card.Title>
                <Card.Text className="s-desc text-muted">
                  {service.description}
                </Card.Text>
              </div>
              <Button
                variant="dark"
                className="w-100 mt-5"
                href="/components/bookingFormComp"
              >
                Book This Service
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Button
        className='my-5 bg-dark'
        onClick={() => navigate(-1)}
      ><i
        className="fa-solid fa-arrow-left pe-2"
      ></i>
        Go Back
      </Button>
    </Container>
  );
};

export default ServicesDetails;