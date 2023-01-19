import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import "./container.css"

function Container() {
  return (
    <>
    <Carousel className='containerSet'>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/coup-moyen-personnes-regardant-vetements-dans-friperie_23-2150082910.jpg?w=2000"
          alt="First slide"
        />
          </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0038/5807/1622/files/vintage-shopping_600x600@2x.jpg?v=1614303612"
          alt="Second slide"
        />
  </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://www.10wallpaper.com/wallpaper/3840x2160/1804/Hanger_clothing_fashion_market_4K_HD_3840x2160.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
     
    </Carousel>
     <div className='Vente'>
     <h3><span> Si Vouz avez un produit</span><br /><span>plus vous puvez le</span> <br /> <span>vende avec gachar</span> </h3>
     <Button variant="primary" size="sm">Cluiquer ici pour vente</Button>
   </div>
   </>
  );
}

export default Container;