import React,{useState,useEffect} from 'react'
import "../style/newproduct.css"
import { getFirestore , collection, onSnapshot,doc, setDoc,serverTimestamp } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { useNavigate } from 'react-router-dom';



const Newproduct = () => {

  const db = getFirestore()
  const storage = getStorage()
  const auth = getAuth()
  const navigate = useNavigate()


  const[title, setTitle] =useState("")
  const[description,setDescription] = useState("")
  const[price,setPrice] = useState("")
  const[count, setCount] = useState("")
  const[topics,setTopics] = useState([])
  const[category, setCategory] = useState("請選擇")
  const[file, setFile] = useState(null)


  useEffect(()=>{
    const data = onSnapshot(collection(db,"categories"), (snapshot)=>{
        return setTopics(snapshot.docs.map((doc)=> doc.data()))
    })
    console.log(topics)
  },[])



  const onSubmit = (e) =>{
      e.preventDefault()
      const metaType ={
            contentType:file.type
        }
        const productRef = doc(collection(db,"products"))
        console.log(productRef.id)
        const storageRef =ref(storage, "product-images/" + productRef.id)
        const uploadTask = uploadBytes(storageRef, file, metaType)
        uploadTask.then(()=>{
            getDownloadURL(storageRef).then((image)=>{
                setDoc(productRef,{
                  title:title,
                  description:description,
                  createAt:serverTimestamp(),
                  price:price,
                  category:category,
                  image,
                  rating:{
                    count:count,
                  },
                  author:{
                    displayName:auth.currentUser.displayName || "",
                    photoURL:auth.currentUser.photoURL || "",
                    uid:auth.currentUser.uid,
                    email:auth.currentUser.email,
                  },
                }).then(()=>{
                    navigate("/products")
              })
            })
        })     
  }


  return (
    <div className='newproduct'>
      <h3>新增商品</h3>
      <div className='newproduct-list'>
        <form className='newproduct-list-content' onSubmit={onSubmit}>
          <img src={file ? URL.createObjectURL(file) :"https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
          <div className='newproduct-list-content-detail'>
            <input name="" type="file" onChange={(e)=>setFile(e.target.files[0])}/>
            <div>
              <p>商品名稱:</p>
              <textarea value={title} placeholder="輸入商品名稱" onChange={(e)=>setTitle(e.target.value)}/>
              <p>商品描述:</p>
              <textarea value={description} placeholder="輸入商品描述" onChange={(e)=>setDescription(e.target.value)}/>
              <p>價錢:</p>
              <textarea value={price} placeholder="輸入價錢" onChange={(e)=>setPrice(e.target.value)}/>
              <p>庫存量:</p>
              <textarea value={count} placeholder="輸入庫存量" onChange={(e)=>setCount(e.target.value)}/>
              <select placeholder="類型" value={category} onChange={(e)=>setCategory(e.target.value)}>
                {topics.map((topic)=>{
                    return <option key={topic.category}>{topic.category}</option>
                    })}
              </select>
              <button>送出</button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default Newproduct