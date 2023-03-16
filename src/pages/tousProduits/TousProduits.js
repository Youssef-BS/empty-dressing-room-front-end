import React, { useState, useEffect } from 'react';
import "./tousProduits.css";
import axios from "axios";
import {Link , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

const TousProduits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/produits");
        setProducts(res.data);
      } catch (error) {
        toast.error('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{textAlign: "center", marginTop: "24px", fontSize: "28px"}}>Tous Produits</h1>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spinner animation="border" variant="primary" role="status">
          </Spinner>
        </div>
      ) : (
        <div className='content'>
          {products.map((product) => (
            <Link to={'/productWatch/' + product.produit._id} style={{color: 'black'}}>
              <div className='product' key={product.produit._id}>
                <img style={{ width: '50px', borderRadius: '50%' }} src={product.photoP.url} alt='' />
                <p>{product.name}</p>
                <img style={{ width: '100%' }} src={product.produit.photoProduit.url} alt='' />
                <p>{product.produit.title}</p>
                <p>Marque : {product.produit.marque}</p>
                <p>
                  <b>Prix : {product.produit.price} DT</b>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      
    
    </>
  );
};

export default TousProduits;
