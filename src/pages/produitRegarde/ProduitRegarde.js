import React,{useEffect , useState} from "react"
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './produitRegarde.css'

const ProduitRegarde = () =>{
const params = useParams()
const [productSlect , setProductSelect] = useState({})

useEffect(()=>{
const fetchData =async ()=>{

    const res = await axios.get(`http://localhost:4000/api/produits/select/${params.id}`)

setProductSelect(res.data)

}

fetchData();

},[params.id])

console.log(productSlect)

    return(
        <>
        
        {productSlect.product && (
        <div className="co"  key={productSlect.product._id}>
         <div className="foto"><img src={productSlect.product.photoProduit.url}  alt="" /></div>
         <div className="statistic">
        <p>{productSlect.product.title}</p>
        <p>{productSlect.product.taille}</p>
        <p>{productSlect.product.marque}</p>
        <p>{productSlect.product.categorie}</p>
        <p><b>{productSlect.product.price}</b></p>
        </div>
        </div>
        )}
        
        </>
    )


}

export default ProduitRegarde