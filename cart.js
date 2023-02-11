const loadCartItems = () => {
  // To render all cart items
  updateNumOfItems();
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("container");
  if (currentCart.length > 0) {
    //To check if cart not empty
    container.innerHTML = "";
    for (let i = 0; i < currentCart.length; i++) {
      container.innerHTML += `
      <div class="cart-item">
        <span class="cart-item-name">${currentCart[i].name}</span>
        <div class="cart-item-info">
            <span>${currentCart[i].price}* ${currentCart[i].itemNum} $</span>
            <span>${currentCart[i].price * currentCart[i].itemNum}$</span>
            <button onclick="deleteItem(${i})">X</button>
        </div>
    </div>
    <hr>
  `;
    }
    container.innerHTML += `
    <div id="total">
      <span id="total-price">Total: </span>
      <button id="clear" onclick="deleteAllItems()">clear all</button>
    </div>`;
  } else {
    container.innerHTML = "<h2>No Items in your Cart!</h2>";
  }

  totalPrice();
};

const totalPrice = () => {
  //to render total price
  let totalPrice = document.getElementById("total-price") || [];
  let currentCart = JSON.parse(localStorage.getItem("cart")) || 0;
  let total = 0;
  for (let i = 0; i < currentCart.length; i++) {
    total += currentCart[i].itemNum * currentCart[i].price;
  }
  totalPrice.innerText = total;
};

const deleteItem = (index) => {
  //to delete an item
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = JSON.parse(localStorage.getItem("total")) || 0;
  let newTotal = total - currentCart[index].itemNum;
  localStorage.setItem("total", JSON.stringify(newTotal));
  currentCart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(currentCart));
  updateNumOfItems();
  totalPrice();
  loadCartItems();
};

const deleteAllItems = () => {
  //to delete all items
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  currentCart = [];
  localStorage.setItem("cart", JSON.stringify(currentCart));
  let total = JSON.parse(localStorage.getItem("total"));
  total = 0;
  localStorage.setItem("total", JSON.stringify(total));
  document.getElementById("total").innerHTML = "<h1>No Items in your Cart</h1>";
  updateNumOfItems();
  totalPrice();
  loadCartItems();
};

const updateNumOfItems = () => {
  //to add or update the total number of item after delete all or one item
  let total = JSON.parse(localStorage.getItem("total")) || 0;
  let num = document.getElementById("num-of-items");
  num.innerText = total;
};
