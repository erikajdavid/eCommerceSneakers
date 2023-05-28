

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

  const firebaseObj = push(dbRef, "first push to Firebase");
  console.log(firebaseObj);

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

function addQuantity() {
  plusBtnEl.addEventListener('click', function(){
    let currentQuantity = quantity.textContent;
    currentQuantity++;
    quantity.textContent = currentQuantity;
  });
};

addQuantity();

//function to remove item from cart from product page
//when - btn is pressed, qty--, product is removed from the cart the the cart item number--
const minusBtnEl = document.querySelector('.minusBtn')

function removeQuantity() {
  minusBtnEl.addEventListener('click', function(){
    let currentQuantity = quantity.textContent;
    currentQuantity--;
    quantity.textContent = currentQuantity;
    if (currentQuantity <= 0) {
      quantity.textContent = 0;
    }
  });
}

removeQuantity();

//function to add to cart button

const addToCartBtn = document.querySelector('.addToCartBtn');

const cartItemNumber = document.querySelector('.cartItemNumber');

const emptyCart = document.querySelector('.emptyCart');

function addToCart() {
  addToCartBtn.addEventListener('click', function(){
    let currentCartItemQuantity = parseInt(cartItemNumber.textContent);
    let productQuantity = parseInt(quantity.textContent);
    
    currentCartItemQuantity += productQuantity;
    cartItemNumber.textContent = currentCartItemQuantity;
    
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
    overlayEl.classList.toggle('activated');

    if (currentCartItemQuantity > 0) {
      emptyCart.style.display = "none";
    }
  })
}

addToCart();

//when add to cart button is clicked,
//update cart icon number
//render product in cart 


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


