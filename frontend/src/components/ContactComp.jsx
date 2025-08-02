import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactComp.css';

const ContactComp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('')

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("The message was sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.error || "Sending failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error.");
    }

    setLoading(false);
  };

  return (
    <Card className='contact-container'>
      <div className='contact-text d-flex flex-column align-items-center bg-body-tertiary'>
        <h1>Contact Us</h1>
        <p>Have something on your mind? Reach out to us anytime - whether it’s feedback, inquiries, or support. We’re committed to providing you with the care, attention, and answers you deserve.</p>
      </div>

      <Row className='contact-info  m-0'>
        <Col md={6} className='contact-us'>
          <h2>Get In Touch</h2>
          <p>We’d love to hear from you! Whether you have a question, need assistance, or want to book a treatment, feel free to get in touch.</p>

          <div className='d-flex mb-2'>
            <i className="fa-solid fa-location-dot my-2 mx-3 fs-2"></i>
            <div>
              <h4 className='mb-0'>Address</h4>
              <a href="https://www.google.com/maps?q=Tiranë" target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none">Tirana, Albania</a>
            </div>
          </div>

          <div className='d-flex mb-2'>
            <i className="fa-solid fa-phone my-2 mx-3 fs-4"></i>
            <div>
              <h4 className='mb-0'>Phone Number</h4>
              <a href="tel:+1234567890" className="text-dark text-decoration-none">+355-xxx-xxx-xxx</a>
            </div>
          </div>

          <div className='d-flex mb-2'>
            <i className="fa-solid fa-envelope my-2 mx-3 fs-4"></i>
            <div>
              <h4 className='mb-0'>E-Mail</h4>
              <a href="mailto:info@fllade.al" className="text-dark text-decoration-none">info@fllade.al</a>
            </div>
          </div>

          <hr />

          <div>
            <h3 className='mb-3'>Follow Us:</h3>
            <ul className="list-inline mb-5">
              <li className="list-inline-item"><a href="#" className='text-dark'><i className="fa-brands fa-instagram mx-2 fs-2"></i></a></li>
              <li className="list-inline-item"><a href="#" className='text-dark'><i className="fa-brands fa-facebook mx-2 fs-3"></i></a></li>
              <li className="list-inline-item"><a href="#" className='text-dark'><i className="fa-brands fa-tiktok mx-2 fs-3"></i></a></li>
              <li className="list-inline-item"><a href="#" className='text-dark'><i className="fa-brands fa-youtube mx-2 fs-3"></i></a></li>
              <li className="list-inline-item"><a href="#" className='text-dark'><i className="fa-brands fa-whatsapp mx-2 fs-2"></i></a></li>
            </ul>
          </div>
        </Col>

        <Col md={6} className='contact-form'>
          <h2>Send a Message</h2>

          <Form className='form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                name='name'
                placeholder="Full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                name='email'
                placeholder="E-mail address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant='primary'>
              {loading ? 'Sending...' : 'Submit'}
            </Button>
          </Form>

          {success && (
            <p style={{ fontSize: "0.9em", color: "#28a745", marginTop: "1rem" }}>
              {success}
            </p>
          )}
          {error && (
            <p style={{ fontSize: "0.9em", color: "red", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "1rem" }}>
            By submitting this form, you agree to the processing of your personal data in accordance with our <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </Col>

        <div className='map-section d-flex flex-column align-items-center '>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95868.06946289385!2d19.735421085341997!3d41.33328421940723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310470fac5db%3A0x40092af10653720!2sTiran%C3%AB%2C%20Albania!5e0!3m2!1sen!2s!4v1750537037823!5m2!1sen!2s"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </Row>
    </Card>
  );
};

export default ContactComp;
