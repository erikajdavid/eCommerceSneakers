const products = [
  {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    discountedPrice: 125,
    originalPrice: 250,
    inCart: false,
    imgSrc: "./images/image-product-1.jpg"
  }
];

// Target the overlay element and save it in a variable
const overlayEl = document.querySelector('.overlay');
// Target cartReview and save it in a variable
const cartReviewEl = document.querySelector('.cartReview');
// Target cart and save it in a variable
const cartEl = document.querySelector('.cart');

// Add event listener to cart icon
cartEl.addEventListener('click', function(){
  cartEl.classList.toggle('activated');
  cartReviewEl.classList.toggle('activated');
  overlayEl.classList.toggle('activated');
});

// Target close cart icon and save it in a variable
const closeCartEl = document.querySelector('.closeIcon');

// Add event listener to close cart icon
closeCartEl.addEventListener('click', function(){
  cartReviewEl.classList.remove('activated');
  overlayEl.classList.remove('activated');
});

let userCart = [];

// Target quantity element and save it in a variable
const quantity = document.querySelector('.qty');

// Initialize quantity of product on the page to 0
let productPageQuantity = 0;

// Target plus button and save it in a variable
const plusBtnEl = document.querySelectorAll('.plusBtn');
// Add event listener to plus button
plusBtnEl.forEach((plusBtn) => {
  plusBtn.addEventListener('click', function () {
    // When clicked, increase quantity by 1
    productPageQuantity++;
    // Display new quantity
    quantity.textContent = productPageQuantity;
  });
});

const addToCartBtn = document.querySelectorAll('.addToCartBtn');
addToCartBtn.forEach((button, index) => {
  button.addEventListener('click', function () {
    const productId = products[index].id;

    let existingItem = userCart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += productPageQuantity;
    } else {
      userCart.push({
        productId: productId,
        quantity: productPageQuantity,
      });
    }
    renderProductsToCart();
    console.log(userCart);
  });
});

// FUNCTION TO RENDER PRODUCTS TO CART
const productsEl = document.querySelector('.productsInCart');

function renderProductsToCart() {
  productsEl.innerHTML = ''; // Clear the cart element
  userCart.forEach((cartItem) => {
    const product = products.find((item) => item.id === cartItem.productId);

    productsEl.innerHTML += `
      <li class="cartProductContainer">
        <div class="cartImgContainer">
          <img src="${product.imgSrc}" alt="${product.name}">
        </div>
        <div class="cartTextContainer">
          <p>${product.name}</p>
          <p>$${product.discountedPrice} x ${cartItem.quantity} $${product.originalPrice}</p>
        </div>
        <div class="trashContainer">
          <img class="trashCan" src="./images/icon-delete.svg"> 
        </div>
      </li>
    `;
  });
}

// FUNCTION TO REMOVE ENTIRE PRODUCT FROM CART
function trashIt() {
  const trashIcons = document.querySelectorAll('.trashCan');
  trashIcons.forEach((trashIcon, index) => {
    trashIcon.addEventListener('click', function() {
      const productInCart = document.querySelector('.cartProductContainer');
      productInCart.style.display = "none";

      // Remove the item from the userCart array
      userCart.splice(index, 1);

      // Reset the productPageQuantity to 0
      productPageQuantity = 0;

      // Update the cart display

      console.log('Product removed successfully.');
    });
  });
}








/////////////////////////////////////CAROUSEL//////////////////////////////////////

const carouselContainerEl = document.querySelector('.carouselContainer');
carouselContainerEl.style.display = 'none';

const thumbnailsEl = document.querySelectorAll('.thumbnail');

thumbnailsEl.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the click event
    carouselContainerEl.style.display = 'flex';
  });
});


const prevButtonEl = document.querySelector('.previousIcon');
const nextButtonEl = document.querySelector('.nextIcon');
const imageContainerCarouselEl = document.querySelector('.imageContainerCarousel');
const slideEl = document.querySelectorAll('.slide');

let index = 0;
let width = slideEl[index].clientWidth;

// Update the width variable when the window is resized
window.addEventListener('resize', function() {
  width = slideEl[index].clientWidth;
});

nextButtonEl.addEventListener('click', function() {
  index++;

  // Update the width variable before updating the transform property
  width = slideEl[index].clientWidth;

  imageContainerCarouselEl.style.transform = `translate(${-index * (width + 10)}px)`;

  if (index === slideEl.length - 1) {
    nextButtonEl.classList.add('disable');
  } else {
    prevButtonEl.classList.remove('disable');
  }
});

prevButtonEl.addEventListener('click', function() {
  index--;

  // Update the width variable before updating the transform property
  width = slideEl[index].clientWidth;

  imageContainerCarouselEl.style.transform = `translate(${-index * (width + 10)}px)`;

  if (index === 0) {
    prevButtonEl.classList.add('disable');
  } else {
    nextButtonEl.classList.remove('disable');
  }
});

//close carousel
const overlayCarouselEl = document.querySelector('.carouselOverlay');
overlayCarouselEl.addEventListener('click', function() {
  carouselContainerEl.style.display = 'none';
});

const closeCarouselEl = document.querySelector('.closeCarousel')
closeCarouselEl.addEventListener('click', function(){
  carouselContainerEl.style.display = 'none';
});





