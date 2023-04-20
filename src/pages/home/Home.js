import Container from "../../components/container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect,useState , useRef} from "react";
import axios from "axios";
import Footer from "../../components/footer/footer.js";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Home = () =>{

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


    return(
        <>
      
     
   
      <Container />
      <h3>Produits populares</h3>
      <div className="Container-lastPage">
       <button className="voir"><a href="/tousproduits">Voir plus</a></button> 
   { loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' , margin : "auto" }}>
    <Spinner animation="border" variant="primary" role="status">
    </Spinner>
  </div>
   ) : (
    <>
      <Swiper
    spaceBetween={50}
    slidesPerView={5}
    navigation
    style={{marginTop : "100px"}}
  >
          
          <div className="trend-product">

    {products.map((product) => (
      <SwiperSlide key={product.produit._id}>
        <Link to={`/productWatch/${product.produit._id}`} style={{color : "black"}}>
          <div className="product">
            <img style={{width : "50px" , borderRadius:"50%"}} src={product.photoP.url} alt="" />
            <p>{product.name}</p>
            <img style={{width:"250px" , height : "200px"}} src={product.produit.photoProduit.url} alt="" />
            <p>{product.produit.title}</p>
            <p>Marque : {product.produit.marque}</p>
            { 
            product.produit.vende ? <p style={{color : "#1abc9c"}}>produit vendu</p> :
           
           <p><b style={{color : "#1abc9c"}}>Prix : {product.produit.price} DT</b></p>
            
            }
          </div>
        </Link>
      </SwiperSlide>
    ))}
  
</div>
</Swiper>      
   
        </>
        )}

      </div>
      <div className="collection">
      <div className="femmes"><div className="back"></div><span className="btn"><Link to="/Femmes" style={{color : "white" , textDecoration : "none"}}>Femmes</Link></span></div>
          <div className="enfants"><div className="back"></div><span className="btn"><Link to="/Enfants" style={{color : "white" , textDecoration : "none"}}>Enfants</Link></span></div>
        <div className="hommes"><div className="back"></div><span className="btn"><Link to="/Hommes" style={{color : "white" , textDecoration : "none"}}>Hommes</Link></span></div>
        <div className="electroniques"><div className="back"></div><span className="btn" style={{width : "150px"}}><Link to="/Electroniques" style={{color : "white" , textDecoration : "none" }}>Electroniques</Link></span></div>
        <div className="animaux"><div className="back"></div><span className="btn"><Link to="/Animaux" style={{color : "white" , textDecoration : "none"}}>Animaux</Link></span></div>
        <div className="maison"><div className="back"></div><span className="btn"><Link to="/Maison" style={{color : "white" , textDecoration : "none"}}>Maison</Link></span></div>
      </div>

    <div className="description">
    <video controls autoPlay loop>
  <source src="https://v1.pinimg.com/videos/mc/720p/af/75/09/af7509e2ac84eac08b059f3798fcf63f.mp4" type="video/mp4" />
  {/* <source src="my-video.webm" type="video/webm" /> */}
  Your browser does not support the video tag.
</video>
    <p>Notre site web est une plateforme en ligne où vous pouvez acheter et vendre une variété de produits et services. Nous offrons une expérience utilisateur facile et pratique, avec des fonctionnalités telles que la recherche de produits, les filtres de recherche avancée, les paniers d'achat, les paiements sécurisés et la livraison à domicile.</p>
    </div>

      <Footer />
        </>
    )
}

export default Home ; 