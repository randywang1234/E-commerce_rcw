import React,{useState,useEffect} from 'react';
import { getFirestore , collection, onSnapshot, where,query } from "firebase/firestore"
import firebase from "../utils/firebase"
import { getAuth,onAuthStateChanged} from "firebase/auth";
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from 'react-router-dom'



const Myproduct = () => {
    
  
  const db = getFirestore(firebase)
  const auth = getAuth();
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [user, setUser] = useState("")

  


  useEffect(()=>{
          const mypostRef = query(collection(db,"products"), where("author.uid", "==", auth.currentUser.uid))
        onSnapshot(mypostRef,(snapshot)=>{
            const data = snapshot.docs.map((doc)=>{
                const id = doc.id
                return {...doc.data(), id}
            })  
            setProducts(data)
        })


            onAuthStateChanged(auth,currentUser=>{
          setUser(currentUser)
            })

       },[])

        
  return (
    <>
    {user ? 
      (
        <div className='product'> 
        <div className='product-postion'>
        { products.length > 0 ? products.map((product)=>{
            return (
                    <div className='product-list' key={product.id} onClick={()=> navigate(`products/${product.id}`)}>
                        <img src={product.image} alt={product.title}/>
                        <h3>{product.title}</h3>
                        <div className='product-info'>
                            <span className='product-price'>{product.price}$</span>
                            <span className='product-rate'>{product.rating.rate}</span>
                            <StarIcon sx={{color:"yellow"}}/>
                        </div>
                    </div>
            )
        }) : (<div className='loading'>
                <p>資料載入中...</p>
              </div>)}
        </div>
    </div>
      ) : 
      <div className='loading'>請先登入會員</div>
    }
    </>
  )
}

export default Myproduct