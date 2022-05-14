import React,{useEffect,useState} from 'react'
import "./style/header.css"
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged,signOut} from "firebase/auth";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useSelector} from 'react-redux'
import Logo from './img/logo.svg'



const Header = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [open, setOpen] = useState(false)
    const auth = getAuth();

    const carts = useSelector((state)=>state.cart.cart)
    console.log(carts)

    
    const ItemAmount = carts.reduce((currentSum, currentItem) => {
        currentSum += parseInt(currentItem.amount)
        return currentSum
    },0)



    useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
      console.log(currentUser)
      setUser(currentUser)
    })
    },[])


  return (
      <>
    <div className='header'>
        <div className='header-img' onClick={()=>navigate("/")}>
            <img src={Logo} alt=""/>
        </div>
        {user ? (
            <div className='header-list'>
                <div className='header-login' onClick={()=>navigate("cart")}>
                    <ShoppingCartIcon sx={{color:"white",fontSize:32}}/>
                    <div className='count'>
                        {ItemAmount}
                    </div>
                </div>

                <div className='header-login' onClick={()=>setOpen(!open)}>
                    <img src={user.photoURL ? user.photoURL : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                    <p>{user.email}</p>

                    {open && <div className='account-list'>
                        <ul>
                            <li onClick={()=>navigate('mydata')}>個人資料</li>
                            <li onClick={()=>navigate('myproduct')}>我的商品</li>
                            <li onClick={()=>navigate('newproduct')}>新增商品</li>
                        </ul>
                    </div>
                    }
                </div>

                <div className='header-login' onClick={()=>{
                    signOut(auth)
                    navigate("/")
                    }}>
                    登出
                </div>
            </div>
        ):(
            <div className='header-list'>
                <div className='header-login' >
                    <ShoppingCartIcon sx={{color:"white"}}/>
                </div>
                <div className='header-login' onClick={()=>navigate("/login")}>
                    登入
                </div>
                <div className='header-login' onClick={()=>navigate("/signin")}>
                    註冊
                </div>
            </div>
                )}
    </div>
    
    </>
  )
}

export default Header