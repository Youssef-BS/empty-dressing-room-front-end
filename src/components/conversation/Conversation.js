import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/authContext";


const Conversation = () => {
    const params = useParams();
    const [myconversation , setMyConversation] = useState([])
    const { currentUser } = useContext(AuthContext);
    const [conversation, setConversation] = useState([]);
    const [msg, setMsg] = useState("");

  
    // pour afficher la conversation
    const fetchMsg = async (e) => {
  
      try {
        const res = await axios.get(
          `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${params.id}`
        );
        setConversation(res.data);
        setTimeout(fetchMsg, 1000);
      } catch (error) {
        console.error(error);
        if (error.response.status === 500) {
          alert("Server Error. Please try again later.");
        }
        setTimeout(fetchMsg, 1000);
      }
    };
    useEffect(() => {
      fetchMsg();
    }, []);
    
    // myconv
    useEffect(()=>{
      const MyConversation = async ()=>{
      
      const res = await axios.get(`http://localhost:4000/api/msg/msgSend/${currentUser.user._id}`)
      setMyConversation(res.data.myProduct)
      
      }
      MyConversation()
      },[])
      
      
  
    //fonction pour envoyer un message
    const sendMessage = async (e) => {
      e.preventDefault()
      try {
        const formData = new FormData();
        formData.append("content", msg);
        await axios.post(
          `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${params.id}/${params.idproduct}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMsg("");
      } catch (error) {
        console.log(error);
      }
  
    };
    console.log(myconversation)
  
    return (
      <>
       
  
    
            <Form>
              
            {conversation.map((message) => (
              
  <p style={{ color: currentUser ? "red" : "black" , textAlign : currentUser ? "right" : "left"}}>{message}</p>
    
  ))}
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ecrire message ici</Form.Label>
                <Form.Control as="textarea" rows={1} onChange={(e)=> setMsg(e.target.value)} />
              </Form.Group>
    
            <input type='button' variant="primary" className="BtnForm"  value="envoyer" onClick={sendMessage} />
               
            </Form>
   
    
        
        
           
          </>
      )
  
}



export default Conversation