import React from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FAQComp.css';

const FAQComp = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="faq-section">
      <div className='faq-div p-4 p-sm-4 p-md-5'>

        <Row className="align-items-center">

          <Col md={5} className="faq-text mb-4 mb-md-0">
            <p className="small-text">HAVE QUESTIONS?</p>
            <h2 className="fw-bold">We’ve Got Answers</h2>
            <p className="text-muted">
              Find out more about our services and what to expect with our most frequently asked questions, or contact us.
            </p>
            <a
              href="/components/contactComp"
              className="contact-btn rounded-pill px-4 py-2 text-decoration-none"
            >Contact Us</a>

          </Col>

          <Col md={7}>
            <Accordion defaultActiveKey="1" flush className="faq-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header>What facial treatments do you offer at Flladé Skincare Clinic?</Accordion.Header>
                <Accordion.Body>
                  We specialize in a variety of advanced facial treatments, including deep-cleansing facials, hydrafacials, chemical peels, microneedling, LED light therapy, oxygen facials, and personalized skin analysis sessions designed to improve skin health and glow.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Are your facial treatments suitable for all skin types?</Accordion.Header>
                <Accordion.Body>
                  Yes, our treatments are suitable for all skin types, including sensitive, oily, dry, and acne-prone skin. Each session is tailored to your skin’s needs following a professional analysis by our skincare specialists.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>What should I expect during my first facial appointment?</Accordion.Header>
                <Accordion.Body>
                  During your first visit, we will conduct a thorough skin consultation to assess your skin type and concerns. Based on this evaluation, we’ll recommend the most suitable treatment to help you achieve your skincare goals.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>How many facial sessions will I need?</Accordion.Header>
                <Accordion.Body>
                  The number of sessions varies based on your skin condition and goals. For best results, we usually recommend a series of 4–6 treatments, spaced a few weeks apart. Your specialist will guide you on the ideal treatment plan.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Do the treatments require any downtime?</Accordion.Header>
                <Accordion.Body>
                  Most of our facial treatments are non-invasive and require no downtime. Some procedures like chemical peels or microneedling may cause mild redness or flaking, which typically subsides within a few days.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>Can I wear makeup after a facial treatment?</Accordion.Header>
                <Accordion.Body>
                  For optimal results, we recommend avoiding makeup for at least 24 hours after your facial to allow your skin to breathe and fully benefit from the treatment. Your specialist will provide specific aftercare instructions.
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FAQComp;
