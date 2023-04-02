import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./getProfile.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Getprofile = () => {
  const { currentUser } = useContext(AuthContext);
  const [produit, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showdelete , setShowDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/produits/${currentUser.user._id}`
      );
      setProduits(res.data);
      setLoading(false);
    };
    fetchData();
  });

  const showdeleteC = ()=>{
    if(showdelete===false){
      setShowDelete(true)
    }else{
      setShowDelete(false)
    }
  }

  console.log(produit);
  return (
    <>
      <h3>Votre Profile</h3>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Spinner animation="border" variant="primary" role="status"></Spinner>
        </div>
      ) : (
        <div className="content">
          {produit.length === 0 ? (
            <h3 style={{textAlign : "center"}}>aucun produit</h3>
          ) : (
            produit.map((item) => (
              <div className="product" key={item?._id}>
                <img
                  className="photoP"
                  src={currentUser.user.photoP.url}
                  alt=""
                />
                <span>{currentUser.user.name}</span>
                <span>
                  <img
                    src={item?.photoProduit.url}
                    alt=""
                    style={{ width: "200px", height: "150px" }}
                  />
                </span>

                <p>{item?.title}</p>
                <p>marque : {item?.marque}</p>
                <p>
                  <b>prix : {item?.price} DT</b>
                </p>
                <div className="Modification">
                  <button className="edit">Modifier</button>
                  <button className="delete" onClick={showdeleteC} >Supprimer</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {
  showdelete ? (
    <div className="formdelete">
    <h3>vous etes sur de suppimer ce produit !</h3>
    <button className="oui" >oui</button>
    <button className="nonc" onClick={showdeleteC}>non</button>
    </div>
  ) : ""
}
    </>
  );
};

export default Getprofile;
