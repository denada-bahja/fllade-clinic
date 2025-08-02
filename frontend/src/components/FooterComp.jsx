import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../images/footerLogo.png'
import './FooterComp.css'

const FooterComp = () => {
  return (
    <footer className="footer-comp text-white py-4">
      <Container>
        <Row>
          <Col xs={12} md={12} lg={4} className=" mb-md-0">
            <img className='my-4' src={logo} width="160" height="40" alt="logoFooter" />
            <p className='mb-5'>
              We provide quality services to our clients with dedication and professionalism.
            </p>
          </Col>
          <Col xs={12} md={3} lg={2} className="mb-4 mb-md-0">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#" className="text-white text-decoration-none">Services</a></li>
              <li><a href="#" className="text-white text-decoration-none">Shop</a></li>
              <li><a href="#" className="text-white text-decoration-none">Book Now</a></li>
              <li><a href="#" className="text-white text-decoration-none">About</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col xs={12} md={5} lg={3} className="mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <p>Email: info@fllade.com</p>
            <p>Tel: +355-xxx-xxx-xxx</p>
            <p>Location: Tirana, Albania</p>
          </Col>
          <Col xs={12} md={4} lg={3}>
            <h5>Hours</h5>
            <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
            <p>Sun: Closed</p>
          </Col>
        </Row>
        <hr className="border-light" />
        <div className='footer-bottom'>
          <div className='footer-copyright'>
            <a href='#' className='text-decoration-none text-light'>
              © {new Date().getFullYear()} Flladé Skincare Clinic. All rights reserved.
            </a>
          </div>
          <ul className="list-inline footer-socials mb-2">
            <li className="list-inline-item"><a href="#" className='text-light'><i className="fa-brands fa-instagram mx-2 fs-5"></i></a></li>
            <li className="list-inline-item"><a href="#" className='text-light'><i className="fa-brands fa-facebook mx-2 fs-5"></i></a></li>
            <li className="list-inline-item"><a href="#" className='text-light'><i className="fa-brands fa-tiktok mx-2 fs-5"></i></a></li>
            <li className="list-inline-item"><a href="#" className='text-light'><i className="fa-brands fa-youtube mx-2 fs-5"></i></a></li>
            <li className="list-inline-item"><a href="#" className='text-light'><i className="fa-brands fa-whatsapp mx-2 fs-5"></i></a></li>
          </ul>
          <div className='footer-links d-flex flex-row justify-content-center'>
            <a href='#' className='me-3 text-decoration-none text-light'>Privacy Policy</a>
            <a href='#' className='text-decoration-none text-light'>Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default FooterComp