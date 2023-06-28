import {menuArray} from "./data.js";

//Declaration variables
const paymentForm = document.getElementById('card-details-form')
let orderArray = []

// Meal deal discount
const mealDealDiscount = 5; // Adjust the discount amount as needed

// Function to calculate the total price with or without the meal-deal discount
function calculateTotalPrice() {
  let totalPrice = 0;

  // Calculate the total price of the order
  orderArray.forEach(function (orderItem) {
    totalPrice += orderItem.price;
  });

  // Check if the meal-deal checkbox is checked
  const mealDealCheckbox = document.getElementById('meal-deal-checkbox');
  if (mealDealCheckbox.checked) {
    // Apply the meal-deal discount
    totalPrice -= mealDealDiscount;
  }

  // Update the displayed total price
  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.textContent = '£' + totalPrice.toFixed(2); // Adjust the decimal places as needed
}

//Event Listeners
document.addEventListener('click', function(e){
  if(e.target.dataset.add){
    addItemOrder(e.target.dataset.add) 
  } 
  else if (e.target.dataset.remove){
    removeItemOrder(e.target.dataset.remove)
  }
  else if (e.target.id ==='order-btn'){
    openPaymentModal()
  }
})

// Get the Menu data from data.js and create a HTML
function getMenuHtml(){
  let menuHtml = ''

    menuArray.forEach(function(item){
      menuHtml += 
      `
        <div class = "menu-item-container">
          <p class = "item-emoji">${item.emoji}</p>
          <div class ="item-info-wrapper">
            <h2 class ="item-name">${item.name}</h2>
            <p class ="item-ingredients">${item.ingredients}</p>
            <p class ="item-price">£${item.price}</p>
          </div>
          <div class ="add-btn-wrapper">
           <button class ="add-btn" data-add = '${item.id}'>+</button>
          </div>
        </div>
      `
    })
    return menuHtml
}

// Render the Menu into the Menu section 
function renderMenu(){
  document.getElementById("menu-container").innerHTML = getMenuHtml()
}
renderMenu()



//Match the selected Item with the same item in the Menu by filtering by id, then push its object to the orderArray then render the Order
function addItemOrder(selectItemId){
  const targetItemObj = menuArray.filter(function(selectItem){
    return selectItem.id == selectItemId
  })[0]
  orderArray.push(targetItemObj)  
  renderOrder()
  
  //Check if any item has been selected in the orderArray, unhide then the Order container (refer to the function removeItemOrder below)
    if(orderArray!=0){
        document.getElementById('order-container').classList.remove('hidden')
    }   
}


// iterate over the orderArray to generate html string based on what item have been selected
function getOrderHtml(){
  let totalPrice = 0
  let orderHtml =
  ` 
    <h2 class ="order-title">Your order</h2>
  `
  orderArray.forEach(function(orderItem, index){
    
    orderHtml += 
    `   
    <div class ="order-line">
        <h3>${orderItem.name} </h3>
        <p class ="remove-btn" data-remove = '${index}'>remove</p>
        <h3 class ="price">£${orderItem.price}</h3>
    </div>
    ` 
    totalPrice += orderItem.price     
  })
    
    orderHtml +=
    `
    <hr>
    <div class ="total-price-line">
        <h3>Total price:</h3>
        <h3 class = "total-price">£${totalPrice}</h3>
    </div>
    <hr>
    <div id="meal-deal-container">
    <label for="meal-deal-checkbox">Include Meal Deal Discount:</label>
    <input type="checkbox" id="meal-deal-checkbox" name="meal-deal-checkbox">
  </div>
    <button class = "order-btn" id = "order-btn">Complete order</button>
    `
  return orderHtml

}


// Render the Order into the Order section
function renderOrder(){
  document.getElementById('order-container').innerHTML = getOrderHtml()
  // Add event listener to the meal-deal checkbox
  const mealDealCheckbox = document.getElementById('meal-deal-checkbox');
  mealDealCheckbox.addEventListener('change', calculateTotalPrice);

    // Show/hide the meal-deal container based on the number of items in the order
    const mealDealContainer = document.getElementById('meal-deal-container');
    if (orderArray.length < 3 || orderArray.length >= 4) {
      mealDealContainer.style.display = 'none';
    } else {
      mealDealContainer.style.display = 'block';
    }
}


// Function to remove a selected Item from the order list
function removeItemOrder(index){
    orderArray.splice (index,1) // at position index, remove 1 item in the array
    renderOrder()
    
    //If there is no more item in the orderArray, hide the Order container
    if (orderArray.length===0){
        document.getElementById('order-container').classList.add('hidden')
    }  
}


// Function to open the Payment modal when clicking in the Complete order button (switch style from none to inline)
function openPaymentModal() {
  document.getElementById('card-details-modal').style.display = 'inline';
  document.getElementById('order-container').style.display = 'none';
}

// Function to close the Payment modal when clicking in the Close button
function closePaymentModal() {
  document.getElementById('card-details-modal').style.display = 'none';
  document.getElementById('order-container').style.display = 'block';
}

//Interactions with the payment Form
paymentForm.addEventListener('submit', function(e) {
  e.preventDefault(); //Prevent default form behavior of displaying input data in the URL

  setTimeout(function() {
      closePaymentModal();
  }, 3000); //close the payment modal after 3s

  const paymentFormData = new FormData(paymentForm);
  const clientName = paymentFormData.get('fullName'); //get the client Name from the Form to display in the confirmation message below

  setTimeout(function() {
      document.getElementById('order-container').innerHTML =
          `
          <h2 class="thanks-message">Thanks, <span class="client-name">${clientName}</span>! Your order is on the way.</h2>
          `;
  }, 3500); //displaying the confirmation message in the Order container after 3.5s (once the payment modal has been closed)
});

// Function to close the Payment modal when clicking in the Close button
document.getElementById('modal-close-btn').addEventListener('click', function() {
  closePaymentModal();
});