


let initialstate ={
    cart:[]
}
if(localStorage.getItem("cart")){
    initialstate.cart = JSON.parse(localStorage.getItem("cart")) 
} else {
    initialstate.cart = []
}



const handleCart =(state=initialstate, action)=>{

    switch(action.type){
        case "addItem":
                return { cart:[...action.payload]}
        case "remove":
                return { cart:[...action.payload]}
        default: 
            return state
    }
   
}

export default handleCart