import React , {useState , useEffect} from 'react'
import axios from "axios";
import { useParams , Link} from 'react-router-dom';
import { Spinner  } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  iconFilled: {
    color: 'gold',
  },
});


const ProfileUser = () => {
    const params = useParams();
    const [profile , setProfile] = useState([]);
    const [loading , setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const classes = useStyles(); 

  useEffect(() => {
    const fetchData = async ()=>{
    const res =await axios.get(`http://localhost:4000/api/users/getprofile/user/${params.id}`);
    setProfile(res.data);
    setLoading(false);
    }
    fetchData()
  },[params.id]);

  console.log(profile)


  return (
    <>
    { loading ?(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' , margin : "auto" }}>
        <Spinner animation="border" variant="primary" role="status">
        </Spinner>
      </div>
    ):(<>
    <div className='container-user'>
        <img src={profile.photo.url} alt='profilephoto' style={{width : "80px" , borderRadius:"50%"}}/>
        <h1>Profile de {profile.name}</h1>
        <p>adresse email : {profile.email}</p>
        <p>évaluation</p>
        <Rating
      name="star-rating"
      value={value}
      precision={0.5}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      classes={{
        iconFilled: classes.iconFilled,
      }}
      
    />
    <p></p>
    {
      value !== 0 ? (
      <>
      <button className='Btn'>envoyer</button>
      </>
      ) :""
    }
      

    </div>
    { profile.product.map(product=> (
        <Link to={`/productWatch/${product._id}`} style={{ color: 'black' }} key={product._id}>
       <div className='product'>
         <img style={{ width: '250px', height: '200px' }} src={product.photoProduit.url} alt="" />
                <p>{product.title}</p>
                <p>Marque: {product.marque}</p>
                {product.vende ? (
                  <p style={{ color: '#1abc9c' }}>Produit vendu</p>
                ) : (
                  <p>
                    <b style={{ color: '#1abc9c' }}>Prix: {product.price} DT</b>
                  </p>
                )}
       </div> 
       </Link>
    ))

    }
    </>
  )}
  </>
  )
}

export default ProfileUser