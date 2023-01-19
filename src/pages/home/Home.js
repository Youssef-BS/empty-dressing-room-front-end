import Container from "../../components/container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.css";

const Home = () =>{
    return(
        <>
      <Container />
      <h3>Produits populares</h3>
      <div className="Container-lastPage">
      <div className="trend-product">
      <div className="product"></div>
      <div className="product"></div>
      <div className="product"></div>
      <div className="product"></div>
      <div className="product"></div>
        </div>

      </div>
        </>
    )
}

export default Home ; 