import React,{useContext} from 'react'
import { AuthContext } from '../../context/authContext'
import "./getProfile.css"

const Getprofile = () => {
    const { currentUser } = useContext(AuthContext);
return (
    <div className='containerProfile'>
     <h3>Votre Profile</h3>
     <p>votre nom</p><input type="text" placeholder={currentUser.name} />
     <p>votre email</p><input type="text" placeholder={currentUser.email} />
    <p>mettre à jour ?</p> <input type="button" value="update" className='btnForm' />
     
    </div>
  )
}

export default Getprofile   