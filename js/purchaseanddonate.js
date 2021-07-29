/*global variables displayed for loyalty points*/
var loyalityPoints = 0
const LOYALITY_POINT_VALUE = 20;
var productCount = 0;


// used to add an evetlistenr to the remove button
    var removeItemBtn = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeItemBtn.length; i++) {
        var button = removeItemBtn[i]
        button.addEventListener('click', removeTicketBtn)
    }
  
    /*/ used to enter the uqantity of the ticket/*/
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
  //used to add a Eventlistner to the add to cart button
    var addToCartButtons = document.getElementsByClassName('item-box-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


// used to purchase items in the overall order
  function purchaseClicked() {
    let cartItems = document.getElementsByClassName('cart-items')[0]
    updateCartTotal()
  }
//removes the items from the cart
  function removeTicketBtn(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
  }
  //drop down has been created to change the quantity amount accordingly 
  function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
  }
  /*
used to add tickets and display them in the current order on the click of the add to cart button
used to create a div and the tickets in the current order then display in that div, 
parameters such as cTitle and price and an input is created in it to change the quantity of the ticket
*/
  function addToCartClicked(event) {
    var button = event.target
    var ticket_Item = button.parentElement.parentElement
    var cTitle = ticket_Item.getElementsByClassName('item-box-title')[0].innerText
    var cPrice = ticket_Item.getElementsByClassName('item-box-price')[0].innerText
    addItemToCart(cTitle, cPrice)
    updateCartTotal()
  }

  function addItemToCart(cTitle, cPrice) {
    let ticket_Row = document.createElement('div')
    ticket_Row.classList.add('cart-row')

    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == cTitle) {
           alert("You have already added this item to your cart")
            return
        }
    }
    
    var ticket_Row_Content = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${cTitle}</span>
        </div>
        <div class="cart-item cart-column">
            <span class="cart-price cart-column">${cPrice}</span>
            <input class="cart-quantity-input" id="product_quantity_${productCount}"  type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
            
            <input type="hidden" id = "product_name_${productCount}" value="${cTitle}">
            <input type="hidden" id = "product_price_${productCount}" value="${cPrice}">
        </div>`
    ticket_Row.innerHTML = ticket_Row_Content
    cartItems.append(ticket_Row)
    ticket_Row.getElementsByClassName('btn-danger')[0].addEventListener('click', removeTicketBtn)
    ticket_Row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    productCount++;
  }
  /*
  used to calculate the total and update the total of the orders and this has been called in all the functions to update the total in all the events
  */
  function updateCartTotal() {
    let ticket_Item_Container = document.getElementsByClassName('cart-items')[0]
    let ticketsRows = ticket_Item_Container.getElementsByClassName('cart-row')
    let total = 0
    
    for (let i = 0; i < ticketsRows.length; i++) {
      let ticket_Row = ticketsRows[i]
      let priceElement = ticket_Row.getElementsByClassName('cart-price')[0]
      let quantityElement = ticket_Row.getElementsByClassName('cart-quantity-input')[0]
      let price = parseFloat(priceElement.innerText.replace(' LKR', ''))
      let cQuant = quantityElement.value
      total = total + (price * cQuant)
    }
    
    total = (total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total+ ' LKR'
  }

var favBtn = document.querySelector('.addToFav');

/*
 Add current order into the localStorage as favourite order
 */
favBtn.addEventListener('click', function(){
  let ticket_Item_Container = document.getElementsByClassName('cart-items')[0]
    let ticketsRows = ticket_Item_Container.getElementsByClassName('cart-row')
  let itemList = [];

  for (let i = 0; i < ticketsRows.length; i++) {
    let cTitle = document.getElementById('product_name_' + i).value
    let fPrice = document.getElementById('product_price_' + i).value
    let cQuant = document.getElementById('product_quantity_' + i).value

    itemList[i] =  {
        'title'  : cTitle, 
        'price' : fPrice, 
        'quantity' : cQuant
    };
  }
  localStorage.setItem("itemList", JSON.stringify(itemList))
});

/*
  Load favourite orders from localStorage into the cart
 */
 orderFav.addEventListener('click', function(){
  productCount = 0
  let cartItems = document.getElementsByClassName('cart-items')[0]
  //console.log(localStorage.length)
  let favLength = JSON.parse(localStorage.getItem('itemList')).length;
  
  for(let i =-0; i < favLength; i++){
    let cTitle = JSON.parse(localStorage.getItem('itemList'))[i].title
    let price = JSON.parse(localStorage.getItem('itemList'))[i].price
    let cQuant = JSON.parse(localStorage.getItem('itemList'))[i].quantity

    let ticket_Row = document.createElement('div')
    ticket_Row.classList.add('cart-row')

    let ticket_Row_Content = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${cTitle}</span>
        </div>
        <div class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
            <input class="cart-quantity-input" id="product_quantity_${productCount}"  type="number" value="${cQuant}">
            <button class="btn btn-danger" type="button">X</button>
            
            <input type="hidden" id = "product_name_${productCount}" value="${cTitle}">
            <input type="hidden" id = "product_price_${productCount}" value="${price}">
            <input type="hidden" id="product_quantity_${productCount}" value="${cQuant}">
        </div>`
    ticket_Row.innerHTML = ticket_Row_Content
    cartItems.append(ticket_Row)
    ticket_Row.getElementsByClassName('btn-danger')[0].addEventListener('click', removeTicketBtn)
    ticket_Row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    productCount++;
  }
  calculateLoyalityPoints(productCount) 
  updateCartTotal()
});

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

var overallBtn = document.querySelector('.btn-purchase');

/*
 Display of cart items on the popup.
 The logic start off by retrieving the existing items added to the cart. Then iterate through 
 the cart items and create a new row within a DIV. The newly created DIV then addeded to the
 DIV that decorated with 'overall-order'. The new DIV adds to display total value under the cart
 */
overallBtn.addEventListener('click', function () {
  let ticket_Item_Container = document.getElementsByClassName('cart-items')[0]
  let ticketsRows = ticket_Item_Container.getElementsByClassName('cart-row')

  for (let i = 0; i < ticketsRows.length; i++) {
    let ticket_Item = ticketsRows[i]
    let oTitle = ticket_Item.getElementsByClassName('cart-item-title')[0].innerText 
    let price = ticket_Item.getElementsByClassName('cart-price')[0].innerText
    let oQuantity = ticket_Item.getElementsByClassName('cart-quantity-input')[0].value
    
    let ticket_Row = document.createElement('div')
    ticket_Row.classList.add('cart-row')
    
    let ticket_Row_Content = `
      <div class="cart-item cart-column">
          <span class="cart-item-title">${oTitle}</span>
      </div>
      <div class="cart-item cart-column">
          <span class="cart-price cart-column">${price}</span>
          
          <input class="cart-quantity-input" id="product_quantity_${productCount}"  type="number" value="${oQuantity}">
      </div>`
    
    ticket_Row.innerHTML = ticket_Row_Content
    document.getElementById("overall-order").append(ticket_Row)
  }

  let cartTotalDev = document.createElement('div')
  cartTotalDev.classList.add('cart-total')

  let cartTotal = document.getElementsByClassName('cart-total-price')[0].innerText
  let cartTotlDisplay = `<strong class="cart-total-title">Total</strong>
  <span class="cart-total-price">${cartTotal}</span>`
  cartTotalDev.innerHTML = cartTotlDisplay
  document.getElementById("overall-order").append(cartTotalDev)

  //Clear the cart
  while (ticket_Item_Container.lastElementChild) {
    ticket_Item_Container.removeChild(ticket_Item_Container.lastElementChild);
  }
  //Clear total cart price
  document.getElementsByClassName('cart-total-price')[0].innerText = "0 LKR"
});

  /*
   Calculate the loyality points based on the number of items added to the cart
   if the number of items added to the cart is greater than or equals to 3 then
   multiply the count by loyality point value which is added as constant,
   LOYALITY_POINT_VALUE. If the value change in the future this can be done only
   the constant. The calculated loyality points value updated to the glocal variable,
   loyalityPoints
   */
   function calculateLoyalityPoints(rowCount){
    if (rowCount > 3){
      loyalityPoints = (rowCount * LOYALITY_POINT_VALUE) + loyalityPoints;
    }
    localStorage.setItem("loyaltyPoints", loyalityPoints);
  }

  function showLoyalityPoints(){
    let loyal = localStorage.getItem("loyaltyPoints");
    if (loyal == null){
      loyal = 0;
    }
    alert('Your loyalty points value is ' + loyal)
  }

/*
  Confirm the order and calculate the loyality points
  First retrieve the top element of the confirm order and then iterate through the
  list and obtain the count. Canculate the loyality points based on the number of
  rows in the cart. Finally clear the confirmed order. Calculated points can be seen
  using the Show Loyality Ponts button. 
 */
function confirmOrder() {
  alert('Thank you for your purchase.')
  let ticket_Item_Container = document.getElementById('overall-order')
  let ticketsRows = ticket_Item_Container.getElementsByClassName('cart-row')
  let rowCount = 0
  
  for (var i = 0; i < ticketsRows.length; i++) {
    rowCount++
  }
  
  //Calculate loyality points
  calculateLoyalityPoints(rowCount)
  localStorage.setItem("loyaltyPoints", loyalityPoints)
  //Clear the cart
  while (ticket_Item_Container.lastElementChild) {
    ticket_Item_Container.removeChild(ticket_Item_Container.lastElementChild);
  }
}

/*donate page---------------------------------------------------------------------------------------*/
function myFunction() {
    alert("Your Donation completed Successfully - Thank You!");
}
