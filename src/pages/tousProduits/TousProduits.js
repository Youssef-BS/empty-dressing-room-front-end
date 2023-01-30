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
  

  return (
    <>
    <h1  style={{textAlign : "center" , marginTop : "24px" , fontSize:"28px"}}>Derniere Poste</h1>
    <div className='content'>
    

    {produits.map(item=>(
      <div className='product' key={item._id}>
        <span><img src={item.photoProduit.url} alt ="" /></span>
        
        <p>{item.title}</p>
        <p>marque : {item.marque}</p>
        <p><b>prix : {item.price} DT</b></p>
</div>

   
    
    ))}
        </div>
    </>
  )
}

export default TousProduits