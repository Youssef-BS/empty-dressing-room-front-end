import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useParams , useNavigate } from "react-router-dom";

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
  const [showFormUpdateProfile , setShowFormUpdateProfile] = useState(false);
  const [profile, setProfile] = useState([]);
  const [nom , setNom] = useState("");
  const [email,setEmail] = useState("");
  const [motpasse,setMotPasse] = useState("");
  const navigate = useNavigate();

const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/produits/${params.iduser}`
      );
      setProduits(res.data);
      setLoading(false);
    };
    fetchData();
  }, [params.iduser]);
 

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

const updateMyProduct = async () =>{
  const updatedProduct = { title, price, categorie ,taille, marque , desc};
  await axios.put(`http://localhost:4000/api/produits/updatemyproduct/${currentUser.user._id}/${idProduct}` ,updatedProduct)

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


  const  updateInformation=()=> {
    if (showFormUpdateProfile === false) {
      setShowFormUpdateProfile(true);
    } else {
      setShowFormUpdateProfile(false);
    }
  }

//get my profile

useEffect(()=>{
  const fetchProfile = async()=>{
   const res = await axios.get(`http://localhost:4000/api/users/${params.iduser}`);
   setProfile(res.data);
  }
  fetchProfile();
},[params.iduser])


// update profile

const updateProfile = async () => {
await axios.put(`http://localhost:4000/api/users/${params.iduser}`,{
  nom , email , motpasse
});
window.location.reload(false);
}

//switch page function
const switchPage = async () => {
  await navigate("/AddProduits");
}

  return (
    <>
    <div className="mini-nav">
    <p className="name">{profile.name}</p>
    <p className="email">{profile.email}</p>
    <p className="points"><b>{profile.points}</b> points</p>
    <p onClick={updateInformation} className="edit">modifier les information personelle</p>
    <p className="addProduct" onClick={switchPage}>Ajouter article</p>
   
  {showFormUpdateProfile ? 
  (<div className="formupdate">
  <h2>Modifier Mes informations</h2>
  <input type="text" placeholder="modifier nom" value={nom} onChange={(e) =>  setNom(e.target.value)} />
  <input type="email" placeholder="modifier email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <input type="password" placeholder="modifier mot de passe" value={motpasse} onChange={(e) => setMotPasse(e.target.value)} />
  <div className="update-no">
    <button className="oui" onClick={updateProfile}>modifier</button>
    <button onClick={updateInformation} className="nonc">annuler</button>
  </div>
</div>
)
 :
"" 
  
  }
    </div>
    { showFormUpdate ? 
    (
<div className="formupdate">
      <h2>modifier ce produit</h2>
      <input type="text" placeholder="modifier titre" value={title} onChange={(e) =>  setTitle(e.target.value)} />
      <input type="number" placeholder="modifier price" value={price} onChange={(e) => setPrice(e.target.value)} />
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
        <button className="oui" onClick={updateMyProduct}>modifier</button>
        <button onClick={showupdate} className="nonc">annuler</button>
      </div>
    </div>
    ) : ""
}
      <h3>Votre Produits</h3>

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
               {item.isFetch===false ? <p style={{color : "yellow"}}>Etat en attente</p>:<p style={{color : "green"}}>Etat accepter</p>}
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
                  <button className="edit" onClick={() =>{showupdate() ;  setIdProduct(item?._id)}}>Modifier</button>
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
