import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './ProductsComp.css'

const ProductsComp = ({ cart = [], setCart, filteredCategory, filteredBrand }) => {
  const navigate = useNavigate();

  const faceCareCategories = ['cleanser', 'serum', 'moisturizer', 'sunscreen', 'mask', 'eye-care'];
  const bodyCareCategories = ['body-lotion', 'body-scrub', 'body-oil'];
  const hairCareCategories = ['shampoo', 'conditioner', 'hair-mask', 'hair-oil'];

  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12;

  const storedUser = localStorage.getItem('user');
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === 'admin';

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
        setProducts(response.data)
      } catch (err) {
        console.error('Error retrieving data:', err)
      }
    }
    fetchProducts()
  }, []);

  // Reset page to 1 when filters/search change:
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCategory, filteredBrand, searchQuery]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find(item => item._id === product._id);
      if (productInCart) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        alert("Product deleted successfully!");
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  const handleUpdateProduct = (id) => {
    window.location.href = `/components/updateProductForm/${id}`;
  };

  const filteredProducts = products.filter(product => {
    const productCat = product.category?.toLowerCase();
    const productBrand = product.brand?.toLowerCase();
    const productName = product.itemName?.toLowerCase() || '';
    const productDescription = product.description?.toLowerCase() || '';

    const matchesCategory = (() => {
      if (!filteredCategory) return true;
      if (filteredCategory === 'face-care') return faceCareCategories.includes(productCat);
      if (filteredCategory === 'body-care') return bodyCareCategories.includes(productCat);
      if (filteredCategory === 'hair-care') return hairCareCategories.includes(productCat);
      return productCat === filteredCategory.toLowerCase();
    })();

    const matchesBrand = !filteredBrand || productBrand === filteredBrand.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      productName.includes(searchQuery) ||
      productDescription.includes(searchQuery);

    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get products for current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle page change
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Row>
        {filteredProducts.length === 0 && (
          <p className="text-center mt-4 text-muted">No products found in this category.</p>
        )}

        {currentProducts.map((product) => (
          <Col
            className='mt-4'
            key={product._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card className="product-card d-flex flex-column pb-0 mb-4 h-100 cursor-pointer shadow-sm">
              <Link to={`/components/productInfos/${product._id}`} className='text-decoration-none'>
                <Card.Img
                  className="product-image w-100 object-fit-cover"
                  style={{ height: '220px' }}
                  src={product.imageUrl}
                  alt={product.itemName}
                />
              </Link>

              <Card.Body className="product-body p-3 d-flex flex-column justify-content-between">

                <div>
                  <div className='d-flex justify-content-between mb-2'>
                    {/* Stock */}
                    <div>
                      {product.stock > 0 ? (
                        <span className="badge bg-success">In Stock</span>
                      ) : (
                        <span className="badge bg-danger">Out of Stock</span>
                      )}
                    </div>

                    {/* Rating */}
                    <div>
                      <small className="text-warning">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={`fa-star ${i < Math.round(product.rating) ? 'fas' : 'far'}`}
                          ></i>
                        ))}
                      </small>
                      <small className="text-muted ms-2">
                        ({product.reviews})
                      </small>
                    </div>
                  </div>

                  {/* Title and Price */}
                  <Card.Title className="product-title fw-bold m-0 ">
                    {product.itemName}
                  </Card.Title>
                </div>

                <div>
                  {/* price */}
                  <div className='d-flex justify-content-end text-success my-2'>
                    <span className="product-price fw-semibold">
                      {product.price} €
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="dark"
                    disabled={product.stock === 0}
                    className="pr-button "
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>

              {isAdmin && (
                <div className='d-flex justify-content-around my-3'>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </Button>
                  <Button className='text-white' variant="warning" onClick={() => handleUpdateProduct(product._id)}>
                    Update
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container d-flex justify-content-center align-items-center my-4 gap-2">
          {/* Prev arrow */}
          <button
            className="btn btn-outline-dark"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                className={`btn ${pageNum === currentPage ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </button>
            )
          })}

          {/* Next arrow */}
          <button
            className="btn btn-outline-dark"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}

      <Button
        className='my-5 bg-dark'
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-arrow-left pe-2"></i>
        Go Back
      </Button>
    </Container>
  )
}

export default ProductsComp;
