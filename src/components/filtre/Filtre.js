import React from 'react'
import Form from 'react-bootstrap/Form';

const Filtre = () => {

  return (
    <>
   
        <div className='filter'>
        
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>taille</option>
      <option value="1">XS</option>
      <option value="2">S</option>
      <option value="3">M</option>
      <option value="4">L</option>
      <option value="4">XL</option>
      <option value="5">XXL</option>
    </Form.Select>
        </div>
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>marque</option>
      <option value="1">Adidas</option>
      <option value="2">Nike</option>
      <option value="3">Lc</option>
      <option value="4">Celio</option>
      <option value="5">Zara</option>
      <option value="6">Bershka</option>
      <option value="7">H&M</option>
      <option value="8">Calvin Clein</option>
      <option value="9">Gucci</option>
    </Form.Select>
        </div>
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>prix</option>
      <option value="1">croissante</option>
      <option value="2">decroissante</option>
    </Form.Select>
        </div>
       

    </div>
    <hr  style={{"width":"40%"}}/>
    </>
  )
}

export default Filtre