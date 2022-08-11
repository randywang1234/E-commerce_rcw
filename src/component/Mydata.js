import React,{useState,useEffect} from 'react'
import "../style/mydata.css"
import { getAuth,updateProfile,onAuthStateChanged,updatePassword ,EmailAuthProvider,reauthenticateWithCredential} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";


function Photo ({user}){
  const storage = getStorage()

  const [modalOpen, setModalOpen] = useState(false)
  const [file, setFile] = useState(null)

  const onSubmit = () =>{
      const metaType ={
            contentType:file.type
        } 
      const fileRef =ref(storage, "user-photos/" + user.uid)
      const uploadTask = uploadBytes(fileRef, file, metaType)
          uploadTask.then(()=>{
                getDownloadURL(fileRef).then((imageUrl)=>{
                    updateProfile(user,{
                      photoURL: imageUrl
                        }).then(()=>{
                        setModalOpen(false)
                        setFile("")
                      })
                })
            }) 
  }

  return (
    <>
    <div className='mydata-list'>
          <div className='mydata-list-photo'>
            <img className="mydata-photo" src={user.photoURL ? user.photoURL : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
          </div>
          <button onClick={()=>setModalOpen(!modalOpen)}>修改</button>
    </div>
    { modalOpen &&
    
      <div className='modal-name'>
        <div className='modal-center'>
          <p>修改會員名稱</p>
          <div className='modal-newphoto'>
            <img src={file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
          </div>
          <input type="file" placeholder='請輸入新的會員名稱' onChange={(e)=>setFile(e.target.files[0])}/>
          <div className='modal-btn'>
            <button onClick={()=>setModalOpen(false)}>取消</button>
            <button onClick={onSubmit}>修改</button>
          </div>
        </div>
      </div>
    }
    </>
  )
}





function Name ({user}){

  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState("")

  const onSubmit =()=>{
    updateProfile(user,{
      displayName:name
    }).then(()=>{
      setModalOpen(false)
      setName("")
    })
  }

  return (
    <>
    <div className='mydata-list'>
          <p>名稱:</p>
          <span>{user.displayName ? user.displayName : "使用者"}</span>
          <button onClick={()=>setModalOpen(!modalOpen)}>修改</button>
    </div>

    { modalOpen &&
      <div className='modal-name'>
          <div className='modal-center'>
            <p>修改會員名稱</p>
            <input type="text" placeholder='請輸入新的會員名稱' value={name} onChange={(e)=>setName(e.target.value)}/>
            <div className='modal-btn'>
              <button onClick={()=>setModalOpen(false)}>取消</button>
              <button onClick={onSubmit}>修改</button>
            </div>
          </div>
        </div>
    }
    </>
  )
}




function Password ({user}){

    const [modalOpen, setModalOpen] = useState(false)
    const [oldpassword, setOldpassword] = useState("")
    const [newpassword, setNewpassword] = useState("")


    const onSubmit = () =>{
      const cred = EmailAuthProvider.credential(
          user.email,
          oldpassword
      );
      reauthenticateWithCredential(user,cred).then(()=>{
        updatePassword(user,newpassword).then(()=>{
          setModalOpen(false)
          setOldpassword("")
          setNewpassword("")
      })
      })
      
    }
  return(
    <>
    <div className='mydata-list'>
          <p>密碼:</p>
          <span>******</span>
          <button onClick={()=>setModalOpen(!modalOpen)}>修改</button>
    </div>
    { modalOpen &&
      <div className='modal-name'>
          <div className='modal-center'>
            <p>修改會員密碼</p>
            <span>目前密碼</span>
            <input className="password" type="text" placeholder='請輸入舊的會員密碼' value={oldpassword} onChange={(e)=>setOldpassword(e.target.value)}/>
            <span>新密碼</span>
            <input type="text" placeholder='請輸入新的會員密碼' value={newpassword} onChange={(e)=>setNewpassword(e.target.value)}/>
            <div className='modal-btn'>
              <button onClick={()=>setModalOpen(false)}>取消</button>
              <button onClick={onSubmit}>修改</button>
            </div>
          </div>
        </div>
    }
    </>
  )
}

const Mydata = ()=>{
      
  const [user, setUser] = useState("")

  const auth = getAuth();

  useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
      console.log(currentUser)
      setUser(currentUser)
    })
    },[])
    
  return (
    <div className='mydata'>
      <div className='mydata-container'>
        <Photo user={user}/>
        <Name user={user}/>
        <Password user={user}/>
      </div>
    </div>
  )
}

export default Mydata