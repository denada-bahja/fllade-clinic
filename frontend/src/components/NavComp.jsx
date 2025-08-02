import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Navbar, Nav, NavDropdown, Container, Form, Button, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/flladeLogo.png';
import './NavComp.css';

const NavComp = ({ user, onSignInClick, onSignUpClick, cart = [], setFilteredCategory, setFilteredBrand }) => {
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [showShop, setShowShop] = useState(false);
  const [openShopCategory, setOpenShopCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const handleCategoryClick = (category) => {
    setFilteredCategory(category);
    setFilteredBrand(null);
    navigate('/components/productsComp');
  };

  const handleBrandClick = (brand) => {
    setFilteredBrand(brand);
    setFilteredCategory(null);
    navigate('/components/productsComp');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/components/productsComp?search=${searchQuery}`);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`);
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);



  return (
    <div className='navbar-container'>
      <Alert className="banner sticky-bottom text-center p-2 mb-0 text-white bg-dark">
        Enjoy fast delivery: only 2€ in Tirana, 3€ in other cities. Orders above 50€ get FREE shipping!
      </Alert>

      <Navbar
        expand="lg"
        className="bg-body-tertiary py-2">

        <Container fluid>

          <Navbar.Brand href="#">
            <img
              src={logo}
              className="nav-logo d-inline-block align-top"
              width="160"
              height="40"
              alt="logoNav"
            />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarScroll"
          />

          <Navbar.Collapse id="navbarScroll" className="justify-content-center text-center">

            <Nav className="me-auto">

              <Nav.Link href="/" className='nav-links'>Home</Nav.Link>

              {/* services */}
              <NavDropdown
                title="Services"
                className='nav-links'
                menuVariant="light"
                show={showServices}
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                {services.map(service => (
                  <NavDropdown.Item
                    as={Link}
                    to={`/components/servicesDetails/${service._id}`}
                    key={service._id}
                  >
                    {service.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {/* Shop */}
              <NavDropdown
                title="Shop"
                className='nav-links'
                menuVariant="light"
                show={showShop}
                onMouseEnter={() => setShowShop(true)}
                onMouseLeave={() => {
                  setShowShop(false);
                  setOpenShopCategory(null);
                }}
              >
                {/* All Products */}
                <NavDropdown.Item
                  onClick={() => {
                    setFilteredCategory(null);
                    setFilteredBrand(null);
                    navigate('/components/productsComp');
                    setShowShop(false);
                    setOpenShopCategory(null);
                  }}
                >
                  All Products
                </NavDropdown.Item>

                <Dropdown.Divider />

                {/* Shop/Face Care */}
                <div
                  className="dropdown-item no-arrow"
                  onClick={() =>
                    setOpenShopCategory(openShopCategory === 'face-care' ? null : 'face-care')
                  }
                >
                  Face Products
                </div>

                {openShopCategory === 'face-care' && (
                  <div className="submenu">
                    <NavDropdown.Item onClick={() => handleCategoryClick('cleanser')}>Cleansers</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('serum')}>Serums</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('moisturizer')}>Moisturizers</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('sunscreen')}>Sunscreens</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('mask')}>Face Masks</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('eye-care')}>Eye Care</NavDropdown.Item>
                  </div>
                )}


                {/* Shop/Body Care */}
                <div
                  className="dropdown-item no-arrow"
                  onClick={() =>
                    setOpenShopCategory(openShopCategory === 'body-care' ? null : 'body-care')
                  }
                >
                  Body Products
                </div>

                {openShopCategory === 'body-care' && (
                  <div className="submenu">
                    <NavDropdown.Item onClick={() => handleCategoryClick('body-lotion')}>Body Lotions</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('body-scrub')}>Body Scrubs</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('body-oil')}>Body Oils</NavDropdown.Item>
                  </div>
                )}
                {/* Shop/Hair Care */}
                <div
                  className="dropdown-item no-arrow"
                  onClick={() =>
                    setOpenShopCategory(openShopCategory === 'hair-care' ? null : 'hair-care')
                  }
                >
                  Hair Products
                </div>

                <Dropdown.Divider />

                {openShopCategory === 'hair-care' && (
                  <div className="submenu">
                    <NavDropdown.Item onClick={() => handleCategoryClick('shampoo')}>Shampoos</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('conditioner')}>Conditioners</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('hair-mask')}>Hair Masks</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleCategoryClick('hair-oil')}>Hair Oils</NavDropdown.Item>
                  </div>
                )}

                {/* Shop/Brands */}
                <div
                  className="dropdown-item no-arrow"
                  onClick={() =>
                    setOpenShopCategory(openShopCategory === 'brands' ? null : 'brands')
                  }
                >
                  Brands
                </div>

                {openShopCategory === 'brands' && (
                  <div className="submenu">
                    <NavDropdown.Item onClick={() => handleBrandClick('the-ordinary')}>The Ordinary</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleBrandClick('cera-ve')}>CeraVe</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleBrandClick('la-roche-posay')}>La Roche-Posay</NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>

              <Nav.Link href="/components/aboutComp" className='nav-links'>About</Nav.Link>

              <Nav.Link href="/components/bookingFormComp" className='nav-links no-wrap-text'>Book Now</Nav.Link>

              <Nav.Link href="/components/contactComp" className='nav-links'>Contact</Nav.Link>

            </Nav>

            {/* search bar */}
            <div className="search-cart-wrapper d-flex justify-content-center align-items-center gap-3">
              <Form className="d-flex search-form" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <Button type="submit" className="search-button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
              </Form>

              {/* cart */}
              <Nav.Link
                href="/components/cartComp"
                className="cart-icon position-relative"
              >
                <i className="shoppingCart-icon fa-solid fa-cart-shopping fs-5"></i>
                {cart?.length > 0 && (
                  <span className="cart-badge">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Nav.Link>
            </div>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  bsPrefix="p-0 border-0 bg-transparent"
                  id="dropdown-user"
                >
                  <Image
                    src="https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                    alt="User"
                    roundedCircle
                    width="40"
                    height="40"
                    style={{ cursor: 'pointer' }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="p-3">
                  <div className="text-center">
                    <Image
                      src="https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                      alt="User"
                      width="100"
                      height="100"
                      roundedCircle
                      className="mb-2"
                    />
                    <div className="fw-bold mb-2">{user.name}</div>
                    <Button
                      className='signOut-button no-wrap-text'

                      onClick={() => {
                        localStorage.removeItem('user');
                        window.location.reload();
                      }}
                    >
                      Sign Out
                    </Button>
                    {isAdmin && <Nav.Link href="/components/addProductForm" className='add-product nav-links no-wrap-text mt-3 py-1 '>Add Product</Nav.Link>}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="user-auth d-flex justify-content-center gap-2">
                <Button className="signIn-button no-wrap-text" onClick={onSignInClick}>Sign In</Button>
                <Button className="signUp-button border-0 text-white no-wrap-text" onClick={onSignUpClick}>Sign Up</Button>
              </div>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComp;
