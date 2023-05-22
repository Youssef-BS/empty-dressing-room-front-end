import Container from "../../components/container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect,useState} from "react";
import axios from "axios";
import Footer from "../../components/footer/footer.js";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Spline from '@splinetool/react-spline';
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
       <button className="voir"><a href="/toustypeproduit">Voir plus</a></button> 
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
    scrollbar={true}
    style={{marginTop : "80px"}}
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
      <div className="logothreed" >
      <Spline scene="https://prod.spline.design/9EXfLykCGsRHTJvR/scene.splinecode" style={{ width: "300px", height: "150px" , margin :"auto"}}/>
      </div>
      <div className="catégoriesvedettes">
        <h3 className="titre">catégories vedettes</h3>
        <div className="collection-dispo">
        <div className="H"><div className="objet"><b>Hommes</b><p>article pour hommes<br /> <Link to="/toustypeproduit/?categorie=hommes" style={{color : "black" , fontSize:"18px"}}>voir plus</Link></p></div></div>
        <div className="F"><div className="objet"><b>Femmes</b><p>article pour femmes<br /><Link to="/toustypeproduit/?categorie=femmes" style={{color : "black" , fontSize:"18px"}}>voir plus</Link> </p></div></div>
        <div className="EL"><div className="objet"><b>Electronique</b><p>article pour electroniques<br /> <Link to="/toustypeproduit/?categorie=electroniques" style={{color : "black" , fontSize:"18px"}}>voir plus</Link></p></div></div>
        <div className="A"><div className="objet"><b>Animaux</b><p>article pour animaux<br /> <Link to="/toustypeproduit/?categorie=animaux" style={{color : "black" , fontSize:"18px"}}>voir plus</Link></p></div></div>
        <div className="E"><div className="objet"><b>Enfants</b><p>article pour enfants<br /><Link to="/toustypeproduit/?categorie=enfants" style={{color : "black" , fontSize:"18px"}}>voir plus</Link> </p></div></div>
        <div className="M"><div className="objet"><b>Maison</b><p>article pour maison<br /><Link to="/toustypeproduit/?categorie=maison" style={{color : "black" , fontSize:"18px"}}>voir plus</Link> </p></div></div>
        </div>
      </div>
      
    <div className="description">
    <video controls autoPlay loop>
  <source src="https://v1.pinimg.com/videos/mc/720p/af/75/09/af7509e2ac84eac08b059f3798fcf63f.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
    <p>Notre site web est une plateforme en ligne où vous pouvez acheter et vendre une variété de produits et services. Nous offrons une expérience utilisateur facile et pratique, avec des fonctionnalités telles que la recherche de produits, les filtres de recherche avancée, les paniers d'achat, les paiements sécurisés et la livraison à domicile.</p>
    </div>
    
      <Footer />
     
        </>
    )
}

export default Home ; 