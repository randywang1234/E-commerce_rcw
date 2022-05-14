import React,{useState,useEffect} from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {  getFirestore , onSnapshot,doc,writeBatch, increment, Timestamp ,collection} from "firebase/firestore"
import { getAuth,onAuthStateChanged} from "firebase/auth";
import "../style/singleproduct.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useSelector, useDispatch} from 'react-redux'
import{addItem} from "../action/action"
import {Link} from "react-router-dom"

const Singleproduct = () =>{

    const{productId} = useParams()
    const db = getFirestore()
    const auth = getAuth()
    const batch = writeBatch(db)
    const navigate = Navigate()
    
    const dispatch = useDispatch()

    const cart = useSelector((state)=> state.cart)
    console.log(cart)
    console.log(auth)
    

    const [singleProducts, setSingleProducts] = useState([])
    const [amount, setAmount] = useState(1)
    const [commentscontent,setCommentscontent] = useState("")
    const [comments, setComments] = useState([])
    const [user, setUser] = useState("")

    
    useEffect(()=>{
            onAuthStateChanged(auth,currentUser=>{
                console.log(currentUser)
                setUser(currentUser)
            })
        },[])
    



    const hanleAddtoCart =()=>{
        dispatch(addItem(singleProducts,amount))
        if(!user){
            alert("請先登入會員")
            navigate("/")
        }
    }


    const Increase =()=>{
        setAmount(()=>{
            const prev = amount
            if(amount > singleProducts.rating.count){
                return singleProducts.rating.count
            }else{
                return prev + 1
            }
        })
    }
    const Decrease =()=>{
        setAmount(()=>{
            const prev = amount
            if(amount < 2){
                return 1
            }else{
                return prev - 1
            }
        })    
    }

    useEffect(()=>{
            onSnapshot(doc(db,"products",`${productId}`),(snapshot) =>{
                const data = snapshot.data()
                console.log(data)
            setSingleProducts(data)
            
        })
    },[])
    console.log(singleProducts)
    


    const onSubmit=(e)=>{
        e.preventDefault()
        const productsRef = doc(db,"products",productId)
        batch.update(productsRef,{
            commentsCount: increment(1)
        });
        const commentRef =  doc(collection(productsRef, "comments"))
        batch.set(commentRef ,{
            content:commentscontent,
            createAt:Timestamp.now(),
            author:{
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName || "",
                photoUrl: auth.currentUser.photoURL || "",
            }
        })
        batch.commit().then(()=>{
            setCommentscontent("")
        })
    }



    useEffect(()=>{
        const productsRef = doc(db,"products",productId)
        const commentRef =collection(productsRef,"comments")
         onSnapshot(commentRef,(snapshot)=>{
             const data = snapshot.docs.map((doc)=>{
                return doc.data()
             })
             setComments(data)
             
         })

    },[])

    console.log(comments)
    console.log(singleProducts.commentsCount)




  return (
      <>
    <div className='singleproduct'>
        { singleProducts.length !== 0 ? (
        <>
        <div className='singleproduct-img'>
            <img src={singleProducts.image} alt={singleProducts.title}/>
        </div>
        <div className='singleproduct-content'>
            <div className='singleproduct-content-info'>
                <h3>商品名稱</h3>
                <p>{singleProducts.title}</p>
                <h3>描述</h3>
                <p>{singleProducts.description}</p>
            </div>
            <div className='singleproduct-content-count'>
                <button onClick={Decrease}><RemoveIcon sx={{ fontSize: 20 }} /></button>
                <span className='counter'>{amount}</span>
                <button onClick={Increase}><AddIcon /></button>
                <p>{singleProducts.price}$</p>
            </div>
            <div className='singleproduct-content-button'>
                <button onClick={hanleAddtoCart}>加入購物車</button>
                <Link to="/cart">
                    <button onClick={hanleAddtoCart}>直接購買</button>
                </Link>

            </div>
        </div>
        </>) :
        <div className='loading'>資料載入中...</div>
        }
    </div>

    <div className='comments'>
        <p>留言評論區</p>
        <form>
            <textarea placeholder="請輸入評論" value={commentscontent} onChange={(e)=>setCommentscontent(e.target.value)}/>
                <div className='comments-btn'>
                    <button onClick={onSubmit}>送出</button>
                </div>
        </form>
    </div>

    <div className='comments-count'>
        { singleProducts.commentsCount === "undefined" ? 
            (<div className='comments-reminds'>
                請留言
            </div>
            ) :
            <p>共 {singleProducts.commentsCount || 0 } 則留言</p>
        }
    </div>

    {comments.map((comment)=>{
        return (
            <div className='comments-lists'>
                <div className='comments-img'>
                    <img src={comment.author.photoUrl} alt="" />
                </div>
        
                <div className='comments-content'>
                    <div className='comments-content-info'>
                        <span>{comment.author.displayName || "使用者"} · {new Date(comment.createAt.seconds*1000).toLocaleString()}</span>
                        <p>{comment.content}</p>
                    </div>
                </div>
            </div>
        )
    })}
    </>
  )
}

export default Singleproduct