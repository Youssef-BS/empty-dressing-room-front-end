import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./produitRegarde.css";
import Modal from "react-bootstrap/Modal";
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
  const [itsMe , setItsMe] = useState(false)
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
    setItsMe(true)
    try {
      const formData = new FormData();
      formData.append("content", msg);
      await axios.post(
        `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${productSlect.data._id}`,
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

  console.log(productSlect);

  return (
    <>
      {productSlect.product && (
        <div className="co" key={productSlect.product._id}>
          <div className="foto">
            <img src={productSlect.product.photoProduit.url} alt="" />
          </div>
          <div className="statistic">
            <p>{productSlect.product.title}</p>
            <p>{productSlect.product.desc}</p>
            <p>Taille : {productSlect.product.taille}</p>
            <p>Marque : {productSlect.product.marque}</p>
            <p>
              <b>Prix : {productSlect.product.price} Dt</b>
            </p>
            <button>Acheter</button>
            <button onClick={(event) => { handleShow(); fetchMsg(); }}>
              Cantacter le Vendeur
            </button>
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
            
<p style={{ color: currentUser ? "red" : "black" , textAlign : currentUser ? "right" : "left"}}>{message}</p>
  
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
         
        </>
    )


}

export default ProduitRegarde