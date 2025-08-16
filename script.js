const products = [
  { id: 1, name: "Laptop", price: 800, img: "images/laptop.jpg" },
  { id: 2, name: "Headphones", price: 120, img: "images/headphones.jpg" },
  { id: 3, name: "Smartphone", price: 600, img: "images/phone.jpg" },
  { id: 4, name: "Shoes", price: 90, img: "images/shoes.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let currentUser = localStorage.getItem("currentUser");
let authMode = "login";

// ===============================
// RENDER PRODUCTS
// ===============================
const productList = document.getElementById("products");
products.forEach(p => {
  productList.innerHTML += `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`;
});

// ===============================
// AUTHENTICATION (Login/Signup)
// ===============================
function toggleAuthMode() {
  authMode = authMode === "login" ? "signup" : "login";
  document.getElementById("auth-title").innerText = authMode === "login" ? "Login" : "Signup";
}

function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (authMode === "signup") {
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful, please login!");
    toggleAuthMode();
  } else {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      currentUser = username;
      localStorage.setItem("currentUser", username);
      alert("Login successful");
      document.getElementById("auth-section").classList.add("hidden");
    } else {
      alert("Invalid credentials");
    }
  }
}

// ===============================
// CART FUNCTIONS
// ===============================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.name} - $${item.price} <button onclick="removeFromCart(${index})">❌</button></li>`;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// ===============================
// CHECKOUT + PAYMENT
// ===============================
function checkout() {
  document.getElementById("checkout").classList.remove("hidden");
}

function makePayment() {
  const address = document.getElementById("address").value;
  if (!address) {
    alert("Please enter delivery address");
    return;
  }
  const order = { user: currentUser, items: cart, total: cart.reduce((sum, i) => sum + i.price, 0), address };
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  alert("Payment successful! Order placed.");
  showOrders();
}

// ===============================
// ORDERS PAGE
// ===============================
function showOrders() {
  const orderList = document.getElementById("order-list");
  if (!orderList) return;
  orderList.innerHTML = "";
  orders.forEach((o, i) => {
    orderList.innerHTML += `<li>Order #${i+1} - ${o.items.length} items - Total $${o.total} - Address: ${o.address}</li>`;
  });
  document.getElementById("orders").classList.remove("hidden");
}

// ===============================
// INITIAL LOAD
// ===============================
updateCart();