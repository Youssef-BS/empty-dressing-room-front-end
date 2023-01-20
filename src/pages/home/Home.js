import Container from "../../components/container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./home.css";

const Home = () =>{
    return(
        <>
      <Container />
      <h3>Produits populares</h3>
      <div className="Container-lastPage">
      <div className="trend-product">
      <div className="product">
       <img className="photo" img src="https://www.cdiscount.com/pdt2/8/9/0/1/700x700/mp07900890/rw/sweat-shirt-a-capuche-coupe-de-lait-noir-blanc.jpg" alt=""/>
        <p>article 1</p>
        <p>marque</p>
        <p>taille</p>
        <p style={{"textAlign":"center"}}>22dt</p>
      </div>
      <div className="product">
      <img className="photo" img src="https://www.cdiscount.com/pdt2/8/9/0/1/700x700/mp07900890/rw/sweat-shirt-a-capuche-coupe-de-lait-noir-blanc.jpg" alt=""/>
      <p>article 1</p>
      <p>marque</p>
        <p>taille</p>
        <p style={{"textAlign":"center"}}>22dt</p>
      </div>
      <div className="product">
      <img className="photo" img src="https://www.cdiscount.com/pdt2/8/9/0/1/700x700/mp07900890/rw/sweat-shirt-a-capuche-coupe-de-lait-noir-blanc.jpg" alt=""/>
      
      <p>article 1</p>
      <p>marque</p>
        <p>taille</p>
        <p style={{"textAlign":"center"}}>22dt</p>
      </div>
      <div className="product">
      <img className="photo" img src="https://www.cdiscount.com/pdt2/8/9/0/1/700x700/mp07900890/rw/sweat-shirt-a-capuche-coupe-de-lait-noir-blanc.jpg" alt=""/>
   
      <p>article 1</p>
      <p>marque</p>
        <p>taille</p>
        <p style={{"textAlign":"center"}}>22dt</p>
      </div>
      <div className="product">
      <img className="photo" img src="https://www.cdiscount.com/pdt2/8/9/0/1/700x700/mp07900890/rw/sweat-shirt-a-capuche-coupe-de-lait-noir-blanc.jpg" alt=""/>
   
      <p>article 1</p>
      <p>marque</p>
        <p>taille</p>
        <p style={{"textAlign":"center"}}>22dt</p>
      </div>
        </div>

      </div>
      <div className="collection">
      <div className="femmes"><span className="btn">Voir plus</span></div>
          <div className="enfants"><span className="btn">Voir plus</span></div>
        <div className="hommes"><span className="btn">Voir plus</span></div>
        <div className="electroniques"><span className="btn">Voir plus</span></div>
        <div className="animaux"><span className="btn">Voir plus</span></div>
        <div className="maison"><span className="btn">Voir plus</span></div>
      

      </div>
        </>
    )
}

export default Home ; 