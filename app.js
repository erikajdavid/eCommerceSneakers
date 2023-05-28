

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

//create object to render in the cart
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

//const firebaseObj = push(dbRef, products);
//console.log(firebaseObj);

//function to have cart slide in an out when cart icon is clicked on
//target the overlay element and save in a variable. 
const overlayEl = document.querySelector('.overlay')
//target cartReview and save in a variable
const cartReviewEl = document.querySelector('.cartReview')
//target cart and save in a variable
const cartEl = document.querySelector('.cart')
//add eventlistener
cartEl.addEventListener('click', function(){
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
    overlayEl.classList.toggle('activated');
});

//target close cart icon and save in a variable.
const closeCartEl = document.querySelector('.closeIcon')
//add eventlisteners
closeCartEl.addEventListener('click', function(){
    cartReviewEl.classList.remove('activated');
    overlayEl.classList.remove('activated')
});

//when + btn is pressed, qty++, product is rendered in the cart and the cart item number++
//target + button
const plusBtnEl = document.querySelector('.plusBtn')

const quantity = document.querySelector('.qty');

let productPageQuantity = 0;

plusBtnEl.addEventListener('click', function(){
  
  productPageQuantity++;
  quantity.textContent = productPageQuantity;
  
  changeNumberofUnits();

  calculateTotalQuantity();
});

//function to remove item from cart from product page
//when - btn is pressed, qty--, product is removed from the cart the the cart item number--
const minusBtnEl = document.querySelector('.minusBtn')

minusBtnEl.addEventListener('click', function(){
  let currentQuantity = quantity.textContent;
  currentQuantity--;
  quantity.textContent = currentQuantity;

  if (currentQuantity <= 0) {
    quantity.textContent = 0;
  }
});

//change number of units function

function changeNumberofUnits(action, id) {
  userCart = userCart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if(item.id === id) {
      if(action === "plus")   
        numberOfUnits++; 
    }
    return {
      ...item,
      numberOfUnits,
    }
  })

  updateCart();
  renderProductsToCart();
}

//user cart array to store personal items selected 

let userCart = [];
function addToCart(id)  {
  if (userCart.some((item) => item.id === id)) {
    alert('product already in cart');
  } else {
    const item = products.find((product) => product.id === id); //find product that verifies this condition

    // Add the product to the cart
    //save the product found in the new array
    userCart.push({
      ...item,
      numberOfUnits: 1,

    });
    //push to firebase?//or should this be onValue?
    //const firebaseObj = push(dbRef, item);
    //console.log(firebaseObj);
    console.log(userCart)

    updateCart();
    calculateTotalQuantity()
  }
}

function updateCart() {
  renderProductsToCart();
  calculateTotalQuantity();
}

// Function to calculate the total quantity of items in the cart
function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (const item of userCart) {
    totalQuantity += item.numberOfUnits;
  }
  return totalQuantity;
}

// Function to add to cart button
const addToCartBtn = document.querySelector('.addToCartBtn');

addToCartBtn.addEventListener('click', function() {
  const productId = products[0].id; // Assuming you want to add the first product from the array
  addToCart(productId);

  cartEl.classList.toggle('activated');
  cartReviewEl.classList.toggle('activated');
  overlayEl.classList.toggle('activated');

  calculateTotalQuantity()
});


const productsEl = document.querySelector('.productsInCart')

function renderProductsToCart() {
  productsEl.innerHTML = ''; //clear cart element
  userCart.forEach((item) => {
    productsEl.innerHTML += `
      <li class="cartProductContainer">
        <div class="cartImgContainer">
          <img src="${item.imgSrc}" alt="${item.name}">
        </div>
        <div class="cartTextContainer">
          <p>${item.name}</p>
          <p>$${item.discountPrice} x ${item.numberOfUnits} $${item          .originalPrice}</p>
        </div>
        <div class="trashContainer">
          <img class="trashCan" src="./images/icon-delete.svg"> 
        </div>
      </li>
    `;
  })
}























