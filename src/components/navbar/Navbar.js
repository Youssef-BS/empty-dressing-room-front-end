import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineShoppingCart  } from 'react-icons/ai';



import "./navbar.css"

function NavbarSet() {
  return (

 
    <Navbar bg="light" expand="lg" className='Nav'>
    <Container>
      <Navbar.Brand href="#home" >Gachar</Navbar.Brand>
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
            <Button variant="outline-success">Search</Button>
          </Form>
          
        </Nav>
        <Nav 
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action2">Femmes</Nav.Link>
            <Nav.Link href="#action3" >Enfants </Nav.Link>
            <Nav.Link href="#action4" >Maison </Nav.Link>
            <Nav.Link href="#action5" >Electroniques </Nav.Link>
            <Nav.Link href="#action6" >Animaux </Nav.Link>
          </Nav>
        <Nav >
          <Nav.Link href="#deets">s'authentifier/s'inscri</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
         <AiOutlineShoppingCart  />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
    
  </Navbar>


  
  );
}

export default NavbarSet;