import Container from "../../components/container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect,useState , useRef} from "react";
import axios from "axios";
import Footer from "../../components/footer/footer.js";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./home.css";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

const Home = () =>{

  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230); 

    const [products, setProducts] = useState([]);
    const [loading , setLoading] = useState(true)
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get("http://localhost:4000/api/produits");
        setProducts(res.data);
        setLoading(false)
      };
  
      fetchData();
    }, []);

    const listRef = useRef();

    const handleClick = (direction) => {
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 10 - clickLimit) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };
    return(
        <>
      <Container />
      <h3>Produits populares</h3>
      <div className="Container-lastPage">
       <div className="voir"><p ><a href="/tousproduits">Voir plus</a></p></div> 
   { loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <Spinner animation="border" variant="primary" role="status">
    </Spinner>
  </div>
   ) : (
    <>
      <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
      <div className="trend-product" ref={listRef}>
      {products.map( (product) => 
     (
     
      <Link to={'/productWatch/' + product.produit._id} style={{color : "black"}}>
          <div className='product' key={product.produit._id}>
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"250px" , height : "200px"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            <p><b>Prix : {product.produit.price} DT</b></p>
          </div>
          </Link>
          
    
        ))}
        </div> 
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
        </>
        )}

      </div>
      <div className="collection">
      <div className="femmes"><div className="back"></div><span className="btn"><Link to="/Femmes" style={{color : "black"}}>Voir plus</Link></span></div>
          <div className="enfants"><div className="back"></div><span className="btn"><Link to="/Enfants" style={{color : "black"}}>Voir plus</Link></span></div>
        <div className="hommes"><div className="back"></div><span className="btn"><Link to="/Hommes" style={{color : "black"}}>Voir plus</Link></span></div>
        <div className="electroniques"><div className="back"></div><span className="btn"><Link to="/Electroniques" style={{color : "black"}}>Voir Plus</Link></span></div>
        <div className="animaux"><div className="back"></div><span className="btn"><Link to="/Animaux" style={{color : "black"}}>Voir Plus</Link></span></div>
        <div className="maison"><div className="back"></div><span className="btn"><Link to="/Maison" style={{color : "black"}}>Voir Plus</Link></span></div>
      

      </div>
      <Footer />
        </>
    )
}

export default Home ; 