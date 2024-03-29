import React,{useState,useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { BiNotification  } from 'react-icons/bi';
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {CiDeliveryTruck} from 'react-icons/ci';



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
  const [isScrolled, setIsScrolled] = useState(false);
  const [two , setTwo] = useState([]);
  
  const navigate = useNavigate();

  //side bar
  const [showSB, setShowSB] = useState(false);

  const handleCloseSB = () => setShowSB(false);
  const handleShowSB = () => setShowSB(true);  
//----------------------------------------------------------------

  const { login } = useContext(AuthContext);
  const {logout} = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);
  const [conversation , setConversation] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

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


useEffect(() => {
  const getTwo = async () => {
    try {
      if (currentUser && currentUser.user) {
        const res = await axios.get(
          `http://localhost:4000/api/msg/get/gettwo/${currentUser.user._id}`
        );
        setTwo(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  getTwo();
}, [currentUser]);

console.log(two)





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
      <CiDeliveryTruck onClick={handleShowSB}/>
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
        {commandes.s > 0 ? commandes.s : 0}
      </span>
    </span>
  );
}



window.onscroll = () => {
  setIsScrolled(window.pageYOffset === 0 ? false : true);
  return () => (window.onscroll = null);
};



const changePage = ()=>{

navigate(`/tousproduits/?q=${searchQuery}`)

}

return (
<>
<ToastContainer
  position="top-center"
  reverseOrder={false}
/>
{/* <div className={isScrolled ? "navbar scrolled" : "navbar"}> */}
    <Navbar bg="light" expand="lg" className={isScrolled ? "Nav scrolled" :"Nav"} >
    <Container>
      <Navbar.Brand href="/" >YSF's Cyber Mall</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        
  <div>
  <Form className="d-flex" >
    <Form.Control
      type="search"
      placeholder="Recherche"
      className="me-2"
      aria-label="Search"
      style={{ width: "400px" }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <input type="button" className="btnForm"  value="recherche" onClick={changePage}/> 
    </Form>


</div>
          <NavDropdown
              id="nav-dropdown-white-example"
              title="selection categories"
              menuVariant="white"
              style={{marginLeft : "12px"}}
            >
            <Nav.Link href="/toustypeproduit/?categorie=femmes">Femmes</Nav.Link>
            <Nav.Link href="/toustypeproduit/?categorie=hommes">Hommes</Nav.Link>
            <Nav.Link href="/toustypeproduit/?categorie=enfants">Enfants </Nav.Link>
            <Nav.Link href="/toustypeproduit/?categorie=maison">Maison </Nav.Link>
            <Nav.Link href="/toustypeproduit/?categorie=electronique">Electroniques</Nav.Link>
            <Nav.Link href="/toustypeproduit/?categorie=hommes">Animaux </Nav.Link>
            </NavDropdown>
  
         
       
          {
            currentUser  ? <div style={{display : "flex" , alignItem:"center" , marginLeft : "180px"}}>
              <img src={currentUser.user?.photoP?.url} style={{height : "35px" , width:"35px" , borderRadius : "35%" , marginLeft : "12px"}} alt="" />
            <Nav.Link style={{marginLeft : "12px"}}>{currentUser.user?.name}</Nav.Link>
            
            {NotificationIcon()}
            
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="menu"
              menuVariant="dark"
              style={{marginLeft:"70px"}}
            >
              <NavDropdown.Item><Link to={"/monprofile/"+currentUser.user?._id} style={{color : "white" , textDecoration : "none"}}>mon profile</Link></NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Deconnection</NavDropdown.Item>
            </NavDropdown>
            {Panier()}
         
            </div> : <Nav.Link onClick={handleShow} style={{marginLeft : "400px"}}>s'authentifier/s'inscri</Nav.Link>
             }
            
          
          
       
      </Navbar.Collapse>
    </Container>
    
  </Navbar>

  <Modal show={show} onHide={handleClose}>
        
        <h2 className='insc'>s'authentifier</h2><hr />
        
        
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>adresse mail</Form.Label>
        <Form.Control type="email" placeholder="entrer votre adresse mail" name="email" onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>mot de passe</Form.Label>
        <Form.Control type="password" placeholder="entrer votre mot de passe"  name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <button  className="btnForm" onClick={handleLogin}>s'authentifier</button>
  <br />
      
      <p onClick={FormRegister} className='msg'>{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2 className='insc'>s'inscrire ici</h2><hr/>
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
        <Form.Control type="password" placeholder="entrer votre mot de passe" name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <input  type="button" className="btnForm" onClick={register}  value="s'inscrire"/>
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
   {two.map(user => (
        <div className='notification' style={{width : "400px"}}>
          <img style={{width:"50px"}} src={user.photoP.url} alt=""/>
          <p>{user.name}</p>
       <Link to={'/getconv/'+ user._id}><p key={user._id} style={{textDecoration : "none" , color : "black"}}>voir les message</p></Link> 
       </div>
      ))}
    
</Modal.Body>

  
      </Modal>
      <Offcanvas show={showSB} onHide={handleCloseSB}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Panier</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
  {commandes &&
    commandes.allMyCommands &&
    commandes.allMyCommands.map((commande, i) => {
      const produit = commandes.produits[i];
      return (
        <div key={i} className="panier" >
          <p style={{ marginRight: "8px" }}>CN°{i + 1}</p>
          <img src={produit?.photoProduit.url} alt="" />
          <p>{produit?.title}</p>
          <p>{produit?.price}</p>
          <p>{produit?.taille}</p>
          <p>{produit?.marque}</p>
          <div className="etat">
            {commande.isST ? (
              <p style={{ color: "green" }}>produit déjà arrivé</p>
            ) : (
              <p style={{ color: "orange" }}>produit arrive dans 48 h</p>
            )}
          </div>
        </div>
      );
    })}


        </Offcanvas.Body>
      </Offcanvas>

</>
  
  );
}

export default NavbarSet;