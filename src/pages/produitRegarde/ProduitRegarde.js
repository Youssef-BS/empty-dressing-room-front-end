import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams , Route , Link} from "react-router-dom";
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
  // const [conversation, setConversation] = useState([]);
  // const [msg, setMsg] = useState("");
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
  // const fetchMsg = async (e) => {

  //   try {
  //     const res = await axios.get(
  //       `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${productSlect.data._id}`
  //     );
  //     setConversation(res.data);
  //     setTimeout(fetchMsg, 1000);
  //   } catch (error) {
  //     console.error(error);
  //     // if (error.response.status === 500) {
  //     //   alert("Server Error. Please try again later.");
  //     // }
  //     setTimeout(fetchMsg, 1000);
  //   }
  // };
  // useEffect(() => {
  //   fetchMsg();
  // }, []);
  // console.log(conversation)
  

  //fonction pour envoyer un message
  // const sendMessage = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const formData = new FormData();
  //     formData.append("content", msg);
  //     await axios.post(
  //       `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${productSlect.data._id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     setMsg("");
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };
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
     <h4 className="payment-header">Compléter pour acheter</h4>
  <div className="form-payment">
    <label>Saisir votre ville :</label>
    <input type="text" placeholder="Saisir votre ville" onChange={(e) => setVille(e.target.value)} />

    <label>Saisir numéro et nom de votre rue :</label>
    <input type="text" placeholder="N° et nom de rue" onChange={(e) => setNumRue(e.target.value)} />

    <label>Saisir votre adresse ligne 2 que vous habitez :</label>
    <input type="text" placeholder="Adresse ligne 2 (facultatif)" onChange={(e) => setAdresseLigne2(e.target.value)} />

    <label>Saisir votre code postal :</label>
    <input type="text" placeholder="Code postal" onChange={(e) => setCodePoastal(e.target.value)} />

    <div className="map" onClick={showMap}>
      <TbMapSearch style={{ height: "35px", width: "50px" }} />
      <p>Saisir votre place</p>
    </div>
  </div>
  <div className="btn-form-payment">
    <p className="confirm-button" onClick={paymentPoints}>Confirmer</p>
    <p className="cancel-button" onClick={affichePS}>Annuler</p>
  </div>
 
    
    </>):<>
    <div className="product-details">
  <p className="product-title">{productSlect.product.title}</p>
  <hr />
  <p className="product-description">{productSlect.product.desc}</p>
  <p className="product-info">Taille: {productSlect.product.taille}</p>
  <p className="product-info">Marque: {productSlect.product.marque}</p>
  <p className="product-price">
    Prix: {productSlect.product.price}
    {productSlect.product.typeP === "4" ? "Points" : "DT"}
  </p>
  <p className="payment-method">
    Moyen de paiement:{" "}
    {productSlect.product.typeP === "1"
      ? "Main à main"
      : productSlect.product.typeP === "2"
      ? "Avec D17 et livraison"
      : productSlect.product.typeP === "3"
      ? "Livraison et paiement jusqu'à l'arrivage"
      : productSlect.product.typeP === "4"
      ? "Avec des points et livraison"
      : ""}
  </p>
  {productSlect.product.vende ? (
    <p className="product-status">Produit vendu</p>
  ) : (
    <>
      <button className="buy-button" style={{ display: moi ? "none" : "inline-block" }} onClick={affichePS}>
        Acheter
      </button>
      <button className="contact-button"  style={{ display: moi ? "none" : "inline-block" }}>
        <Link to={'/getconv/'+ productSlect.data._id }>Contacter le vendeur</Link>
      </button>
      {moi ? <p className="product-status" style={{ color: "green" }}>C'est ton article</p> : ""}
    </>
  )}
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
          {/* <Form>
            
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
             
          </Form> */}
 
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