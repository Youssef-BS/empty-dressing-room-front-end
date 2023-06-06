import React, { useState, useEffect } from 'react';
import './tousProduits.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

const TousProduits = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);


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
      } finally {
        setLoading(false);
      }
    };
  
    handleSearch();
  }, [location.search]);


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
                <img style={{width : "50px" , height : "50px" , borderRadius:"50%"}} src={item.user.photoP.url} alt="" />
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
    </>
  );
};

export default TousProduits;
