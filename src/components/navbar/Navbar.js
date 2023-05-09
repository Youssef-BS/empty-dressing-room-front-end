import React,{useState,useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineShoppingCart  } from 'react-icons/ai';
import { BiNotification  } from 'react-icons/bi';
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';




function NavbarSet() {

  //Notification Modal 
  const [showNotification, setShowNotification] = useState(false);

  const handleCloseNotification = () => setShowNotification(false);
  const handleShowNotification = () => setShowNotification(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registerForm,setRegisterForm] = useState(false);
  const [msg , setMsg] = useState("vous n'avais pas de compte ?");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [photoP, setPhotoP]=useState(null);
  const [commandes , setCommandes] = useState([]);

  //side bar
  const [showSB, setShowSB] = useState(false);

  const handleCloseSB = () => setShowSB(false);
  const handleShowSB = () => setShowSB(true);  
//----------------------------------------------------------------

  const { login } = useContext(AuthContext);
  const {logout} = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const [conversation , setConversation] = useState([])
  const {id} = useParams();

  const handleLogin = async (event)=>{
    event.preventDefault();
    // window.location.reload(false);
    await login(email,password);
   }
   const handleLogout = async (event)=>{
    event.preventDefault();
    window.location.reload(false);
    await logout();
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

useEffect(()=>{
const MyConversation = async ()=>{

const res = await axios.get(`http://localhost:4000/api/msg/msgSend/${currentUser.user._id}`)
setConversation(res.data.myProduct)

}
MyConversation()
},[]);

useEffect(()=>{
  const getCommandes = async  ()=>{
    const res = await axios.get(`http://localhost:4000/api/payment/getmycommande/${currentUser.user._id}`)
    setCommandes(res.data)
  }
  getCommandes()
});


console.log(commandes)




function NotificationIcon() {
  return (
    <span style={{ position: 'relative', display: 'inline-block' , cursor : 'pointer' , marginLeft:"8px" }}>
      <BiNotification onClick={handleShowNotification}/>
      <span
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '16px',
          height: '16px',
          backgroundColor: 'red',
          borderRadius: '50%',
          color: 'white',
          textAlign: 'center',
          fontSize: '12px',
          lineHeight: '16px',
        }}
      >
        2
      </span>
    </span>
  );
}

function Panier() {
  return (
    <span style={{ position: 'relative', display: 'inline-block' , cursor : 'pointer' , marginLeft:"8px" }}>
      <AiOutlineShoppingCart onClick={handleShowSB}/>
      <span
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '16px',
          height: '16px',
          backgroundColor: 'red',
          borderRadius: '50%',
          color: 'white',
          textAlign: 'center',
          fontSize: '12px',
          lineHeight: '16px',
        }}
      >
        {commandes.s}
      </span>
    </span>
  );
}






return (
<>
<ToastContainer
  position="top-center"
  reverseOrder={false}
/>
    <Navbar bg="light" expand="lg" className='Nav'>
    <Container>
      <Navbar.Brand href="/" >YSF's Cyber Mall</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{width : "350px"}}
            />
            <input type="button" className="btnForm"  value="recherche"/>
          </Form>
          <NavDropdown
              id="nav-dropdown-white-example"
              title="selection categories"
              menuVariant="white"
              style={{marginLeft : "12px"}}
            >
            <Nav.Link href="/Femmes">Femmes</Nav.Link>
            <Nav.Link href="/Hommes">Hommes</Nav.Link>
            <Nav.Link href="/Enfants" >Enfants </Nav.Link>
            <Nav.Link href="/Maison" >Maison </Nav.Link>
            <Nav.Link href="/Electroniques" >Electroniques </Nav.Link>
            <Nav.Link href="/Animaux" >Animaux </Nav.Link>
            </NavDropdown>
  
         
       
          {
            currentUser  ? <div style={{display : "flex" , alignItem:"center" , marginLeft : "180px"}}>
              <img src={currentUser.user.photoP.url} style={{height : "35px" , width:"35px" , borderRadius : "35%" , marginLeft : "12px"}} alt="" />
            <Nav.Link style={{marginLeft : "12px"}}>{currentUser.user.name}</Nav.Link>
            
            {NotificationIcon()}
            
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="menu"
              menuVariant="dark"
              style={{marginLeft:"70px"}}
            >
              <NavDropdown.Item><Link to={"/monprofile/"+currentUser.user._id}>mon profile</Link></NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Deconnection</NavDropdown.Item>
            </NavDropdown>
           
         
            </div> : <Nav.Link onClick={handleShow} style={{marginLeft : "400px"}}>s'authentifier/s'inscri</Nav.Link>
             }
            
          
          {Panier()}
       
      </Navbar.Collapse>
    </Container>
    
  </Navbar>
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
      
      <p onClick={FormRegister} >{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2>s'inscrire ici</h2><hr/>
  <Form.Group className='mb-3' controlId='formBasicFile1'>
      <Form.Label>Ajouter votre photo</Form.Label>
      <Form.Control type='file'id="img" name="img" onChange={(e) => setPhotoP(e.target.files[0])}></Form.Control> 
</Form.Group>
  <Form.Group className='mb-3' controlId='formBasicName1'>
      <Form.Label>Ajouter votre nom et prenom</Form.Label>
      <Form.Control type='text' placeholder='entrer votre nom et prenom' name="name" onChange={(e)=> setName(e.target.value)}></Form.Control> 

     </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>Ajouter votre adresse</Form.Label>
        <Form.Control type="email" placeholder="Entrer votre email" name="email"  onChange={(e)=> setEmail(e.target.value)} />
      </Form.Group>
      
     <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>Ajouter votre mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <input  type="button" className="btnForm" onClick={register}  value="register"/>
      <br />
    </Form>
    
}

        </Modal.Body>
      </Modal>
{/* Notification */}
<Modal show={showNotification} onHide={handleCloseNotification}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {conversation.map((conver,i) => (
    i<1 && (
    <div  key={conver.myproduct._id} > 

      {conver.userContact.map(user => (
        <div className='notification'>
          <img style={{width:"50px"}} src={user.photoP.url} alt=""/>
       <Link to={'/getconv/'+ user._id +'/product/'+conver.myproduct._id}><p key={user._id}>{user.name}</p></Link> 
       </div>
      ))}
     </div>
  )))}
</Modal.Body>

  
      </Modal>
      <Offcanvas show={showSB} onHide={handleCloseSB}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Panier</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {
  commandes && commandes.produits && commandes.produits.map((produit ,i) => (
    <div key={produit._id} className='panier'>
     <p style={{marginRigth : "8px"}}>CN°{i+1}</p>
     <img src={produit.photoProduit.url} alt="" />
      <p>{produit.title}</p>
      <p>{produit.price}</p>
      <p>{produit.taille}</p>
      <p>{produit.marque}</p>
      <p style={{color : "orange"}}>commandes arrive pendants 48h</p>
    </div>
  ))
}
        </Offcanvas.Body>
      </Offcanvas>
</>
  
  );
}

export default NavbarSet;