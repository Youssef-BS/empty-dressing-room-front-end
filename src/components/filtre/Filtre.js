import React from 'react'
import './filtre.css'
import Form from 'react-bootstrap/Form';

const Filtre = () => {

  return (
    <>
   
        <div className='filter'>
        
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>categorie</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    </div>
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>taille</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </div>
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>marque</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </div>
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>couleur</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </div>
        <div className='element'>
        <Form.Select aria-label="Default select example">
      <option>tirer par</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </div>

    </div>
    <hr  style={{"width":"40%"}}/>
    </>
  )
}

export default Filtre