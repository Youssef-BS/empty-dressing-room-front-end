import React, { useEffect, useState} from 'react'
import Filtre from '../../components/filtre/Filtre'
import axios from "axios";


const Electroniques = () => {

const [electroniqueProduct  , setElectroniqueProduct ] = useState([]);

useEffect(()=>{

  const fetchData =async ()=>{
const res = await axios.get("http://localhost:4000/api/produits/electronique/accesoire")
setElectroniqueProduct(res.data);
  }

  fetchData()

} , [])



  return (
    <div>
      <Filtre />
      <div className="trend-product">
      {electroniqueProduct.map(product => (
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

export default Electroniques