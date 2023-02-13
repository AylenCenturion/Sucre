const products = document.querySelector(".allProducts");
const popularProducts = document.querySelector(".popularProducts");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const moreBtn = document.querySelector(".moreBtn");
const addBtn = document.querySelector(".addBtn");

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

//add products

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



const initproducts = () => {
  renderProducts()
  categories.addEventListener("click", applyFilter)
  moreBtn.addEventListener("click", showMoreProducts)
  renderPopulars()
  products.addEventListener("click", addProducts)
  popularProducts.addEventListener("click", addProducts)
}

initproducts();