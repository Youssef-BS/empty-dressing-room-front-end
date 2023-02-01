import React, { useState , useContext } from 'react'
import axios from 'axios'
import "./addProduits.css"
import { AuthContext } from "../../context/authContext";

const AddProduits = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [categories, setCategories] = useState('')
  const [desc, setDesc] = useState('')
  const [photoProduit, setPhotoProduit] = useState(null)
  const [taille, setTaille] = useState('')
  const [marque, setMarque] = useState('')
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.user._id)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('price', price)
      formData.append('categories', categories)
      formData.append('desc', desc)
      formData.append('photoProduit', photoProduit)
      formData.append('taille', taille)
      formData.append('marque', marque)

      await axios.post(`http://localhost:4000/api/produits/addproduct/${currentUser.user._id}`, formData)
      

      // Reset form after successful submission
      setTitle('')
      setPrice(0)
      setCategories('')
      setDesc('')
      setPhotoProduit(null)
      setTaille('')
      setMarque('')

      // Show success message
      alert('Produit ajouté avec succès !')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='formProduit'>
      <h1>Ajouter Produit pour vente</h1>
      <div className='ajouter_produit'>
        <form onSubmit={handleSubmit}>
          titre <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
          prix <input type="number" value={price} onChange={event => setPrice(event.target.value)} />
          categorie <input type="text" value={categories} onChange={event => setCategories(event.target.value)} />
          description <input type="text" value={desc} onChange={event => setDesc(event.target.value)} />
          photo de produit <input type="file" onChange={event => setPhotoProduit(event.target.files[0])} />
          taille <input type="text" value={taille} onChange={event => setTaille(event.target.value)} />
          marque <input type="text" value={marque} onChange={event => setMarque(event.target.value)} />
          <input type="submit" value="Ajouter Produit" />
        </form>
      </div>
    </div>
  )
}

export default AddProduits