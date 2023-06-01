// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use

import { getDatabase, ref, push, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC07Ko7_orRnMwsfTS4CUZqBJqRdAjDcLY",
  authDomain: "ecomm-sneakers.firebaseapp.com",
  databaseURL: "https://ecomm-sneakers-default-rtdb.firebaseio.com",
  projectId: "ecomm-sneakers",
  storageBucket: "ecomm-sneakers.appspot.com",
  messagingSenderId: "913809506911",
  appId: "1:913809506911:web:c85382d54bc0f7f0af11ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const productsRef = ref(database, 'products');
const cartItemsRef = ref(database, 'cartItems');

let products = [];

onValue(productsRef, (data) => {
  if(data.exists()) {
    products = data.val();
    renderProductsToCart(products);
  }
});

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
  plusBtn.addEventListener('click', function() {
    // When clicked, increase quantity by 1
    productPageQuantity++;
    // Display new quantity
    quantity.textContent = productPageQuantity;
  });
});

//Target minus button and save it in a variable
const minusBtnEl = document.querySelectorAll('.minusBtn')
//add event listener to the plus button
minusBtnEl.forEach((minusBtn) => {
  minusBtn.addEventListener('click', function() {
    // When clicked, decrease quantity by 1
    productPageQuantity--;
    //Display new quantity
    quantity.textContent = productPageQuantity;

    //If the number is below 0, display number as 0 because user cannot purchase a negative number of items
    if(productPageQuantity < 0) {
      productPageQuantity = 0;
      quantity.textContent = productPageQuantity;
    }
  })
})

// Add to cart functionality
const addToCartBtn = document.querySelectorAll('.addToCartBtn');
addToCartBtn.forEach((button) => {
  button.addEventListener('click', function () {
    // When add to cart btn is clicked, get the cart and overlay to appear
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
    overlayEl.classList.toggle('activated');

    // If the product page quantity is 0, disable the button so the product doesn't render to the cart with a quantity of 0.
    if (productPageQuantity === 0) {
      button.disabled = true;
      return;
    }

    // Iterate over the objects in the products object
    Object.values(products).forEach((product) => {
      const id = product.id;

      const updateDatabase = (event) => {
        // Let the database know that a product has been added to the cart.
        if (event.target.tagName === 'BUTTON') {
          // Use the button's id to create the correct reference in the database.
          const childRef = ref(database, `/products/product${id}`);
          update(childRef, { inCart: true, quantity: productPageQuantity });
        }
      };

      let existingItem = userCart.find((item) => item.productId === id);

      // If the item exists and the user adds more quantity to the cart, add onto the productPageQuantity.
      if (existingItem) {
        existingItem.quantity += productPageQuantity;
        // Update the quantity in the product object in the products collection.
        const productRef = ref(database, `/products/product${id}`);
        update(productRef, { quantity: existingItem.quantity });
      } else {
        // If the item doesn't exist, push it to the cart array with this object.
        userCart.push({
          productId: id,
          quantity: productPageQuantity,
        });

       /* // Save the cart item to the database.
        const cartItemRef = ref(database, `/cartItems/${id}`);
        update(cartItemRef, {
          productId: id,
          quantity: productPageQuantity,
        });*/
      }

      updateDatabase(event); // Call the updateDatabase function here
    });

    renderProductsToCart();

    updateCart();
  });
});


// FUNCTION TO RENDER PRODUCTS TO CART
const productsEl = document.querySelector('.productsInCart');

function renderProductsToCart() {
  productsEl.innerHTML = ''; // Clear the cart element
  Object.values(products).forEach((product) => {
    const cartItem = userCart.find((item) => item.productId === product.id);
    if (cartItem) {
    productsEl.innerHTML += `
      <li class="cartProductContainer">
        <div class="cartImgContainer">
          <img src="${product.imgSrc}" alt="${product.name}">
        </div>
        <div class="cartTextContainer">
          <p>${product.name}</p>
          <p>$${(product.discountPrice).toFixed(2)} x ${cartItem.quantity} <span>$${(cartItem.quantity * product.discountPrice).toFixed(2)}</span></p>
        </div>
        <div class="trashContainer">
          <img class="trashCan" src="./images/icon-delete.svg"> 
        </div>
      </li>
    `;
    }
  });
  trashIt();
}

// FUNCTION TO REMOVE ENTIRE PRODUCT FROM CART
function trashIt() {
  const trashCanEl = document.querySelectorAll('.trashCan');
  trashCanEl.forEach((trashCan, index) => {
    const cartProductContainer = document.querySelectorAll('.cartProductContainer')[index];

    trashCan.addEventListener('click', function() {
       // Iterate over the objects in the products object
       Object.values(products).forEach((product) => {
        const id = product.id;

      // Remove the item from the userCart array
      userCart.splice(index, 1);

      // Remove it from display
      cartProductContainer.style.display = "none";
      console.log('Product removed successfully.');

      // Update the database with the new `inCart` value
      const childRef = ref(database, `/products/product${id}`);
      update(childRef, { inCart: false });

      // Update the database with the 0 quantity when product is trashed
      const productRef = ref(database, `/products/product${id}`);
      update(productRef, { quantity: 0 });

      updateCart();
    });
    });

  });
}

const totalCartQty = document.querySelector('.cartItemNumber');
const emptyCart = document.querySelector('.emptyCart');
const checkoutBtn = document.querySelector('.checkoutBtn');

function updateCart() {
  let totalItems = 0;
  //calculate the total quantity of items in the cart
  userCart.forEach((cartItem) => {
    totalItems +=cartItem.quantity;
  });

  //update the cartItemNumer element with the total quantity
    totalCartQty.textContent = totalItems;

  //if there are no items in the cart array, display empty cart message
  if(userCart.length === 0) {
    emptyCart.style.display = "flex";
    checkoutBtn.style.display = "none";
  //otherwise, remove the empty cart message
  } else if(userCart.length > 0) {
      emptyCart.style.display = "none";
      checkoutBtn.style.display = "flex";
    }
  }

updateCart();









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





