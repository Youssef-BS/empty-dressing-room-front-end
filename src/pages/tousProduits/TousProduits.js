import React, { useState, useEffect } from 'react';
import "./tousProduits.css";
import axios from "axios";

const TousProduits = () => {
  const [products, setProducts] = useState([]);

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
      <div className='content'>
        {products.map(product => (
          <div className='product' key={product.produit._id}>
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"100%"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            <p><b>Prix : {product.produit.price} DT</b></p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TousProduits;