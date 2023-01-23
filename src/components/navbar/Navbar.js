import React,{useState,useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineShoppingCart  } from 'react-icons/ai';
import "./navbar.css"
import axios from 'axios';
import { AuthContext } from "../../context/authContext";

function NavbarSet() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registerForm,setRegisterForm] = useState(false);
  const [msg , setMsg] = useState("vous n'avais pas de compte ?");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const { login } = useContext(AuthContext);
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

const handleLogin = async ()=>{
 await login(email,password);
}


  const register = async()=>{
 await axios.post("http://localhost:4000/api/users/register", {
      name,
      email,
      password
      }, {
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      })

}

  return (
<>
 
    <Navbar bg="light" expand="lg" className='Nav'>
    <Container>
      <Navbar.Brand href="/" >Gachar</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <input type="button" className="btnForm"  value="recherche" />
          </Form>
          
        </Nav>
        <Nav 
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/Femmes">Femmes</Nav.Link>
            <Nav.Link href="/Hommes">Hommes</Nav.Link>
            <Nav.Link href="/Enfants" >Enfants </Nav.Link>
            <Nav.Link href="/Maison" >Maison </Nav.Link>
            <Nav.Link href="/Electroniques" >Electroniques </Nav.Link>
            <Nav.Link href="/Animaux" >Animaux </Nav.Link>
          </Nav>
        <Nav >
          <Nav.Link onClick={handleShow}>s'authentifier/s'inscri</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
         <AiOutlineShoppingCart  />
          </Nav.Link>
        </Nav>
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
      <input  type="button" className="btnForm" onClick={handleLogin}  value="login"/>
  <br />
      
      <p onClick={FormRegister} >{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2>s'inscrire ici</h2><hr/>
  <Form.Group className='mb-3' controlId='formBasicFile'>
      <Form.Label>Ajouter votre photo</Form.Label>
      <Form.Control type='file'></Form.Control> 

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
  
  );
}

export default NavbarSet;