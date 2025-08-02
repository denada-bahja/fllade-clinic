import React from 'react'
import './AboutComp.css'
import { Container, Row, Col, Card } from 'react-bootstrap';
import img1 from '../images/img1.jpeg'
import img2 from '../images/img2.jpeg'
import img3 from '../images/img3.jpeg'
import img4 from '../images/img4.jpeg'
import img5 from '../images/img5.jpeg'
import img from '../images/imgg.jpeg'

const staffData = [
  {
    name: "Name Surname",
    role: "Role",
    image: img,
  },
  {
    name: "Name Surname",
    role: "Role",
    image: img,
  },
  {
    name: "Name Surname",
    role: "Role",
    image: img,
  },
]


const AboutComp = () => {

  return (
    <div className="about-us-page">
      <section className="hero-images">
        <Row className="g-0 image-grid ">
          <Col xs={4}><img src={img1} className='w-100 object-fit-cover' /></Col>
          <Col xs={4}><img src={img2} className='w-100 object-fit-cover' /></Col>
          <Col xs={4}><img src={img3} className='w-100 object-fit-cover' /></Col>
        </Row>
        <div className="about-us-text w-100">
          <h1 className='mb-0'>ABOUT US</h1>
        </div>
      </section>

      <div className='about-section'>
        <section className="thank-you-section text-center">
          <h2>Thank You</h2>
          <p className="sub-title">FOR VISITING US</p>
          <p className="about-paragraph">
            We're not your average skincare clinic. Behind every service we offer is a passion for natural beauty and well-being. Our story didn't start by chance, it started with a deep belief that skincare is self-care. With years of dedication, learning, and care, we've created a space where every face is welcomed, heard, and transformed.
          </p>
        </section>

        <section className="story-details px-0">
          <Container >
            <Row>
              <Col md={6} className='about-images px-0'>
                <img src={img4} className="img-fluid w-100 object-fit-cover" />
              </Col>
              <Col md={6} className="about-text d-flex align-items-center p-5">
                <div>
                  <h3 className='mb-4'>Flladé Skincare Clinic</h3>
                  <p>
                    Flladé was born from the dream of a passionate woman dedicated to wellness. With every touch, we strive to enhance your natural beauty using clean products and personalized treatments. Our mission is to help you glow both inside and out.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col md={6} className="about-text d-flex align-items-center p-5">
                <div>
                  <p>
                    Whether you visit us for a relaxing facial, advanced skin therapies, or body and hair care services, our experienced professionals are committed to helping you look and feel your absolute best.
                  </p>
                  <a className='about-button fw-bold py-2 px-3' href='/components/contactComp'>Contact us</a>
                </div>
              </Col>
              <Col md={6} className='about-images px-0'>
                <img src={img5} className="img-fluid w-100 object-fit-cover" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="staff-section py-5">
          <Container>
            <h3 className='text-center my-4'>Our Staff</h3>
            <Row>
              {staffData.map((staff, index) => (
                <Col md={4} className="mb-4 px-4" key={index}>
                  <Card className="h-100 shadow-sm staff-card">
                    <Card.Img variant="top" src={staff.image} className="staff-img w-100 object-fit-cover" alt={staff.name} />
                    <Card.Body>
                      <Card.Title>{staff.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{staff.role}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

      </div>
    </div>
  )
}

export default AboutComp