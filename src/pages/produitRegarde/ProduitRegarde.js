import React,{useEffect , useState} from "react"
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './produitRegarde.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ProduitRegarde = () =>{
const params = useParams()
const [productSlect , setProductSelect] = useState({})

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

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
        <p>{productSlect.product.desc}</p>
        <p>Taille : {productSlect.product.taille}</p>
        <p>Marque : {productSlect.product.marque}</p>
        <p><b>Prix : {productSlect.product.price} Dt</b></p>
        <button>Acheter</button>
        <button onClick={handleShow} >Cantacter le Vendeur</button>
        </div>
        </div>
        )}
  
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Messagerie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Control as="textarea" rows={7} disabled/>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ecrire message ici</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Form.Group>
            <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <input type='button' variant="primary" className="BtnForm"  value="envoyer" />
             
          </Form>
 
        </Modal.Body>
      
      </Modal>
         
        </>
    )


}

export default ProduitRegarde