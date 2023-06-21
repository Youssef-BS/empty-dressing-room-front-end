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
        
        <h2 className='insc'>login</h2><hr />
        
        
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
      
      <p onClick={FormRegister} className='msg'>{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2 className='insc' >s'inscrire ici</h2><hr/>
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
        <img style={{"height":"900px"}}
          className="d-block w-100"
          src="https://images.hdqwalls.com/wallpapers/girl-in-glasses-looking-back-4k-un.jpg"
          alt="First slide"
        />
          </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"900px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/beau-modele-hipster-confiantsexy-homme-mal-rase-vetu-vetements-capuche-jeans-verts-elegants-ete-mode-homme-coiffure-bouclee-posant-studio-isole-bleu_158538-26582.jpg?w=2000"
          alt="Second slide"
        />
  {/* </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"900px"}}
          className="d-block w-100"
          src="https://wallpaperswide.com/download/hot_girl_beside_the_beach-wallpaper-5120x2880.jpg"
          alt="Third slide"
        /> */}
      </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"900px"}}
          className="d-block w-100"
          src="https://c1.wallpaperflare.com/preview/924/432/853/store-clothing-shop-bouique.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"900px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-premium/garcon-blond-bandana-tete-dans-sweat-capuche-rouge-lunettes-posant-fond-orange_88135-18715.jpg?w=2000"
          alt="Third slide"
        />
      </Carousel.Item>
     
    </Carousel>
     <div className='Vente'>
     <h3><span><b>prét à faire</b></span><br /><span><b>du tri de votre</b></span> <br /> <span><b>placard ?</b></span> </h3>
     <span className='btnVente' onClick={currentUser ? handleClick : handleShow}><b>Vends Maintenant</b></span>
   </div>
   
   </>
  );
}

export default Container;