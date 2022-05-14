import React,{useState} from 'react'
import "../style/login.css"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const Login = () =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errormessage, setErrormessage] = useState("")

    const auth = getAuth();
    const navigate = useNavigate()


    const onSubmit=(e)=>{
        e.preventDefault()

        signInWithEmailAndPassword(auth, email,password).then(()=>{
                navigate("/products")
            })
            .catch((error) =>{
                switch(error.code){
                    case "auth/invalid-email":
                        setErrormessage("信箱格式不正確")
                        break;
                    case "auth/user-not-found":
                        setErrormessage("信箱格式不正確")
                        break;
                    case "auth/wrong-password":
                        setErrormessage("密碼錯誤")
                        break;
                        default:
                }
            })
    }

  return (
    <div className='login'>
        <h3>登入帳戶</h3>
        <form onSubmit={onSubmit} className='login-form'>
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

            <button>登入</button>
        </form>
    </div>
  )
}

export default Login