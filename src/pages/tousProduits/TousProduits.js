import React, { useState, useEffect } from 'react';
import "./tousProduits.css";
import axios from "axios";
import {Link , useNavigate} from "react-router-dom"

const TousProduits = () => {
  const [products, setProducts] = useState([]);
  const [id , setId] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/api/produits");
      setProducts(res.data);
    };

    fetchData();
  }, []);


  


  return (
    <>
      <h1 style={{textAlign: "center", marginTop: "24px", fontSize: "28px"}}>Tous Produits</h1>
      
      <div className='content' >
        
        {products.map(product => (
        <Link to={'/productWatch/' + product.produit._id}>
          <div className='product' key={product.produit._id}>
            {/* {setProducts(product.produit._id)} */}
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"100%"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            <p><b>Prix : {product.produit.price} DT</b></p>
            
          </div>
          </Link>
          ))}
        
      </div>
      
    </>
  );
};

export default TousProduits;