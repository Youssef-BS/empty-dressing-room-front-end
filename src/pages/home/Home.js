import Container from "../../components/container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect,useState} from "react";
import axios from "axios";
import Footer from "../../components/footer/footer.js";

import "./home.css";

const Home = () =>{

  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get("http://localhost:4000/api/produits");
        setProducts(res.data);
      };
  
      fetchData();
    }, []);

  console.log(products)
    return(
        <>
      <Container />
      <h3>Produits populares</h3>
      <div className="Container-lastPage">
       <div className="voir"><p ><a href="/tousproduits">Voir plus</a></p></div> 
      <div className="trend-product">
      {products.map( (product, index) => 
    index < 5 &&  (
          <div className='product' key={product.produit._id}>
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"100%"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            <p><b>Prix : {product.produit.price} DT</b></p>
          </div>
        ))}
        </div>

      </div>
      <div className="collection">
      <div className="femmes"><div className="back"></div><span className="btn">Voir plus</span></div>
          <div className="enfants"><div className="back"></div><span className="btn">Voir plus</span></div>
        <div className="hommes"><div className="back"></div><span className="btn">Voir plus</span></div>
        <div className="electroniques"><div className="back"></div><span className="btn">Voir plus</span></div>
        <div className="animaux"><div className="back"></div><span className="btn">Voir plus</span></div>
        <div className="maison"><div className="back"></div><span className="btn">Voir plus</span></div>
      

      </div>
      <Footer />
        </>
    )
}

export default Home ; 