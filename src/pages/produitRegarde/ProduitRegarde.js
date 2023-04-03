import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Modal1 from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/authContext";

const ProduitRegarde = () => {
  const params = useParams();
  const [productSlect, setProductSelect] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [msg, setMsg] = useState("");
  const [moi , setMoi] = useState('')
  const [fetchAchat , setFetchAchat] = useState(false);

  // pour afficher le poduit
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/produits/select/${params.id}`
      );

      setProductSelect(res.data);
    };

    fetchData();
  }, [params.id]);
  //

  // pour afficher la conversation
  const fetchMsg = async (e) => {

    try {
      const res = await axios.get(
        `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${productSlect.data._id}`
      );
      setConversation(res.data);
      setTimeout(fetchMsg, 1000);
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        alert("Server Error. Please try again later.");
      }
      setTimeout(fetchMsg, 1000);
    }
  };
  useEffect(() => {
    fetchMsg();
  }, []);
  console.log(conversation)
  

  //fonction pour envoyer un message
  const sendMessage = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("content", msg);
      await axios.post(
        `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${productSlect.data._id}/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg("");
    } catch (error) {
      console.log(error);
    }

  };
  //
const Me = async()=>{
    if (currentUser && currentUser.user) {
      const res = await axios.get(`http://localhost:4000/api/produits/myproduit/test/${currentUser.user._id}/${params.id}`)
      setMoi(res.data.message)
    }
   }
   Me()

   console.log(moi)

   //function achat 

   const  modalachet=()=>{
   
    if(fetchAchat===false){
      setFetchAchat(true)
    }else{
      setFetchAchat(false)
    }
   
       
   }


  return (
    <>
      {productSlect.product && (
        <div className="co" key={productSlect.product._id}>
          <div className="foto">
            <img src={productSlect.product.photoProduit.url} alt="" />
          </div>
          <div className="statistic">
            <p>{productSlect.product.title}</p>
            <hr/>
            <p>{productSlect.product.desc}</p>
            <p>Taille : {productSlect.product.taille}</p>
            <p>Marque : {productSlect.product.marque}</p>
            <p>
              <b>Prix : {productSlect.product.price} Dt</b>
            </p>
            <button style={{display : moi ? "none" : "inline-block"}}  onClick={modalachet} >Acheter</button>
            <button onClick={(event) => { handleShow(); fetchMsg(); }} style={{display : moi ? "none" : "inline-block"}}>
              Cantacter le Vendeur
            </button>
            {moi ? <p style={{color : "green"}}>c'est ton article</p> : "" }
            
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Messagerie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
          {conversation.map((message) => (
            
<p style={{ color: currentUser ? "black" : "black" , textAlign : currentUser ? "right" : "left"}}>{message}</p>
  
))}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Ecrire message ici</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={(e)=> setMsg(e.target.value)} />
            </Form.Group>
            <button variant="secondary" onClick={handleClose}>
          Fermer
          </button>
          <input type='button' variant="primary" className="BtnForm"  value="envoyer" onClick={sendMessage} />
             
          </Form>
 
        </Modal.Body>
      
      </Modal>

{

fetchAchat ? <div className="purchase-modal">
<h2>Confirm Purchase</h2>
<p>Are you sure you want to purchase this item?</p>
<div className="modal-buttons">
  <button>oui</button>
  <button onClick={modalachet}>Annuler</button>
</div>
</div>
: ""

}

         
        </>
    )


}

export default ProduitRegarde