/*
  //pseudocode for cart 

//function to have cart slide in an out when cart icon is clicked on
//target the overlay element and save in a variable. 
const overlayEl = document.querySelector('.overlay')
//target cartReview and save in a variable
const cartReviewEl = document.querySelector('.cartReview')
//target cart and save in a variable
const cartEl = document.querySelector('.cart')
//add eventlistener
cartEl.addEventListener('click', function(){
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
    overlayEl.classList.toggle('activated');
});

//target close cart icon and save in a variable.
const closeCartEl = document.querySelector('.closeIcon')
//add eventlisteners
closeCartEl.addEventListener('click', function(){
    cartReviewEl.classList.remove('activated');
    overlayEl.classList.remove('activated')
})

//when + btn is pressed, qty++, product is rendered in the cart and the cart item number++
//target + button
const plusBtnEl = document.querySelector('.plusBtn')

const quantity = document.querySelector('.qty');

plusBtnEl.addEventListener('click', function(){
  let currentQuantity = quantity.textContent;
  currentQuantity++;
  quantity.textContent = currentQuantity;
});

//function to remove item from cart from product page
//when - btn is pressed, qty--, product is removed from the cart the the cart item number--
const minusBtnEl = document.querySelector('.minusBtn')

minusBtnEl.addEventListener('click', function(){
  let currentQuantity = quantity.textContent;
  currentQuantity--;
  quantity.textContent = currentQuantity;
  if (currentQuantity <= 0) {
    quantity.textContent = 0;
  }
});

//function to add to cart button

const addToCartBtn = document.querySelector('.addToCartBtn');

const cartItemNumber = document.querySelector('.cartItemNumber');

const emptyCart = document.querySelector('.emptyCart');

const checkoutBtn = document.querySelector('.checkoutBtn');

let userCart = []

function addToCart() {
  addToCartBtn.addEventListener('click', function(){
    let currentCartItemQuantity = parseInt(cartItemNumber.textContent);
    let productQuantity = parseInt(quantity.textContent);
    
    currentCartItemQuantity += productQuantity;
    cartItemNumber.textContent = currentCartItemQuantity;
    
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
    overlayEl.classList.toggle('activated');

    renderProductsToCart();

    if (currentCartItemQuantity > 0) {
      emptyCart.style.display = "none";
      checkoutBtn.style.display = "flex";
    } else {
      emptyCart.style.display = "flex";
      checkoutBtn.style.display = "none";
    }
  })
}

addToCart();

//render items to cart

//create object to render in the cart
const products = [
  {
      id: 1,
      name: 'Fall Limited Edition Sneakers',
      discountPrice: 125,
      originalPrice: 250,
      quantity: 0,
      imgSrc: "./images/image-product-1.jpg",
  }
]

const productsEl = document.querySelector('.productsInCart')

function renderProductsToCart() {
  products.forEach((product, index) => {
    productsEl.innerHTML += `
      <li class="cartProductContainer">
        <div class="cartImgContainer">
          <img src="${product.imgSrc}" alt="${product.name}">
        </div>
        <div class="cartTextContainer">
          <p>${product.name}</p>
          <p>$${product.discountPrice} x ${product.quantity} $${product.originalPrice}</p>
        </div>
        <div class="trashContainer">
          <img class="trashCan" src="./images/icon-delete.svg"> 
        </div>
      </li>
    `;



    const trashCanIcons = document.querySelectorAll('.trashCan');
    trashCanIcons[index].addEventListener('click', function() {
      products.splice(index, 1); // Remove the product from the array
      updateCart(); // Update the cart view
    });
  });
}

function updateCart() {
  // Clear the existing cart view
  productsEl.innerHTML = '';
  // Render the updated products in the cart
  renderProductsToCart();
  // Any additional logic or calculations related to updating the cart can be added here
}

*/
















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



