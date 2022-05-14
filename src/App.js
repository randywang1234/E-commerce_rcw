import './App.css';
import React,{useState, useEffect} from 'react';
import { getAuth,onAuthStateChanged} from "firebase/auth";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import Products from './component/Products'
import Login from './component/Login'
import Signin from './component/Signin'
import Mydata from './component/Mydata'
import Myproduct from './component/Myproduct'
import Newproduct from './component/Newproduct'
import Singleproduct from './page/Singleproduct'
import Cart from './component/Cart'


function App() {




  // const [products, setProducts] = useState([])

  // const Fetchdata = ()=>{
  //   fetch('https://fakestoreapi.com/products?limit=50')
  //           .then(res=>res.json())
  //           .then(json=>{
  //             setProducts(json)
  //           })
  //           console.log(products)
  // }

  
  

    // const onClick = ()=>{
    // products.map((product)=>{
    //   const {title, description,category,price,rating,image} = product
    //   const productref = doc(collection(db, "products"))
    //       return setDoc(productref,{
    //         title:title,
    //         description:description,
    //         category:category,
    //         price:price,
    //         rating:{
    //           count:rating.count,
    //           rate:rating.rate
    //         },
    //         image:image
    //       })
    //     })
    // }
    
    

  // useEffect(()=>{
  //   Fetchdata()
  // },[])

  const [user, setUser] = useState("")

  const auth = getAuth();

  useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
      console.log(currentUser)
      setUser(currentUser)
    })
    },[])
  

  return (

    



    <BrowserRouter>
    <div className="App">
      <Header />
      {/* <Test products={products}/> */}
      {/* <button onClick={onClick}>提交</button> */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:productId" element={<Singleproduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route path="/mydata" element={<Mydata />} />
        <Route path="/myproduct" element={<Myproduct />} />
        <Route path="/newproduct" element={<Newproduct />} />
        

        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
