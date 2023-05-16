import Carousel from 'react-bootstrap/Carousel';
import React,{useContext , useState} from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Container() {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registerForm,setRegisterForm] = useState(false);
  const [msg , setMsg] = useState("vous n'avais pas de compte ?");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [photoP , setPhotoP] = useState(null)
 

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleClick = () =>{
    navigate("/AddProduits");
  }
  
  const handleLogin = async (event)=>{
    event.preventDefault();
    // window.location.reload(false);
    await login(email,password);
   }
 
 
  function FormRegister(){
    if(registerForm===false){
      setRegisterForm(true);
      setMsg("j'ai un compte")
    }
    else{
      setRegisterForm(false);
      setMsg("vous n'avais pas de compte ?")

    }
  }




  const register = async(event)=>{
    event.preventDefault()
    
  
    try {
      const FormNew = new FormData()
      FormNew.append('name', name)
      FormNew.append('email', email)
      FormNew.append('password', password)
      FormNew.append('photoP', photoP)
  
      await axios.post("http://localhost:4000/api/users/register", FormNew )
      toast.success('compte creer avec succee')
    } catch (error) {
      console.error(error)
    }
  
  }
  
  
  
    return (
  <>
  <ToastContainer
    position="top-center"
    reverseOrder={false}
  />
        <>
         <Modal show={show} onHide={handleClose}>
        
        <h2 closeButton>login</h2><hr />
        
        
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <button  className="btnForm" onClick={handleLogin}>s'authentifier</button>
  <br />
      
      <p onClick={FormRegister}>{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2>s'inscrire ici</h2><hr/>
  <Form.Group className='mb-3' controlId='formBasicFile'>
      <Form.Label>Ajouter votre photo</Form.Label>
      <Form.Control type='file' onChange={(e) => setPhotoP(e.target.files[0])}></Form.Control> 

     </Form.Group>
  <Form.Group className='mb-3' controlId='formBasicName'>
      <Form.Label>Ajouter votre nom et prenom</Form.Label>
      <Form.Control type='text' placeholder='entrer votre nom et prenom' name="name" onChange={(e)=> setName(e.target.value)}></Form.Control> 

     </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Ajouter votre adresse</Form.Label>
        <Form.Control type="email" placeholder="Entrer votre email" name="email"  onChange={(e)=> setEmail(e.target.value)} />
      </Form.Group>
      
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ajouter votre mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <input  type="button" className="btnForm" onClick={register}  value="register"/>
      <br />
    </Form>
    
}

        </Modal.Body>
      </Modal>
        </>
    
     
    <Carousel className='containerSet'>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/coup-moyen-personnes-regardant-vetements-dans-friperie_23-2150082910.jpg?w=2000"
          alt="First slide"
        />
          </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/jeune-homme-chemise-choisir-vetements-dans-centre-commercial-magasin-vetements_23-2148175648.jpg?w=996&t=st=1684162674~exp=1684163274~hmac=c19580ca25f62fb53c9b6d032e16c0e43488b3af54c11c6225b04a73a189ef33"
          alt="Second slide"
        />
  </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/portrait-haute-couture-jeune-femme-blonde-elegante-au-chapeau-laine-noire-portant-poncho-franges-blanches-surdimensionne-longue-robe-grise_273443-3799.jpg?w=996&t=st=1684162623~exp=1684163223~hmac=135acd3edb12961fa529f9682c397ae06c6d69949b3dd9068e716315daa8b1df"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/enfants-elegants-mignons_155003-8330.jpg?w=996&t=st=1684162719~exp=1684163319~hmac=15f435db10626ba5ead2fcf837e9fed5d51bc3643eacf31d8502803ba3c3ea51"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/jeune-jolie-femme-choisissant-essayant-chaussures-modele-au-magasin_155003-2198.jpg?w=996&t=st=1684162855~exp=1684163455~hmac=3cbb87db63477ceae01d332ab9793662d0d5cb9eef60d629ffbe1234f8056f25"
          alt="Third slide"
        />
      </Carousel.Item>
     
    </Carousel>
     <div className='Vente'>
     <h3><span> Si Vouz avez un produit</span><br /><span>plus vous puvez le</span> <br /> <span>vende avec gachar</span> </h3>
     <span className='btnVente' onClick={currentUser ? handleClick : handleShow}>Cluiquer ici pour vente</span>
   </div>
   
   </>
  );
}

export default Container;