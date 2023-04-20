import React, { useState, useEffect } from 'react';
import './tousProduits.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';


const TousProduits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20); // Set the number of products to display per page
  const navigate = useNavigate();

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
          <Spinner animation="border" variant="primary" role="status">
          </Spinner>
        </div>
      ) : (
        <div className='content'>
          {currentProducts.map((product) => (
            <Link to={'/productWatch/' + product.produit._id} style={{ color: 'black' }}>
              <div className='product' key={product.produit._id}>
                <img style={{ width: '50px', borderRadius: '50%' }} src={product.photoP.url} alt='' />
                <p>{product.name}</p>
                <img style={{ width: '250px', height: '200px' }} src={product.produit.photoProduit.url} alt='' />
                <p>{product.produit.title}</p>
                <p>Marque : {product.produit.marque}</p>
                {
                  product.produit.vende ? <p style={{ color: '#1abc9c' }}>produit vendu</p> :

                    <p><b style={{ color: '#1abc9c' }}>Prix : {product.produit.price} DT</b></p>

                }
              </div>
            </Link>
          ))}
        </div>
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