import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import img from '../images/bookingImg.jpg';
import { useNavigate } from 'react-router-dom';
import './BookingFormComp.css';

const BookingFormComp = ({ onSignInClick }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');

  const [user, setUser] = useState(null);
  const [today] = useState(() => new Date().toISOString().split('T')[0]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
      slots.push(`${String(hour).padStart(2, '0')}:30`);
    }
    slots.push('20:00');
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      firstName,
      lastName,
      phone,
      date,
      time,
      service,
      userEmail: user?.email || '',
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bookings`, bookingData);
      setAlertMessage('Your appointment has been booked successfully!');
      setAlertVariant('success');
      setFirstName('');
      setLastName('');
      setPhone('');
      setDate('');
      setTime('');
      setService('');
    } catch (error) {
      console.error('Booking error:', error);
      setAlertMessage('Failed to book appointment. Please try again.');
      setAlertVariant('danger');
    }
  };

  return (
    <Container fluid className="booking-container bg-light pb-5">
      <div className="text-center">
        <h2 className="fw-bold">Book an Appointment</h2>
        <p className="text-muted">Your journey to glowing, healthy skin starts here</p>
      </div>
      <Row className="booking-row align-items-stretch g-0">
        {/* Image Column */}
        <Col md={6} className="d-flex">
          <Card className="border-0 shadow-sm w-100 h-100 booking-img-card">
            <Card.Img
              src={img}
              alt="Booking illustration"
              className="booking-img"
            />
          </Card>
        </Col>

        {/* Form Column */}
        <Col md={6} className="d-flex flex-column">
          <Card className="p-2 p-md-4 shadow-sm w-100 flex-grow-1 d-flex flex-column justify-content-center">
            {!user && (
              <Alert variant="warning" className="text-center">
                Please{' '}
                <span
                  className="text-primary text-decoration-underline"
                  onClick={onSignInClick}
                  style={{ cursor: 'pointer' }}
                >
                  sign in
                </span>{' '}
                to book an appointment.
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
                    disabled={!user}
                    maxLength={30}
                    pattern="[A-Za-z\s]+"
                    title="Only letters are allowed"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    required
                    disabled={!user}
                    maxLength={30}
                    pattern="[A-Za-z\s]+"
                    title="Only letters are allowed"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center border rounded px-2">
                  <span className="me-1">+355</span>
                  <Form.Control
                    type="tel"
                    className="w-100 border-0 shadow-none flex-grow-1"
                    placeholder="Enter 9-digit number"
                    required
                    disabled={!user}
                    maxLength="9"
                    pattern="\d{9}"
                    aria-label="Phone Number"
                    value={phone}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, '');
                      if (input.length <= 9) {
                        setPhone(input);
                      }
                    }}
                  />
                </div>
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    className="pe-0"
                    type="date"
                    min={today}
                    required
                    disabled={!user}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Select
                    className="w-100"
                    required
                    disabled={!user}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Time</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Form.Group className="mb-4">
                <Form.Select
                  required
                  disabled={!user}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Select a Service</option>
                  {[
                    'Chemical Peeling',
                    'HydraFacial',
                    'LED Light Therapy',
                    'Mesotherapy',
                    'Microneedling',
                    'Oxygen Facial',
                  ].map((svc, idx) => (
                    <option key={idx} value={svc}>
                      {svc}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="dark" type="submit" className="w-100" disabled={!user}>
                Confirm Booking
              </Button>
              {alertMessage && (
                <Alert variant={alertVariant} className="mt-3 text-center">
                  {alertMessage}
                </Alert>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingFormComp;