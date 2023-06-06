import React , {useState , useEffect , useContext} from 'react'
import axios from "axios";
import { useParams , Link} from 'react-router-dom';
import { Spinner  } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';
import { AuthContext } from "../../context/authContext";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  iconFilled: {
    color: 'gold',
  },
});


const ProfileUser = () => {
    const { currentUser } = useContext(AuthContext);
    const params = useParams();
    const [profile , setProfile] = useState([]);
    const [loading , setLoading] = useState(true);
    const [star, setStar] = useState(0);
    // const [rateUser , setRateUser] = useState("");
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
  console.log(currentUser.user._id);

  const rate = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/users/rateuser/s/${currentUser.user._id}/${params.id}`,
        {star :star}
      );
      console.log('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
console.log(star)
  return (
    <>
    { loading ?(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' , margin : "auto" }}>
        <Spinner animation="border" variant="primary" role="status">
        </Spinner>
      </div>
    ):(<>
 <div className='container-user'>
  <img src={profile.photo.url} alt='profilephoto' style={{ width: "80px", height : "80px" , borderRadius: "50%" }} />
  <h1>Profile de {profile.name}</h1>
  <p>adresse email : {profile.email}</p>
  {currentUser.user._id === params.id
  
  ?
    (
      <p>c'est ton profile</p>
    ) :
    (
      <>
        <p>évaluation</p>
        <Rating
          name="star-rating"
          value={star}
          precision={0.5}
          onChange={(event, newValue) => {
            setStar(newValue.toString());
          }}
          classes={{
            iconFilled: classes.iconFilled,
          }}
        />
        <p></p>
        {star !== 0 && (
          <>
            <button className='Btn' onClick={rate}>envoyer</button>
          </>
        )}
      </>
    )
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