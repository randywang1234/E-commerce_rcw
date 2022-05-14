import React,{useState} from 'react'
import "../style/login.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const Signin = () =>{


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errormessage, setErrormessage] = useState("")
    const navigate = useNavigate()

    const auth = getAuth()

    const onSubmit=(e)=>{
        e.preventDefault()
        createUserWithEmailAndPassword(auth,email,password).then(()=>{
                navigate("/products")
            })
            .catch((error) =>{
                switch(error.code){
                    case "auth/email-already-in-use":
                        setErrormessage("信箱已存在")
                        break;
                    case "auth/invalid-email":
                        setErrormessage("信箱格式不正確")
                        break;
                    case "auth/weak-password":
                        setErrormessage("密碼強度不足")
                        break;
                        default:
                }
            })
    }



  return (
    <div className='login'>
        <h3>創建帳戶</h3>
        <form onSubmit={onSubmit}>
            <input 
            type="email"
            placeholder='Email address'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            {errormessage && <span className="errormessage">{errormessage}</span>}
            <button>註冊</button>
        </form>
    </div>
  )
}

export default Signin