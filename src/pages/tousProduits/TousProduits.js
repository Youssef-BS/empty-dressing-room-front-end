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
    {produits.map(item=>(
      
        <div className='contain' key={item._id}>
          <p>{item.desc}</p>
  </div>
    
    ))}
    </>
  )
}

export default TousProduits