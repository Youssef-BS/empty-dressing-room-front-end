import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/authContext";
import GoogleMapReact from 'google-map-react';

import { TbMapSearch } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";


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
  const [mapShowed , setMapShowed] = useState(false);

  const [payment , setPayment] = useState(false);
  
  
  
  
  


  // type Payment 
const [main , setMain] = useState(false);  
const [poste , setPoste]= useState(false);
const [livraison , setLivraison] = useState(false);
const [points , setPoints] = useState(false);


const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 11
};

const affichePS = () =>{
if(payment === false) {
  setPayment(true)
} else {
  setPayment(false)
}
}

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

//show map 


const showMap = ()=>{
  if(mapShowed === false){
    setMapShowed(true)
  }
  else {
    setMapShowed(false);
  }
  
} 



const showTypePayement = () => {

  if(productSlect.product.typeP === "1"){
  setMain(true);
  setPoints(false);
  setPoste(false);
  setLivraison(false);
  }
  else if (productSlect.product.typeP=== "2"){
    setMain(false);
    setPoints(true);
    setPoste(false);
    setLivraison(false);
  }
  else if (productSlect.product.typeP=== "3"){
    setMain(false);
    setPoints(false);
    setPoste(true);
    setLivraison(false);
  }
  else if (productSlect.product.typeP=== "4"){
    setMain(false);
    setPoints(false);
    setPoste(false);
    setLivraison(true);
  }
  else {
    setMain(false);
    setPoints(false);
    setPoste(false);
    setLivraison(false);
  }

}


  return (
    <>
   
      {productSlect.product && (
        <div className="co" key={productSlect.product?._id}>
          <div className="foto">
            <img src={productSlect.product.photoProduit.url} alt="" />
          </div>
          <div className="statistic">
          {payment ? (
          <>
      <div className="formPayment">
        <div className="ver1">
        saisir votre ville que vous etes habite
        <Form.Control type="ville" placeholder="Saisir votre ville" />
        saisir num et nom de votre rue
        <Form.Control type="ville" placeholder="N° et nom de rue" />
        </div>
        <div className="ver2">
        saisir votre adresse ligne 2 que vous etes habites
        <Form.Control type="ville" placeholder="Adresse ligne 2 (facultatif)" />
        saisir votre code postale que vous etes habite
        <Form.Control type="ville" placeholder="code postal" />
        </div>
        <div className="map" onClick={showMap}> 
        
        <TbMapSearch 
        style={{height : "35px" , width : "50px"}}
        />
        <p>saisir votre place</p>
        { mapShowed && (

<div className="mapshow">
  <AiOutlineCloseCircle onClick={showMap}  style={{cursor : "pointer" , width :"35px" , height :"35px"}}/>
<GoogleMapReact
  bootstrapURLKeys={{ key: "" }}
  defaultCenter={defaultProps.center}
  defaultZoom={defaultProps.zoom}
>
</GoogleMapReact>
</div>
)
}
          </div>
        
 </div>
 <p>confirmer</p>
 <p onClick={affichePS}>annuler</p>
    
    </>):<>
    <div>
            <p>{productSlect.product.title}</p>
            <hr/>
            <p>{productSlect.product.desc}</p>
            <p>Taille : {productSlect.product.taille}</p>
            <p>Marque : {productSlect.product.marque}</p>
            <p>
              <b>Prix : {productSlect.product.price} Dt</b>
            </p>
            <p className="moyenPayment" >
              Moyen de payment : {productSlect.product.typeP === "1" ? "maina main" : 
               productSlect.product.typeP === "2" ? "avec D17 et livraison" :
               productSlect.product.typeP === "3" ? "Livraison et payment jusqu'a larrivage" :
               productSlect.product.typeP === "4" ? "Avec Des points et livraison" :""
               }
            </p>
            <button style={{display : moi ? "none" : "inline-block"}} onClick={affichePS} >Acheter</button>
            <button onClick={(event) => { handleShow(); fetchMsg(); }} style={{display : moi ? "none" : "inline-block"}}>
              Cantacter le Vendeur
            </button>
            {moi ? <p style={{color : "green"}}>c'est ton article</p> : "" }
           
            </div>
            
    </>}
         
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
         
   </>
    )


}

export default ProduitRegarde