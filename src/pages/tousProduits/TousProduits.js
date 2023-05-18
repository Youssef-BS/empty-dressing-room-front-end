import React, { useState, useEffect } from 'react';
import './tousProduits.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

const TousProduits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20); // Set the number of products to display per page
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/produits');
        setProducts(res.data);
      } catch (error) {
        toast.error('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      const searchQuery = new URLSearchParams(location.search).get('q');
  
      try {
        const response = await axios.get(
          `http://localhost:4000/api/produits/rechercherproduit/trouve?q=${searchQuery}`
        );
    
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    handleSearch();
  }, [location.search]);

  // Get the current products to display based on the current page number
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '24px', fontSize: '28px' }}>Tous Produits</h1>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spinner animation="border" variant="primary" role="status"></Spinner>
        </div>
      ) : (
        <>
          {/* {searchResults.length > 0 && (
            <div className='product'>
              <h2 className='searchR-title'>Search Results</h2>
              {searchResults.map((result) => (
                <div key={result?._id} className='searchR-item'>
                  <img className='searchR-image' src={result.photoProduit.url} alt=""/>
                  <div className='searchR-details'>
                    <h3 className='searchR-item-title'>{result.title}</h3>
                    <p className='searchR-item-desc'>{result.desc}</p>
                    <p className='searchR-item-price'>{result.price} dt</p>
                  </div>
                </div>
              ))}
            </div>
          )} */}

          <div className='content'>
            {searchResults.map((product) => (
              <Link to={'/productWatch/' + product._id} style={{ color: 'black' }} key={product._id}>
                <div className='product'>
                  <img style={{ width: '250px', height: '200px' }} src={product.photoProduit.url} alt='' />
                  <p>{product.title}</p>
                  <p>Marque: {product.marque}</p>
                  {product.vende ? (
                    <p style={{ color: '#1abc9c' }}>Produit vendu</p>
                  ) : (
                    <p>
                      <b style={{ color: '#1abc9c' }}>Prix: {product.price} DT</b>
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        {productsPerPage <= products.length && (
          <>
            {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                style={{ margin: '5px', backgroundColor: currentPage === index + 1 ? '#1abc9c' : 'white' }}
              >
                {index + 1}
              </button>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TousProduits;
