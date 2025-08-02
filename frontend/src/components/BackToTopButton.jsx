import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return show ? (
    <Button
      onClick={scrollToTop}
      variant="dark"
      className="position-fixed bottom-0 end-0 m-4 rounded-circle p-3"
      style={{ zIndex: 9999 }}
    >
      <i className="fas fa-arrow-up text-white fs-5"></i>
    </Button>
  ) : null;
};

export default BackToTopButton;
