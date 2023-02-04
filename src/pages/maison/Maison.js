import React from 'react'
import Filtre from '../../components/filtre/Filtre'
import axios from "axios";
import {useEffect , useState} from 'react';

const Hommes = () => {
  const [produitKids , setProduitKids] = useState([])

useEffect(()=>{

  const fetchData= async ()=> {
  const res = await axios.get("http://localhost:4000/api/produits/home/accesoire")
  setProduitKids(res.data);
  }
fetchData()
},[])

console.log(produitKids)

  return (
    <div>
      <Filtre />
      <div className="trend-product">
      {produitKids.map(product => (
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
    </div>
  )
}

export default Hommes