import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../style/cart.css"
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import{removeItem} from "../action/action"



const Cart = () => {


  const dispatch  = useDispatch()
  const carts = useSelector((state)=>state.cart.cart)

  console.log(carts)


   const handleQtyChange =(product,e)=> {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): []
    
    cart.forEach((cartItem)=>{
                    if(cartItem.title === product.title){
                        cartItem.amount = e.target.value;
                    }                 
                })

    localStorage.setItem("cart", JSON.stringify(cart))

    dispatch({
      type:"addItem",
      payload:cart,
    })
};

  
  return (
    <div className='carts'>
      <p className='empty'>購物車</p>
      { carts.length === 0 ?
        <div className='carts-empty'>
          <p >購物車為空</p>
          <Link to="/products">
            <button className='empty-btn'>選擇商品</button>
          </Link>
        </div>
        :(
          <>
          <div className='carts-area'>
            <div className='carts-type'>
              <ul>
                <li>商品</li>
                <li>數量</li>
                <li>價格</li>
              </ul>
            </div>
            <div className='carts-list'>

              
              {carts.map((cart)=>{
                return (
                  <div className='carts-content' key={cart.title}>
                    <img src={cart.image} alt="" />
                    <p className='title'>{cart.title}</p>
                    <div className='carts-amount'>
                        <input
                          className='amount'
                          value={cart.amount}
                          min="1"
                          max={cart.rating.count}
                          type="number"
                          onChange={(e)=>handleQtyChange(cart,e)}
                        />
                    </div>
                    <p className='price'>{parseInt(cart.amount * cart.price)}$</p>
                    <p className='delete'>
                      <DeleteForeverIcon sx={{color:"#D16D6A"}} onClick={()=>dispatch(removeItem(cart))}/>
                    </p>
                  </div>
                
                )
              })}
            </div>
          </div>
           <div className='carts-total'>
                 <p>金額:</p>
                 <p>{carts.reduce((currentSum, currentCartItem) => currentSum + currentCartItem.amount * currentCartItem.price , 0).toFixed(2)} $</p>
           </div>


           
           <div className='carts-pay'>
             <Link to="">
              <button onClick={()=> alert("購買成功")}>結帳</button>
            </Link>
           </div>
          </>
        )}
    </div>
  )
}

export default Cart