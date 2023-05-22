//pseudocode for cart 

//create object to render in the cart

const product = {
    name: 'Fall Limited Edition Sneakers',
    price: 125
}

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


//function to add to cart from product page
//when + btn is pressed, qty++, product is rendered in the cart and the cart item number++
//target + button
const plusBtnEl = document.querySelector('.plusBtn')
//add eventlistener
plusBtnEl.addEventListener('click', function(){
    //function that renders items to cart and updates the cart item number
})

//function to remove item from cart from product page
//when - btn is pressed, qty--, product is removed from the cart the the cart item number--
const minusBtnEl = document.querySelector('.minusBtn')
//add eventlistener
minusBtnEl.addEventListener('click', function(){
    //function that renders items to cart and updates the cart item number
})

//function to render product to cart

//when cart icon is clicked on
//display cart, slide in. 
//overlay activated. 
//when user clicks on window, cart slides away. 

//pseudo code for image carousel TK

const carouselContainerEl = document.querySelector('.carouselContainer');
carouselContainerEl.style.display = 'none';

const thumbnailsEl = document.querySelectorAll('.thumbnail');

thumbnailsEl.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the window
    carouselContainerEl.style.display = 'flex';
  });
});

window.addEventListener('click', function() {
  carouselContainerEl.style.display = 'none';
});








