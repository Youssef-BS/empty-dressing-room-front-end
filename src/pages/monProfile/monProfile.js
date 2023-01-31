import React,{useContext , useEffect, useState} from 'react'
import { AuthContext } from '../../context/authContext'
import "./getProfile.css"
import axios from "axios";



const Getprofile = () => {
    const { currentUser } = useContext(AuthContext);
    const [produit , setProduits] = useState([]);
    

    useEffect(()=>{
     const fetchData = async ()=>{
      const res = await axios.get(`http://localhost:4000/api/produits/${currentUser.user._id}`);
      setProduits(res.data);
}
fetchData();
})

console.log(produit)
return (
  <>
    <div className='containerProfile'>
     <h3>Votre Profile</h3>
     <p>votre nom</p><input type="text" placeholder={currentUser.user.name} />
     <p>votre email</p><input type="text" placeholder={currentUser.user.email} />
    <p>mettre à jour ?</p> <input type="button" value="update" className='btnForm' />
   </div>
   <div className='content'>
    

    {produit.map(item=>(
      <div className='product' key={item._id}>
        <img className="photoP" src={currentUser.user.photoP.url} alt="" />
        <span>{currentUser.user.name}</span>
        <span><img src={item.photoProduit.url} alt ="" /></span>
        
        <p>{item.title}</p>
        <p>marque : {item.marque}</p>
        <p><b>prix : {item.price} DT</b></p>
        <div className='Modification'>
        <span className='edit'>Modifier</span>
        <span className='delete'>Supprimer</span>
        </div>
        
</div>

   
    
    ))}
        </div>
  </>
  )
}

export default Getprofile   