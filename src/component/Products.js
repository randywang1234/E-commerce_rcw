import React,{useState,useEffect} from 'react';
import { getFirestore , collection, onSnapshot, where,query } from "firebase/firestore"
import firebase from "../utils/firebase"
import "../style/product.css"
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from 'react-router-dom'
import Pagination from './Pagination'



const Products = () =>{
        const navigate = useNavigate()
       const db = getFirestore(firebase)
        const [products, setProducts] = useState([])
        const [categories, setCatergories] = useState([])

        const [currentPage, setCurrentPage] = useState(1)
        const [productPerPage, serProductPerPage] = useState(7)

       useEffect(()=>{
        onSnapshot(collection(db,"categories"),(snapshot)=>{
            const data = snapshot.docs.map((doc)=>doc.data())
            setCatergories(data)
        })
        onSnapshot(collection(db,"products"),(snapshot)=>{
            const data = snapshot.docs.map((doc)=>{
                const id = doc.id
                return {...doc.data(), id}
            })
            
            setProducts(data)
        })
       },[])
       

       const onChangeCategories=(e)=>{
        if(e.target.innerHTML === "all"){
            onSnapshot(collection(db,"products"),(snapshot)=>{
            const data = snapshot.docs.map((doc)=>doc.data())
            setProducts(data)
        })
        } else{
            const postRef = query(collection(db,"products"), where("category", "==", e.target.innerHTML))

           onSnapshot(postRef,(snapshot)=>{
               const data = snapshot.docs.map((doc)=>doc.data())
                setProducts(data)
           })
        }
        
       }


        const indexOfLastPost = currentPage * productPerPage; //1 * 7 = 7 2 * 7 =14
        const indexOfFirstPost = indexOfLastPost - productPerPage; // 7-7 = 0 14 -7 =7
        const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

         const paginate = pageNumber => setCurrentPage(pageNumber);

      



  return (
    <div className='product'> 
        {categories.map((catogorie)=>{
            return <li onClick={onChangeCategories
            } key={catogorie.category} className='product-filter'>{catogorie.category}</li>
        })}



        <div className='product-postion'>

        { products.length > 0 ?
        
    
        currentPosts.map((product)=>{
            return (
                <>
                    <div className='product-list' key={product.id} onClick={()=> navigate(`${product.id}`)}>
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <div className='product-info'>
                            <span className='product-price'>{product.price}$</span>
                            <span className='product-rate'>{product.rating.rate}</span>
                            <StarIcon sx={{color:"yellow"}}/>
                        </div>
                    </div>
                </>
            )
        })  :   <div className='loading'>
                    <p>資料載入中...</p>
                </div>

        }
        </div>


        {
            products.length > 0 &&(
                <Pagination 
                productsPerPage={productPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            )

        }

    </div>
  )
}

export default Products