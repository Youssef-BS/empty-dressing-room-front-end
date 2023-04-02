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
  const [idProduct , setIdProduct] = useState("");
  const [showFormUpdate , setShowFormUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categorie, setCategory] = useState("sans categories");
  const [taille, setSize] = useState("");
  const [marque, setBrand] = useState("");
  const [desc , setDesc]=useState("");

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

const deleteMyproduct = async () =>{
  await axios.delete(`http://localhost:4000/api/produits/deletemyproduct/${currentUser.user._id}/${idProduct}`)
  window.location.reload(false);
}

const showupdate = ()=>{
  if(showFormUpdate === false){
    setShowFormUpdate(true)
  }
  else {
    setShowFormUpdate(false)
  }
  
}
  return (
    <>
    { showFormUpdate ? 
    (
<div className="formupdate">
      <h2>modifier ce produit</h2>
      <input type="text" placeholder="modifier titre" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="modifier price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <select value={categorie} onChange={(e) => setCategory(e.target.value)}>
        <option value="sans categories">Sans categorie</option>
        <option value="femmes">Femmes</option>
        <option value="hommes">Hommes</option>
        <option value="enfants">Enfants</option>
        <option value="animaux">Animaux</option>
        <option value="electroniques">Electroniques</option>
        <option value="maison">Maison</option>
      </select>
      <br />
    
      <input type="text" placeholder="modifier taille" value={taille} onChange={(e) => setSize(e.target.value)} />
      <input type="text" placeholder="modifier marque" value={marque} onChange={(e) => setBrand(e.target.value)} />
      <input type="text" placeholder="modifier description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <div className="update-no">
        <button className="oui">modifier</button>
        <button onClick={showupdate} className="nonc">annuler</button>
      </div>
    </div>
    ) : ""
}
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
                  <button className="edit" onClick={showupdate}>Modifier</button>
                  <button className="delete" onClick={() => {showdeleteC(); setIdProduct(item?._id)}}>Supprimer</button>
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
    <button className="oui" onClick={deleteMyproduct} >oui</button>
    <button className="nonc" onClick={showdeleteC}>non</button>
    </div>
  ) : ""
}



    </>
  );
};

export default Getprofile;
