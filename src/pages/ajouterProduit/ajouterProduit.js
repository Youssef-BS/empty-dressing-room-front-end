import React, { useState , useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduits = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [categories, setCategories] = useState('')
  const [desc, setDesc] = useState('')
  const [photoProduit, setPhotoProduit] = useState(null)
  const [taille, setTaille] = useState('')
  const [marque, setMarque] = useState('')
  const [typeP , setTypeP] = useState('');
  const [msg , setMsg] = useState('');
  const [styleInput , setStyleInput]=useState('')
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async event => {
    event.preventDefault()

    try {

      if(title==="" || price==="" || price===0 || categories==="" || desc==="" || photoProduit==="" || taille==="" || marque===""){
        toast.error('Choix obligatoire')
      }
      const formData = new FormData()
      formData.append('title', title)
      formData.append('price', price)
      formData.append('categories', categories)
      formData.append('desc', desc)
      formData.append('photoProduit', photoProduit)
      formData.append('taille', taille)
      formData.append('marque', marque)
      formData.append('typeP' , typeP)

      await axios.post(`http://localhost:4000/api/produits/addproduct/${currentUser.user._id}`, formData)
      

     
      setTitle('')
      setPrice(0)
      setCategories('')
      setDesc('')
      setPhotoProduit(null)
      setTaille('')
      setMarque('')
      setTypeP('')

      
      toast.success('Produit Publier avec succes')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
  if(typeP === "0"){
    setStyleInput("none");
    setMsg("")
  }
  else if(typeP>"0" && typeP<"4"){
    setMsg("saisir votre prix");
    setStyleInput("block")
  } else if(typeP==="4"){
    setMsg("saisir votre points")
    setStyleInput("block")
  } else{
    setStyleInput("none");
    setMsg("")
  }
  },[typeP])
  // console.log(typeP)

  return (
    <div className='containerAddProduit'>
      <div className='pub'>
        <img src="https://i.pinimg.com/564x/dc/ae/66/dcae66764a7bd4d470bd2446f062b1ff.jpg" alt=""/>
        <p className='desc'> Si vous êtes un vendeur, vous pouvez créer votre propre boutique en ligne, ajouter des produits à vendre, gérer vos commandes et vos expéditions. Nous offrons également des fonctionnalités pour promouvoir vos produits, telles que la publicité ciblée et la mise en avant de vos offres.</p>
      </div>
    <div className='formProduit'>
<ToastContainer
  position="top-center"
  reverseOrder={false}
/>  

  
      <h1>publier un produit</h1>
      <div className='ajouter_produit'>
        <form onSubmit={handleSubmit}>
          titre <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="ex : capuche etc" />
          selection type payment 
          <select value={typeP} onChange={event => setTypeP(event.target.value)}>
           <option value="0">selectionner type transaction</option>
           <option value="1">main à main</option>
           <option value="2">avec D17 et Livraison</option>
           <option value="3">Livraison et payment jusqu'a arrive</option>
           <option value="4">Avec Des Points et Livraison</option>
          </select>
          <p>{msg}</p><input type="number" value={price} onChange={event => setPrice(event.target.value)} placeholder="ex : 90 etc" style={{display : `${styleInput}`}}/>
          <p>select categorie</p>
          <select value={categories} onChange={event => setCategories(event.target.value)}>
            <option value="sans categories" >Sans categorie</option>
            <option value="femmes">Femmes</option>
            <option value="hommes">Hommes</option>
            <option value="enfants">Enfants</option>
            <option value="animaux">Animaux</option>
            <option value="electroniques">Electroniques</option>
            <option value="maison">Maison</option>
          </select><br />
          description <input type="text" value={desc} onChange={event => setDesc(event.target.value)} placeholder="ex : capuche rouge taille .. etc" />
          photo de produit <input type="file" onChange={event => setPhotoProduit(event.target.files[0])} />
          taille <input type="text" value={taille} onChange={event => setTaille(event.target.value)} placeholder="ex : s ,m ,xl.."/>
          marque <input type="text" value={marque} onChange={event => setMarque(event.target.value)} placeholder="ex : gucci , lc etc" />
          <input type="submit" value="Ajouter Produit" className='BtnForm' />
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddProduits