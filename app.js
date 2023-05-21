//pseudocode for cart 

//create object to render in the cart

const product = {
    name: 'Fall Limited Edition Sneakers',
    price: 125
}

//function to have cart slide in an out when cart icon is clicked on
//targer cartReview and save in a variable
const cartReviewEl = document.querySelector('.cartReview')
//target cart and save in a variable
const cartEl = document.querySelector('.cart')
//add eventlistener
cartEl.addEventListener('click', function(){
    console.log('cart clicked');
    cartEl.classList.toggle('activated');
    cartReviewEl.classList.toggle('activated');
});


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


