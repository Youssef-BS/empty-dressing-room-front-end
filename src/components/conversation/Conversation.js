import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./conversation.css";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/authContext";
import { Spinner } from "react-bootstrap";
import io from "socket.io-client";

const Conversation = () => {
  const params = useParams();
  const [conversation, setConversation] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  const fetchConversation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/msg/msgSend/${currentUser.user._id}/${params.id}`
      );
      setConversation(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        alert("Server Error. Please try again later.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    fetchConversation();
  }, [currentUser.user._id, params.id]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      socket.on("receiveMessage", (message) => {
        console.log("Received message:", message);
        setConversation((prevConversation) => [...prevConversation, message]);
      });
    }
  }, [socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (msg.trim() === "") return;
  
    if (socket) {
      const newMessage = {
        conversation: {
          _id: "temp_id", // Temporary ID for the new message
          content: msg,
        },
        Me: true, // Assuming the new message is sent by the current user
      };
      setMsg("");
      // Update conversation state immediately with the new message
      setConversation((prevConversation) => [...prevConversation, newMessage]);
  
      // Emit the message through the socket
      socket.emit("sendMessage", {
        content: msg,
        user: currentUser.user._id,
        to: params.id,
      });
  
      try {
        await axios.post("http://localhost:4000/api/msg", {
          content: msg,
          user: currentUser.user._id,
          to: params.id,
        });
      
        
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 500) {
          alert("Server Error. Please try again later.");
        }
      }
    }
  };


  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchConversation();
    }, 0);

    return () => clearInterval(interval);
  }, [conversation]);

  return (
    <>
      {loading ? (
        <Spinner style={{ margin: "10% 48%", color: "blue" }}></Spinner>
      ) : (
        <Form className="conversation">
          {conversation.slice(-7).map((message) => (
            <p
              style={{
                color: "black",
                borderRadius: "25px",
              }}
              className="msgSendd"
              key={message.conversation._id}
            >
              <p
                style={{
                  width: "100%",
                  marginTop: "3px",
                  textAlign: message.Me ? "right" : "left",
                  paddingTop: "5px",
                }}
              >
                <div>
                
                <span
                  style={{
                    color: message.Me ? "white" : "black",
                    backgroundColor: message.Me ? "gray" : "none",
                    borderRadius: "12px",
                    padding: "12px",
                    margin: "8px",
                    textAlign: "left",
                  }}
                >
                  {message.conversation.content}
                  
                </span><br /><br />
                 <span>{message.conversation.createdAt}</span>
                </div>
              </p>
            </p>
          ))}
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="msgSend"
              style={{width : "70%" , border:"1px solid gray" , borderRadius : "20px" , padding :"12px"}}
              placeholder="ecrire un message...."
              
            />
            <button className="send" onClick={sendMessage}>
              Send
            </button>
          </div>
        </Form>
      )}
    </>
  );
};

export default Conversation;
