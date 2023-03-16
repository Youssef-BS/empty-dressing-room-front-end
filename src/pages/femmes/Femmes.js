import React from 'react'
import Filtre from '../../components/filtre/Filtre'
import axios from "axios";
import {useEffect , useState} from 'react';
import { Spinner } from 'react-bootstrap';

const Hommes = () => {
  const [produitFemmes , setProduitFemmes] = useState([])
  const [loading , setLoading] = useState(true)

useEffect(()=>{

  const fetchData= async ()=> {
  const res = await axios.get("http://localhost:4000/api/produits/women/clother")
  setProduitFemmes(res.data);
  setLoading(false);
  }
fetchData()
},[])

console.log(produitFemmes)

  return (
    <div>
      <Filtre />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status">
        </Spinner>
      </div>
      ) : (
      <div className="trend-product">
      {produitFemmes.map(product => (
          <div className='product' key={product.produit._id}>
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"100%"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            <p><b>Prix : {product.produit.price} DT</b></p>
          </div>
        ))}
      </div>)}
    </div>
  )
}

export default Hommes