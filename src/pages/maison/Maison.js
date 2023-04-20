import React from 'react'
import Filtre from '../../components/filtre/Filtre'
import axios from "axios";
import {useEffect , useState} from 'react';
import { Spinner } from 'react-bootstrap';

const Hommes = () => {
  const [produitKids , setProduitKids] = useState([]);
  const [loading , setLoading ] = useState(true);

useEffect(()=>{

  const fetchData= async ()=> {
  const res = await axios.get("http://localhost:4000/api/produits/home/accesoire")
  setProduitKids(res.data);
  setLoading(false);
  }
fetchData()
},[])

console.log(produitKids)

  return (
    <div>
      <Filtre />
      { loading ? (
<>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status">
        </Spinner>
      </div>
</>
      ):(
      <div className="trend-product">
      {produitKids.map(product => (
          <div className='product' key={product.produit._id}>
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"250px" , height : "200px"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            { 
            product.produit.vende ? <p style={{color : "#1abc9c"}}>produit vendu</p> :
           
           <p><b style={{color : "#1abc9c"}}>Prix : {product.produit.price} DT</b></p>
            
            }
          </div>
        ))}
      </div>)}
    </div>
  )
}

export default Hommes