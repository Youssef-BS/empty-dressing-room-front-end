import React, { useState, useEffect } from 'react';
import "./tousProduits.css";
import axios from "axios";

const TousProduits = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/api/produits");
      setUsers(res.data);
    };

    fetchData();
  }, []);

  console.log(users)

  return (
    <>
      <h1 style={{textAlign: "center", marginTop: "24px", fontSize: "28px"}}>Tous Produits</h1>
<div className='content'>
  {users.map(user => (
    <div key={user._id}>
      {user.produits.map(product => (
        <div className='product' key={product._id}>
          <img style={{width : "50px" , borderRadius:"50%"}} src={user.photoP.url} alt="" />
          <p>{user.name}</p>
          <img style={{width:"100%"}} src={product.photoProduit.url} alt="" />
          <p>{product.title}</p>
          <p>Marque : {product.marque}</p>
          <p><b>Prix : {product.price} DT</b></p>
        </div>
      ))}
    </div>
  ))}
</div>
    </>
  );
};

export default TousProduits;