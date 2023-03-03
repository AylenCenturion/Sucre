const cartMenu = document.querySelector(".cart");
const cartBtn = document.querySelector(".cartLogo");
const backBlur = document.querySelector(".blur");
const userMenu = document.querySelector(".userNav");
const userBtn = document.querySelector(".userLogo");
const navMenu = document.querySelector(".navMenu");
const burgerLogo = document.querySelector(".burgerLogo");
const closeCartBtn = document.querySelector(".close-cart");
const buyBtn = document.querySelector(".buyBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const productsCart = document.querySelector(".shoppingList");
const cartCount = document.querySelector(".cartCount");
const cartBottom = document.querySelector(".cartBottom");
const total = document.querySelector(".total");
const subtotal = document.querySelector(".subtotal");
const successModal = document.querySelector(".successModal");
const subscribeInput = document.querySelector(".subscribeInput");
const plane = document.querySelector(".send");


let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList))
};

let users = JSON.parse(localStorage.getItem('users')) || [];

const saveToLocalStorage = (usersList) => {
  localStorage.setItem('users', JSON.stringify(usersList));
}

//cart-header

const toggleMenu = () => {
    userMenu.classList.toggle("open-menu");
    backBlur.classList.toggle("see-blur");
}

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    backBlur.classList.toggle("see-blur");
}

const toggleBurger = () => {
    navMenu.classList.toggle("open-burger");
    backBlur.classList.toggle("see-blur");
}

const closeCart = () => {
  cartMenu.classList.remove("open-cart");
  userMenu.classList.remove("open-menu");
  navMenu.classList.remove("open-burger");
  backBlur.classList.remove("see-blur");
}

const buyFuntion = () => {
    if(!cart.length) return
    if(!users.length){
      alert("Please log in to complete the purchase");
    }else if (window.confirm ("Wish to buy cart")){
        cart = []
        checkCartState()
    }
  
}

//cart function

const renderCartProduct = (cartProduct) => {
    const {id,name,price,img, quantity} = cartProduct;
    return`
    <div class="product">
      <div class="cart-prod-img">
        <img src="${img}" alt=${name}/>
      </div>
      <div class="product-data">
        <p>${name}</p>
        <span>$${price}</span>
        </div>
      <div class="quantity-regulator">
        <button class="quantity-handler down" data-id='${id}'>-</button>
        <p class="item-quantity">${quantity}</p>
        <button class="quantity-handler up" data-id='${id}'>+</button>
      </div>
    </div>`;
}

const disabledBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add ('disabled')
        return
    }
    btn.classList.remove ('disabled')
}

const renderCart = () => {
    if(!cart.length){
        productsCart.innerHTML = `<p>The cart is empty</p>`;
        cartCount.classList.add('hidden')
        buyBtn.classList.add('disabled')
        deleteBtn.classList.add('disabled')
        return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join('')
    cartCount.classList.remove('hidden')
    buyBtn.classList.remove('disabled')
    deleteBtn.classList.remove('disabled')
}

const getCartTotal = () => {
    return cart.reduce((acc,cur) => acc + Number(cur.price)*Number(cur.quantity),0)
}

const showTotal = () => {
    total.innerHTML= `$${getCartTotal()}`
    subtotal.innerHTML= `$${getCartTotal()}`
}

//add products

const productData = (id, name, price, img) => {
    return {id, name, price, img};
}

const isExistingProduct = (product) => {
    return cart.find((item)=> item.id === product.id);
}

const addUnitToProduct = (product) => {
    cart = cart.map(cartProduct => {
        return cartProduct.id === product.id
        ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct
    })    
}

const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}];
}

const checkCartState = () => {
    saveLocalStorage(cart)
    renderCart(cart)
    showTotal(cart)
    disabledBtn(buyBtn)
    disabledBtn(deleteBtn)
}

const removeProductFromCart = (existingProduct) => {
    cart = cart.filter(product => product.id !== existingProduct.id)
    checkCartState()
}

const substractProductUnit = (existingProduct) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === existingProduct.id
        ? {...cartProduct, quantity: cartProduct.quantity -1} : cartProduct;
    })    
}

const handlerMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find(item => item.id === id);
    if(existingCartProduct.quantity === 1) {
        if(window.confirm("Wish to delete product from cart?")) {
            removeProductFromCart(existingCartProduct)
        }
        return;
    } 
    substractProductUnit(existingCartProduct);
}

const handlerPlusBtnEvent = (id) => {
    const existingCartProduct = cart.find(item => item.id === id);
    addUnitToProduct(existingCartProduct);
}

const handlerQuantity = (e) => {
    if(e.target.classList.contains('down')){
        handlerMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains('up')){
        handlerPlusBtnEvent(e.target.dataset.id)
    }
    checkCartState()
}

const deleteCart = () => {
    if(!cart.length) return
    if(window.confirm ("Wish to delete cart")){
        cart = []
        checkCartState()
    }
}

const showSuccessModal = (msg) => {
    successModal.classList.add('activeModal');
    successModal.textContent = msg;
    setTimeout (() => {
        successModal.classList.remove('activeModal');
    }, 2000)
}

const sendFooterEmail = () => {
    const textError = subscribeInput.parentElement.querySelector("small");
    const email = subscribeInput.value.trim();
    
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        showSuccessModal ("Email sent");
        subscribeInput.value = '';
    } else{
        textError.textContent = 'The email is not valid';
        setTimeout (() => {
            textError.textContent = '';
        }, 2000)
    }
}

const init = () => {
    userBtn.addEventListener("click", toggleMenu);
    cartBtn.addEventListener("click", toggleCart);
    burgerLogo.addEventListener("click", toggleBurger)
    window.addEventListener("scroll", closeCart);
    backBlur.addEventListener("click", closeCart);
    closeCartBtn.addEventListener("click", closeCart)
    buyBtn.addEventListener("click", buyFuntion)
    window.addEventListener("load", renderCart)
    window.addEventListener("load", showTotal)
    productsCart.addEventListener("click", handlerQuantity)
    deleteBtn.addEventListener("click", deleteCart);
    disabledBtn(buyBtn)
    disabledBtn(deleteBtn)
    plane.addEventListener("click", sendFooterEmail)
} 

init();
