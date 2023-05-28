

// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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

//const firebaseObj = push(dbRef, products);
//console.log(firebaseObj);

// Create object to render in the cart
const products = [
  {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    discountPrice: 125,
    originalPrice: 250,
    inCart: false,
    quantity: 0,
    imgSrc: "./images/image-product-1.jpg",
  }
]

// Target the overlay element and save it in a variable
const overlayEl = document.querySelector('.overlay')

// Target cartReview and save it in a variable
const cartReviewEl = document.querySelector('.cartReview')

// Target cart and save it in a variable
const cartEl = document.querySelector('.cart')

// Add event listener to cart icon
cartEl.addEventListener('click', function(){
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
    overlayEl.classList.toggle('activated');
});

// Target close cart icon and save it in a variable
const closeCartEl = document.querySelector('.closeIcon')

// Add event listener to close cart icon
closeCartEl.addEventListener('click', function(){
    cartReviewEl.classList.remove('activated');
    overlayEl.classList.remove('activated');
});

// Target + button
const plusBtnEl = document.querySelector('.plusBtn')

const quantity = document.querySelector('.qty');
let productPageQuantity = 0;

plusBtnEl.addEventListener('click', function() {
  const productId = 1; 
  productPageQuantity++;
  quantity.textContent = productPageQuantity;
  changeNumberofUnits("plus", productId); 
  calculateTotalQuantity();
});

// Function to decrease the quantity when - button is pressed
const minusBtnEl = document.querySelector('.minusBtn')

minusBtnEl.addEventListener('click', function(){
  let currentQuantity = quantity.textContent;
  currentQuantity--;
  quantity.textContent = currentQuantity;

  if (currentQuantity <= 0) {
    quantity.textContent = 0;
  }
});

// Function to change the number of units
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

// Function to add a product to the cart
function addToCart(id) {
  if (userCart.some((item) => item.id === id)) {
  } else {
    const item = products.find((product) => product.id === id);
    userCart.push({
      ...item,
      numberOfUnits: productPageQuantity, // Use the productPageQuantity as the initial numberOfUnits
    });
    console.log(userCart);
    updateCart();
  }
}

// Update the cart after adding or changing the quantity
function updateCart() {
  renderProductsToCart();
  calculateTotalQuantity();
  trashIt();
}

// Function to calculate the total quantity of items in the cart
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (const item of userCart) {
    totalQuantity += item.numberOfUnits;
  }
  return totalQuantity;
}

// Function to handle the add to cart button click
const addToCartBtn = document.querySelector('.addToCartBtn');

addToCartBtn.addEventListener('click', function() {
  const productId = products[0].id; // Assuming you want to add the first product from the array
  addToCart(productId);

  cartEl.classList.toggle('activated');
  cartReviewEl.classList.toggle('activated');
  overlayEl.classList.toggle('activated');

  calculateTotalQuantity();
});

// Function to render the products in the cart
const productsEl = document.querySelector('.productsInCart')

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
  })

  trashIt();
}

function trashIt() {
  const trashIcons = document.querySelectorAll('.trashCan');
  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener('click', function() {
      const productInCart = document.querySelector('.cartProductContainer');
      productInCart.style.display = "none";
    })
  })
}













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



