


export const removeItem =(product)=>dispatch =>{
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): []
    console.log(cart)
    
    const updatedcart = cart.filter((cartItem)=>cartItem.title !== product.title)
                
    localStorage.setItem("cart", JSON.stringify(updatedcart))

    dispatch({
      type:"remove",
      payload:updatedcart,
    })
};


export const addItem =(product,amount) => dispatch =>{

    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []

    const exist =cart.filter(cartItem => cartItem.title === product.title)

    if(exist.length === 0){
        const Addproduct ={
            ...product,
            amount: amount,
        }
    
        cart.push(Addproduct)

        localStorage.setItem("cart",JSON.stringify(cart))

    }
    dispatch({
        type: "addItem",
        payload: cart
    })
}