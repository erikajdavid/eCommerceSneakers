

// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use

import { getDatabase, ref, update, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyC07Ko7_orRnMwsfTS4CUZqBJqRdAjDcLY",
  authDomain: "ecomm-sneakers.firebaseapp.com",
  projectId: "ecomm-sneakers",
  storageBucket: "ecomm-sneakers.appspot.com",
  messagingSenderId: "913809506911",
  appId: "1:913809506911:web:c85382d54bc0f7f0af11ea"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

// Create object to render in the cart
const products = [
  {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    discountPrice: 125,
    originalPrice: 250,
    imgSrc: "./images/image-product-1.jpg",
  }
]

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

// Target plus btn and save in a variable
const plusBtnEl = document.querySelector('.plusBtn');

// Target quantity element and save in a variable
const quantity = document.querySelector('.qty');

// Initialize quantity of product on page to 0;
let productPageQuantity = 0;

// Add event listener to plus btn
plusBtnEl.addEventListener('click', function() {
  const productId = 1;
  // When clicked, increase quantity by 1
  productPageQuantity++;
  // Display new quantity
  quantity.textContent = productPageQuantity;

  changeNumberofUnits("plus", productId);
  calculateTotalQuantity();
});

// Target minus btn and save in a variable
const minusBtnEl = document.querySelector('.minusBtn');

// Add event listener
minusBtnEl.addEventListener('click', function(){
  // When clicked, decrease quantity by 1
  productPageQuantity--;
  // Display new quantity on page
  quantity.textContent = productPageQuantity;

  // If quantity on page is less than 0
  if (productPageQuantity <= 0) {
    // Display 0, no such thing as a negative quantity when shopping for products
    quantity.textContent = 0;
  }
});

// Target add to cart btn and save in a variable
const addToCartBtn = document.querySelector('.addToCartBtn');

addToCartBtn.addEventListener('click', function(event) {
  const productId = products[0].id; // Assuming you want to add the first product from the array
  addToCart(productId);

  cartEl.classList.toggle('activated');
  cartReviewEl.classList.toggle('activated');
  overlayEl.classList.toggle('activated');

  calculateTotalQuantity();
});

// FUNCTION TO CHANGE NUMBER OF UNITS
function changeNumberofUnits(action, id) {
  userCart = userCart.map((item) => {
    if (item.id === id) {
      if (action === "plus") {
        item.numberOfUnits++; // Increment the numberOfUnits
      } else if (action === "minus" && item.numberOfUnits > 0) {
        item.numberOfUnits--; // Decrement the numberOfUnits if it's greater than 0
      }
    }
    return item;
  });
  updateCart();
}

// User cart array to store personal items selected
let userCart = [];
// Target li and save in a variable
const productInCart = document.querySelector('.cartProductContainer');
// Target empty cart message and save in a variable
const emptyCart = document.querySelector('.emptyCart');

// FUNCTION TO ADD ITEM TO CART
function addToCart(id) {
  if (userCart.some((item) => item.id === id)) {
    // Item already exists in the cart
  } else {
    const item = products.find((product) => product.id === id);
    userCart.push({
      ...item,
      numberOfUnits: productPageQuantity,
    });
    emptyCart.style.display = "none";
    console.log(userCart);
    updateCart();

    // Save the user's cart to the database
    const cartData = { userCart };
    update(dbRef, cartData);
  }
  if (productPageQuantity === 0) {
    productInCart.style.display = "none";
  }
}

// FUNCTION TO UPDATE CART AFTER ADDING, REMOVING OR CHANGING QUANTITY
function updateCart() {
  renderProductsToCart();
  calculateTotalQuantity();
  trashIt();

  // Update the cart item number
  const totalQuantity = calculateTotalQuantity();
  const cartItemNumber = document.querySelector('.cartItemNumber');
  cartItemNumber.textContent = totalQuantity.toString();
}

// FUNCTION TO CALCULATE THE TOTAL QUANTITY OF ITEMS IN THE CART
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (const item of userCart) {
    totalQuantity += item.numberOfUnits;
  }
  return totalQuantity;
}

// FUNCTION TO RENDER PRODUCTS TO CART
const productsEl = document.querySelector('.productsInCart');

function renderProductsToCart() {
  productsEl.innerHTML = ''; // Clear the cart element
  userCart.forEach((item) => {
    productsEl.innerHTML += `
      <li class="cartProductContainer">
        <div class="cartImgContainer">
          <img src="${item.imgSrc}" alt="${item.name}">
        </div>
        <div class="cartTextContainer">
          <p>${item.name}</p>
          <p>$${item.discountPrice} x ${item.numberOfUnits} $${item.originalPrice}</p>
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
  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener('click', function() {
      const productInCart = document.querySelector('.cartProductContainer');
      productInCart.style.display = "none";
    });
  });
}

// Listen for changes in the user's cart data
onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  if (data && data.userCart) {
    userCart = data.userCart;
    updateCart();
  }
});














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



