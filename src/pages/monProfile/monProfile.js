import React,{useContext , useEffect, useState} from 'react'
import { AuthContext } from '../../context/authContext'
import "./getProfile.css"
import axios from "axios";



const Getprofile = () => {
    const { currentUser } = useContext(AuthContext);
    const [produit , setProduits] = useState("");
    

    useEffect(()=>{
     const fetchData = async ()=>{
      const res = await axios.get(`http://localhost:4000/api/users/produitsUsers/${currentUser.user._id}`);
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
  <div className='produitsUser'>

  </div>
  </>
  )
}

export default Getprofile   