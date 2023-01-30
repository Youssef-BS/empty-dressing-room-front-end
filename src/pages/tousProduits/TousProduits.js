import React,{useState , useEffect} from 'react';
import "./tousProduits.css";
import axios from "axios";

const TousProduits = () => {

  const [produits , setProoduits] = useState([]);

  useEffect(()=>{
   
    const fetchData = async () =>{
      try{
       const res = await axios.get("http://localhost:4000/api/produits");
       setProoduits(res.data)
      }catch(error){
        console.log(error)
      }
      
    } 

    fetchData();
   
  })
  
// console.log(produits[0].desc)
  return (
    <>
    <h1  style={{textAlign : "center" , marginTop : "24px" , fontSize:"28px"}}>Derniere Poste</h1>
    <div className='content'>
    

    {produits.map(item=>(
      
      <div className='product' key={item._id}>
        <p>{item.desc}</p>
        <p>{item.categorieItem}</p>
        <p>{item.categorieItem}</p>
        <p><b>{item.price} DT</b></p>
</div>

   
    
    ))}
        </div>
    </>
  )
}

export default TousProduits