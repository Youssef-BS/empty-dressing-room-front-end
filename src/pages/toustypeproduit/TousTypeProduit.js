import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const TousTypeProduit = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [marque, setMarque] = useState('');
  const [categorie, setCategorie] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [price, size, marque, categorie]);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (price) queryParams.append('price', price);
      if (size) queryParams.append('size', size);
      if (marque) queryParams.append('marque', marque);
      if (categorie) queryParams.append('categorie', categorie);

      const response = await axios.get(`http://localhost:4000/api/produits/rechercherproduit/filter?${queryParams.toString()}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleCategorieChange = (event) => {
    setCategorie(event.target.value);
  };

  const handleMarqueChange = (event) => {
    setMarque(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };


  return (
    <>
      <div className='filter'>
        <div className='element'>
          <Form.Select aria-label="Default select example" onChange={handleSizeChange}>
            <option value="">taille</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </Form.Select>
        </div>
        <div className='element'>
          <Form.Select aria-label="Default select example" onChange={handleCategorieChange}>
            <option value="">Categorie</option>
            <option value="hommes">Hommes</option>
            <option value="femmmes">Femmes</option>
            <option value="enfants">Enfants</option>
            <option value="maison">maison</option>
            <option value="animaux">Animaux</option>
            <option value="5">Electronique</option>
          </Form.Select>
        </div>
        <div className='element'>
          <Form.Select aria-label="Default select example" onChange={handleMarqueChange}>
            <option value="">marque</option>
            <option value="adidas">Adidas</option>
            <option value="nike">Nike</option>
            <option value="lc">Lc</option>
            <option value="celio">Celio</option>
            <option value="zara">Zara</option>
            <option value="bershka">Bershka</option>
            <option value="h&m">H&M</option>
            <option value="calvin clein">Calvin Clein</option>
            <option value="gucci">Gucci</option>
          </Form.Select>
        </div>
        <div className='element'>
          <Form.Select aria-label="Default select example" onChange={handlePriceChange}>
            <option value="">prix</option>
            <option value="1-100">1 to 100</option>
  <option value="101-200">101 to 200</option>
          </Form.Select>
        </div>
      </div>
      <hr style={{ "width": "40%" }} />
      <h1 style={{ textAlign: 'center', marginTop: '24px', fontSize: '28px' }}>Tous Produits</h1>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      ) : (
        <div className="content">
          {products.map((item) => (
            <Link to={`/productWatch/${item.produit._id}`} style={{ color: 'black' }} key={item.produit._id}>
              <div className="product">
                <img style={{ width: '50px', borderRadius: '50%' }} src={item.user.photoP.url} alt="" />
                <p>{item.user.name}</p>
                <img style={{ width: '250px', height: '200px' }} src={item.produit.photoProduit.url} alt="" />
                <p>{item.produit.title}</p>
                <p>Marque: {item.produit.marque}</p>
                {item.produit.vende ? (
                  <p style={{ color: '#1abc9c' }}>Produit vendu</p>
                ) : (
                  <p>
                    <b style={{ color: '#1abc9c' }}>Prix: {item.produit.price} DT</b>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default TousTypeProduit;
