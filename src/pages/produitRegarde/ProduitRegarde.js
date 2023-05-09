import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams , Route } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const[ville , setVille] = useState("");
  const [numRue , setNumRue] = useState("");
  const [adresseLigne2,setAdresseLigne2] = useState("");
  const [codePoastal , setCodePoastal] = useState("");
  
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
      // if (error.response.status === 500) {
      //   alert("Server Error. Please try again later.");
      // }
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

   // function for tel api for payment with points

const paymentPoints = async ()=>{

 await axios.post(`http://localhost:4000/api/payment/ajoutercommande/${currentUser.user._id}/${productSlect.data._id}/${params.id}`,{
  ville,
  numRue,
  adresseLigne2,
  codePoastal
 })
 setTimeout(() => {
  window.location.reload(false);
}, 3000);

toast.success('Vous avez payer ce produit')

}


//show map 


const showMap = ()=>{
  if(mapShowed === false){
    setMapShowed(true)
  }
  else {
    setMapShowed(false);
  }
  
} 



    return (
       <>
   
      {productSlect.product && (
        <div className="co" key={productSlect.product?._id}>
          <div className="foto">
            <img src={productSlect.product.photoProduit.url} alt="" />
          </div>
          <div className="statistic" style={{background:payment ? `transparent`:"",
          marginBottom:payment ? `150px` : "",
          boxShadow : payment ? "none":""
        }}>
          {payment ? (
          <>
          <h4>Completet Pour Acheter</h4>
      <div className="formPayment">
        saisir votre ville que vous etes habite
        <Form.Control type="text" placeholder="Saisir votre ville" onChange={(e)=>setVille(e.target.value)} />
        saisir num et nom de votre rue
        <Form.Control type="text" placeholder="N° et nom de rue" onChange={(e)=>setNumRue(e.target.value)}/>
       
        saisir votre adresse ligne 2 que vous etes habites
        <Form.Control type="text" placeholder="Adresse ligne 2 (facultatif)" onChange={(e)=>setAdresseLigne2(e.target.value)} />
        saisir votre code postale que vous etes habite
        <Form.Control type="text" placeholder="code postal" onChange={(e)=>setCodePoastal(e.target.value)}/>
       
        <div className="map" onClick={showMap}> 
        
        <TbMapSearch 
        style={{height : "35px" , width : "50px"}}
        />
        <p>saisir votre place</p>
 
          </div>
        
 </div>
 <span className="btn-form-payment">
 <p onClick={paymentPoints}>confirmer</p>
 <p onClick={affichePS}>annuler</p>
 </span>
 
    
    </>):<>
    <div>
            <p>{productSlect.product.title}</p>
            <hr/>
            <p>{productSlect.product.desc}</p>
            <p>Taille : {productSlect.product.taille}</p>
            <p>Marque : {productSlect.product.marque}</p>
            <p>
              <b>Prix : {productSlect.product.price}{productSlect.product.typeP === "4" ? "Points" : "DT"}</b>
            </p>
            <p className="moyenPayment" >
              Moyen de payment : {productSlect.product.typeP === "1" ? "main a main" : 
               productSlect.product.typeP === "2" ? "avec D17 et livraison" :
               productSlect.product.typeP === "3" ? "Livraison et payment jusqu'a larrivage" :
               productSlect.product.typeP === "4" ? "Avec Des points et livraison" :""
               }
            </p>
            {

              productSlect.product.vende ? <p style={{color : "green"}}>produit vendu</p>
             : (<>            
            <button style={{display : moi ? "none" : "inline-block"}} onClick={affichePS} >Acheter</button>
            <button onClick={(event) => { handleShow(); fetchMsg(); }} style={{display : moi ? "none" : "inline-block"}}>
              Cantacter le Vendeur
            </button>
            {moi ? <p style={{color : "green"}}>c'est ton article</p> : "" }
          </>
          )
           
            }
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
            
<p style={{ color: currentUser ? "black" : "black" , textAlign : currentUser ? "right" : "left"}}>{message.content}</p>
  
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
    {/* show map in payment mode */}
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
   </>
    )


}

export default ProduitRegarde