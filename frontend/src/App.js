import './App.css';
//import elementet e DOM
import { Route, Routes, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
//import components
import NavComp from './components/NavComp';
import HomeComp from './components/HomeComp';
import ServicesComp from './components/ServicesComp';
import ShopByCategoryComp from './components/ShopByCategoryComp';
import FooterComp from './components/FooterComp'
import ModalComp from './components/ModalComp';
import SignInComp from './components/SignInComp';
import SignUpComp from './components/SignUpComp';
import BookingFormComp from './components/BookingFormComp';
import BestSellersComp from './components/BestSellersComp';
import AddProductForm from './components/AddProductForm';
import ContactComp from './components/ContactComp';
import AboutComp from './components/AboutComp';
import ProductsComp from './components/ProductsComp'
import CartComp from './components/CartComp';
import ProductInfos from './components/ProductInfos';
import UpdateProductForm from './components/UpdateProductForm'
import ServicesDetails from './components/ServicesDetails';
import FAQComp from './components/FAQComp'
import BackToTopButton from './components/BackToTopButton';

function App() {
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredBrand, setFilteredBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('signin');

  const navigate = useNavigate();

  // user state: null if not signed in
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // update localStorage and user state on sign in
  const handleSignInSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowModal(false);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);



  const handleBookClick = () => {
    if (user) {
      navigate('/components/bookingFormComp');
    } else {
      setModalContent('signin');
      setShowModal(true);
    }
  };

  return (
    <div>

      <NavComp
        cart={cart}
        user={user}
        onSignInClick={() => {
          setModalContent('signin');
          setShowModal(true);
        }}
        onSignUpClick={() => {
          setModalContent('signup');
          setShowModal(true);
        }}
        setFilteredCategory={setFilteredCategory}
        setFilteredBrand={setFilteredBrand}
      />

      <Routes>
        <Route path='/' element={
          <div>
            <HomeComp onBookClick={handleBookClick} />
            <BestSellersComp />
            <FAQComp />
            <ServicesComp />
            <ShopByCategoryComp setFilteredCategory={setFilteredCategory} />
            <BookingFormComp
              onSignInClick={() => {
                setModalContent('signin');
                setShowModal(true);
              }}
            />
          </div>
        } />
        <Route path='/components/addProductForm' element={<AddProductForm />} />
        <Route path='/components/contactComp' element={<ContactComp />} />
        <Route path='/components/aboutComp' element={<AboutComp />} />
        <Route path='/components/productInfos/:id' element={<ProductInfos cart={cart} setCart={setCart} />} />
        <Route path="/components/updateProductForm/:id" element={<UpdateProductForm />} />
        <Route path='/components/servicesDetails/:id' element={<ServicesDetails />} />
        <Route
          path="/components/cartComp"
          element={
            <CartComp
              cart={cart}
              setCart={setCart}
              user={user}
              onSwitchToSignIn={() => {
                setModalContent('signin');
                setShowModal(true);
              }}
              onSwitchToSignUp={() => {
                setModalContent('signup');
                setShowModal(true);
              }}
            />
          }
        />

        <Route
          path='/components/bookingFormComp'
          element={
            <BookingFormComp
              onSignInClick={() => {
                setModalContent('signin');
                setShowModal(true);
              }}
            />
          }
        />


        <Route
          path="/components/productsComp"
          element={
            <ProductsComp
              user={user}
              cart={cart}
              setCart={setCart}
              filteredCategory={filteredCategory}
              setFilteredCategory={setFilteredCategory}
              filteredBrand={filteredBrand}
              setFilteredBrand={setFilteredBrand}
              onSignInClick={() => {
                setModalContent('signin');
                setShowModal(true);
              }}
              onSignUpClick={() => {
                setModalContent('signup');
                setShowModal(true);
              }}
            />
          }
        />


      </Routes>
      <FooterComp />

      {showModal && (
        <ModalComp onClose={() => setShowModal(false)}>
          {modalContent === 'signin' && (
            <SignInComp
              onSwitchToSignUp={() => setModalContent('signup')}
              onSignInSuccess={handleSignInSuccess}
            />
          )}
          {modalContent === 'signup' && (
            <SignUpComp
              onSwitchToSignIn={() => setModalContent('signin')}
              onSignInSuccess={handleSignInSuccess}
            />
          )}
          {modalContent === 'booking' && <BookingFormComp />}
        </ModalComp>
      )}

      <BackToTopButton />
    </div>
  )
}

export default App;
