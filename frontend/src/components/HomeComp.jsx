import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from '../images/imghome.png';
import img from '../images/imag.png'
import './HomeComp.css';

const HomeComp = ({ onBookClick }) => {
  return (
    <div>
      <Container fluid className="hero-section px-3 px-md-4 px-lg-5">
        <Row className='align-items-center'>
          <Col lg={6} md={6} className="hero-image order-md-1 order-2 mt-3">
            <Image src={img} alt="Skin care treatment" fluid className="treatment-image" />
          </Col>

          <Col lg={5} md={6} className="text-hero-section order-md-2 order-1">
            <div className="logo-container mb-3 mb-md-4 text-center">
              <img src={logo} alt="Clad Skincare Clinic" className="clinic-logo" />
            </div>

            <div className="text-group text-center">
              <Link
                to="/bookingFormComp"
                className="hero-btn btn-lg fw-bold py-3 px-4 mb-4"
                onClick={(e) => {
                  e.preventDefault();
                  onBookClick();
                }}
              >
                Book a Consultation
              </Link>

              <p className="description">
                At Flladé Skincare Clinic, we combine medical expertise with luxurious care to help you achieve healthy, radiant skin.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="end-row p-2">
        <Row className="feature-row d-flex justify-content-center flex-wrap">
          {[
            { icon: "fa-user-md", text: "Board-Certified Dermatologists" },
            { icon: "fa-microscope", text: "Medical-Grade Treatments" },
            { icon: "fa-sliders-h", text: "Customized Skin Plans" },
            { icon: "fa-award", text: "Clinical Excellence" }
          ].map((item, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={3}
              className="feature-col d-flex justify-content-center px-2 my-1"
            >
              <div className="feature-item d-flex justify-content-center align-items-center bg-white w-100">
                <i className={`fas ${item.icon} feature-icon`}></i>
                <span className="feature-text">{item.text}</span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default HomeComp