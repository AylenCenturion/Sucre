const cartMenu = document.querySelector(".cart");
const cartBtn = document.querySelector(".cartLogo")
const backBlur = document.querySelector(".blur")
const userMenu = document.querySelector(".userNav")
const userBtn = document.querySelector(".userLogo")
const closeCartBtn = document.querySelector(".close-cart")
const buyBtn = document.querySelector(".buyBtn")
const deleteBtn = document.querySelector(".deleteBtn")
const products = document.querySelector(".allProducts")
const popularProducts = document.querySelector(".popularProducts")
const productsCart = document.querySelector(".shoppingList")
const cartCount = document.querySelector(".cartCount")
const cartBottom = document.querySelector(".cartBottom")
const total = document.querySelector(".total")
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
const moreBtn = document.querySelector(".moreBtn")



let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList))
};

//cart-header

const toggleMenu = () => {
    userMenu.classList.toggle("open-menu");
    if(cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
    backBlur.classList.toggle("see-blur");
}

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if(userMenu.classList.contains("open-menu")) {
        userMenu.classList.remove("open-menu");
        return;
    }
    backBlur.classList.toggle("see-blur");
}

const closeCart = () => {
  cartMenu.classList.remove("open-cart");
  userMenu.classList.remove("open-menu");
  backBlur.classList.remove("see-blur");
}

const logInAlert = () => {
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
        renderProducts(0, e.target.dataset.category)
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
    <!-- <div class="product">
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
    productsCart.innerHTML=cart.map(renderCartProduct).join('')
    cartCount.classList.remove('hidden')
    buyBtn.classList.remove('disabled')
    deleteBtn.classList.remove('disabled')
}

const getCartTotal = () => {
    cart.reduce((acc,cur) => acc + Number(cur.price)*Number(cur.quantity),0)
}

const showTotal = () => {
    total.innerHTML= `$${getCartTotal()}`
}

const init = () => {
    userBtn.addEventListener("click", toggleMenu);
    cartBtn.addEventListener("click", toggleCart);
    window.addEventListener("scroll", closeCart);
    backBlur.addEventListener("click", closeCart);
    closeCartBtn.addEventListener("click", closeCart)
    buyBtn.addEventListener("click", logInAlert)
    renderProducts()
    categories.addEventListener("click", applyFilter)
    moreBtn.addEventListener("click", showMoreProducts)
    renderPopulars()
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showTotal)
} 

init();
