const cartMenu = document.querySelector(".cart");
const cartBtn = document.querySelector(".cartLogo")
const backBlur = document.querySelector(".blur")
const userMenu = document.querySelector(".userNav")
const userBtn = document.querySelector(".userLogo")
const navMenu = document.querySelector(".navMenu")
const burgerLogo = document.querySelector(".burgerLogo")
const closeCartBtn = document.querySelector(".close-cart")
const buyBtn = document.querySelector(".buyBtn")
const deleteBtn = document.querySelector(".deleteBtn")
const products = document.querySelector(".allProducts")
const popularProducts = document.querySelector(".popularProducts")
const productsCart = document.querySelector(".shoppingList")
const cartCount = document.querySelector(".cartCount")
const cartBottom = document.querySelector(".cartBottom")
const total = document.querySelector(".total")
const subtotal = document.querySelector(".subtotal")
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
const moreBtn = document.querySelector(".moreBtn")
const addBtn = document.querySelector(".addBtn")
const successModal = document.querySelector(".successModal")

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList))
};

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

const logInAlert = () => {
    if(!cart.length) return
  alert("Please log in to complete the purchase");
}

//page products

const renderProduct = (product) => {
    const {id, name, price, img} = product;

    return`
    <div class="productItem">
      <img src="${img}" alt=${name}>
      <div class="productData">
        <p class="productName">${name}</p>
        <p class="productPrice">$${price}</p>
        <button class="cartBtn addBtn" 
          data-id='${id}' 
          data-name='${name}'
          data-price='${price}'
          data-img='${img}'
          >Add to cart</button>
      </div>
    </div>
    `
}

const renderPopulars = () => {
    const popularList = productsData.filter(
        product => product.popular === true
    )
    popularProducts.innerHTML = popularList.map(renderProduct).join('')
}

const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join('');
}

const renderFilteredProducts = (category) => {
    const productsList = productsData.filter(
        (product) => product.category === category
    )
    products.innerHTML = productsList.map(renderProduct).join('')
}

const renderProducts = (index = 0, category = undefined) =>{
    if(!category) {
        renderDividedProducts(index);
        return;
    }
    renderFilteredProducts(category)
}

const changeCategory = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove('categoryActive');
            return;
        }
        categoryBtn.classList.add('categoryActive');
    })
}

const toggleMoreBtn = (category) => {
    if (!category) {
        moreBtn.classList.remove('hidden');
        return
    }
    moreBtn.classList.add('hidden');
};

const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeCategory(selectedCategory);
    toggleMoreBtn(selectedCategory);
}

const applyFilter = (e) => {
    if (!e.target.classList.contains('category')) return;
    changeFilterState(e);
    if(!e.target.dataset.category){
        products.innerHTML = '';
        renderProducts();
    }else{
        renderProducts(0, e.target.dataset.category);
        productsController.nextProductsIndex =1;
    }
}

const isLastIndexOf = () => productsController.nextProductsIndex === productsController.productsLimit;

const showMoreProducts =() => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex ++;
    if (isLastIndexOf()){
        moreBtn.classList.add('hidden');
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
    buyBtn.classList.remove('disabled')
    deleteBtn.classList.remove('disabled')
}

const showSuccessModal = (msg) => {
    successModal.classList.add('activeModal');
    successModal.textContent = msg;
    setTimeout (() => {
        successModal.classList.remove('activeModal');
    }, 1600)
}

const addProducts = (e) => {
    if(!e.target.classList.contains('addBtn')) return;
    const {id, name, price, img} = e.target.dataset;
    const product = productData (id, name, price, img);
    if (isExistingProduct(product)) {
        addUnitToProduct(product);
        showSuccessModal ("Unit added successfully");

    } else {
        createCartProduct (product);
        showSuccessModal ("Product added successfully");
    }
    checkCartState ()
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

const init = () => {
    userBtn.addEventListener("click", toggleMenu);
    cartBtn.addEventListener("click", toggleCart);
    burgerLogo.addEventListener("click", toggleBurger)
    window.addEventListener("scroll", closeCart);
    backBlur.addEventListener("click", closeCart);
    closeCartBtn.addEventListener("click", closeCart)
    buyBtn.addEventListener("click", logInAlert)
    renderProducts()
    categories.addEventListener("click", applyFilter)
    moreBtn.addEventListener("click", showMoreProducts)
    renderPopulars()
    window.addEventListener("load", renderCart)
    window.addEventListener("load", showTotal)
    products.addEventListener("click", addProducts)
    popularProducts.addEventListener("click", addProducts)
    productsCart.addEventListener("click", handlerQuantity)
    deleteBtn.addEventListener("click", deleteCart);
} 

init();
