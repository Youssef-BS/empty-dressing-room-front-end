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
  const [productsPerPage, setProductsPerPage] = useState(20); 
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
<div className='content'>
            {searchResults.map((item) => (
              <Link to={'/productWatch/' + item.produit._id} style={{ color: 'black' }} key={item.produit._id}>
                <div className='product'>
                <img style={{width : "50px" , borderRadius:"50%"}} src={item.user.photoP.url} alt="" />
            <p>{item.user.name}</p>
                  <img style={{ width: '250px', height: '200px' }} src={item.produit.photoProduit.url} alt='' />
                  <p>{item.produit.title}</p>
                  <p>Marque: {item.produit.marque}</p>
                  {item.produit.vende ? (
                    <p style={{ color: '#1abc9c' }}>Produit vendu</p>
                  ) : (
                    <p>
                      <b style={{ color: '#1abc9c' }}>Prix: {item.produit.price} DT</b>
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
