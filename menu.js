const ITEMS = [
  {
    name: "Caramel Donuts",
    price: 8,
    image: "./assets/images/dessert.jpg",
  },
  {
    name: "Shrimps Rice",
    price: 12,
    image: "./assets/images/rice.webp",
  },
  {
    name: "Vegetable Pizza",
    price: 17,
    image: "./assets/images/pizza.webp",
  },
  {
    name: "Cheese Burger",
    price: 35,
    image: "./assets/images/burger.jpg",
  },
  {
    name: "Italian Pasta",
    price: 23,
    image: "./assets/images/pasta.jpg",
  },
  {
    name: "Beef Samosa",
    price: 14,
    image: "./assets/images/samosa.jfif",
  },
];

let newCart = [];
let newTotal;

const updateNumOfItems = () => {
  let total = JSON.parse(localStorage.getItem("total")) || 0;
  let num = document.getElementById("num-of-items");
  num.innerText = total;
};

let renderItems = () => {
  updateNumOfItems();
  document.getElementById("wrapper").innerHTML = "";
  for (let i = 0; i < ITEMS.length; i++) {
    renderItem(ITEMS[i], i);
  }
};

let renderItem = (item, index) => {
  let wrapper = document.getElementById("wrapper");
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  let flag = false;
  currentCart.forEach((e) => { //to check if the item menu is exist in the cart in order to change the style and make the pointer event: none
    if (e.name === item.name) {
      flag = true;
    }
  });
  wrapper.innerHTML += `
    <div class="card 
    ${flag === true ? "added" : ""}"
        onclick="addItem('${item.name}', '${item.price}', '${index}')">
        <img src="${item.image}">
        <div class="item-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        </div>
    </div>`;
};

function storeData() {
  const str1 = JSON.stringify(newCart);
  const str2 = JSON.stringify(newTotal);
  localStorage.setItem("cart", str1);
  localStorage.setItem("total", str2);
}

let addItem = (name, price) => {
  let str = prompt("How many items you want to add:", "");
  if (str != "") {
    let num = parseInt(str);
    let oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    let oldTotal = parseInt(localStorage.getItem("total")) || 0;
    newCart = [{ name: name, itemNum: num, price: price }, ...oldCart];
    newTotal = oldTotal + num;
    storeData();
    updateNumOfItems();
    renderItems();
  }
};
