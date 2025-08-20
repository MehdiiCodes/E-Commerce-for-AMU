// Sample product data with enhanced properties
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "electronics",
    image: "public/iphone-15-pro-max.png",
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    description: "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system.",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    price: 2499.99,
    category: "electronics",
    image: "public/macbook-pro-16-inch.png",
    rating: 4.9,
    reviews: 890,
    inStock: true,
    description: "Powerful laptop with M3 Max chip, perfect for professionals and creators.",
  },
  {
    id: 3,
    name: "Nike Air Jordan 1",
    price: 170.0,
    originalPrice: 200.0,
    category: "fashion",
    image: "public/nike-air-jordan-1.png",
    rating: 4.7,
    reviews: 2100,
    inStock: true,
    description: "Classic basketball sneakers with iconic design and premium materials.",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 399.99,
    category: "electronics",
    image: "public/sony-wh-1000xm5.png",
    rating: 4.6,
    reviews: 1580,
    inStock: true,
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
  },
  {
    id: 5,
    name: "Levi's 501 Original Jeans",
    price: 89.99,
    category: "fashion",
    image: "public/levis-501-jeans.png",
    rating: 4.4,
    reviews: 3200,
    inStock: true,
    description: "Classic straight-fit jeans made from premium denim with authentic details.",
  },
  {
    id: 6,
    name: "Modern Living Room Sofa",
    price: 1299.99,
    category: "home",
    image: "public/modern-living-room-sofa-set.png",
    rating: 4.5,
    reviews: 450,
    inStock: true,
    description: "Comfortable 3-seater sofa with modern design and premium upholstery.",
  },
  {
    id: 7,
    name: "Adidas Ultraboost 22",
    price: 180.0,
    category: "sports",
    image: "public/adidas-ultraboost-22.png",
    rating: 4.6,
    reviews: 1890,
    inStock: true,
    description: "High-performance running shoes with responsive cushioning and energy return.",
  },
  {
    id: 8,
    name: "iPad Pro 12.9-inch",
    price: 1099.99,
    category: "electronics",
    image: "public/ipad-pro-12-9-inch.png",
    rating: 4.8,
    reviews: 920,
    inStock: true,
    description: "Powerful tablet with M2 chip, perfect for creativity and productivity.",
  },
  {
    id: 9,
    name: "Black Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    category: "fashion",
    image: "public/black-leather-jacket-fashion.png",
    rating: 4.3,
    reviews: 680,
    inStock: true,
    description: "Premium leather jacket with classic design and superior craftsmanship.",
  },
  {
    id: 10,
    name: "Smart Coffee Maker",
    price: 249.99,
    category: "home",
    image: "public/smart-coffee-maker.png",
    rating: 4.4,
    reviews: 1120,
    inStock: true,
    description: "WiFi-enabled coffee maker with app control and customizable brewing settings.",
  },
  {
    id: 11,
    name: "Premium Yoga Mat",
    price: 79.99,
    category: "sports",
    image: "public/premium-yoga-mat-exercise.png",
    rating: 4.7,
    reviews: 2340,
    inStock: true,
    description: "Non-slip yoga mat with superior grip and cushioning for all practice levels.",
  },
  {
    id: 12,
    name: "Wireless Gaming Mouse",
    price: 129.99,
    category: "electronics",
    image: "public/placeholder-fcgef.png",
    rating: 4.5,
    reviews: 890,
    inStock: false,
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
  },
]

// Global variables
let cart = JSON.parse(localStorage.getItem("cart")) || []
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null
let filteredProducts = [...products]
let currentSlide = 0
let slideInterval

// DOM elements
const productsGrid = document.getElementById("productsGrid")
const cartCount = document.getElementById("cartCount")
const wishlistCount = document.getElementById("wishlistCount")
const categoryFilter = document.getElementById("categoryFilter")
const sortFilter = document.getElementById("sortFilter")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const closeMobileMenu = document.getElementById("closeMobileMenu")
const cartSidebar = document.getElementById("cartSidebar")
const wishlistSidebar = document.getElementById("wishlistSidebar")
const overlay = document.getElementById("overlay")
const quickViewModal = document.getElementById("quickViewModal")
const quickViewContent = document.getElementById("quickViewContent")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products)
  updateCartCount()
  updateWishlistCount()
  updateWishlistButtons()
  initializeHeroSlider()
  setupEventListeners()

  // Close sidebars when clicking overlay
  if (overlay) {
    overlay.addEventListener("click", () => {
      cartSidebar?.classList.remove("active")
      wishlistSidebar?.classList.remove("active")
      overlay.classList.remove("active")
    })
  }
})

// Setup event listeners
function setupEventListeners() {
  // Mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })

  closeMobileMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })

  // Close mobile menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove("active")
    }
  })

  // Category filter
  categoryFilter.addEventListener("change", filterProducts)

  // Sort filter
  sortFilter.addEventListener("change", sortProducts)

  // Category cards
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category
      categoryFilter.value = category
      filterProducts()
      scrollToProducts()
    })
  })

  // Cart modal
  document.getElementById("cartBtn").addEventListener("click", toggleCart)
  document.getElementById("closeCartModal").addEventListener("click", closeQuickView)

  // Wishlist modal
  document.getElementById("wishlistBtn").addEventListener("click", toggleWishlist)
  document.getElementById("closeWishlistModal").addEventListener("click", closeQuickView)

  // Auth modal
  document.getElementById("loginBtn").addEventListener("click", openAuthModal)
  document.getElementById("mobileLoginBtn").addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    openAuthModal()
  })
  document.getElementById("closeAuthModal").addEventListener("click", closeAuthModal)

  // Checkout modal
  document.getElementById("checkoutBtn").addEventListener("click", openCheckoutModal)
  document.getElementById("closeCheckoutModal").addEventListener("click", closeCheckoutModal)

  // Auth form switching
  document.getElementById("authSwitchLink").addEventListener("click", (e) => {
    e.preventDefault()
    toggleAuthMode()
  })

  // Form submissions
  document.getElementById("authForm").addEventListener("submit", handleAuth)
  document.getElementById("checkoutForm").addEventListener("submit", handleCheckout)
  document.getElementById("contactForm").addEventListener("submit", handleContactForm)

  // Cart actions
  document.getElementById("clearCartBtn").addEventListener("click", clearCart)

  // Close modals when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })

  // Newsletter form
  document.querySelector(".newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showMessage("Thank you for subscribing to our newsletter!", "success")
    e.target.reset()
  })

  // Payment method toggle
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", togglePaymentMethod)
  })
}

// Product display functions
function displayProducts(productsToShow) {
  productsGrid.innerHTML = ""

  if (productsToShow.length === 0) {
    productsGrid.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">No products found.</p>'
    return
  }

  productsToShow.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const isInWishlist = wishlist.some((item) => item.id === product.id)

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='public/placeholder-fcgef.png'">
            ${discount > 0 ? `<div class="discount">-${discount}%</div>` : ""}
            ${!product.inStock ? '<div class="out-of-stock">Out of Stock</div>' : ""}
            <div class="product-actions">
                <button class="action-btn wishlist-btn ${isInWishlist ? "active" : ""}" 
                        onclick="addToWishlist(${product.id})" 
                        data-product-id="${product.id}"
                        title="Add to wishlist">
                    <i class="fa${isInWishlist ? "s" : "r"} fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick view">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
            </div>
            <button class="add-to-cart-btn ${!product.inStock ? "disabled" : ""}" 
                    onclick="addToCart(${product.id})" 
                    ${!product.inStock ? "disabled" : ""}>
                <i class="fas fa-cart-plus"></i>
                ${product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    `

  return card
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  let stars = ""

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star star"></i>'
  }

  // Half star
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt star"></i>'
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star star"></i>'
  }

  return `<div class="stars">${stars}</div>`
}

function filterProducts() {
  const selectedCategory = categoryFilter.value

  if (selectedCategory === "all") {
    filteredProducts = [...products]
  } else {
    filteredProducts = products.filter((product) => product.category === selectedCategory)
  }

  sortProducts()
}

function sortProducts() {
  const sortValue = sortFilter.value

  switch (sortValue) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      // Keep original order
      break
  }

  displayProducts(filteredProducts)
}

// Cart and Wishlist Management
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  if (!product.inStock) {
    showMessage("Sorry, this product is out of stock!", "error")
    return
  }

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
    showMessage(`Increased quantity of ${product.name}`, "success")
  } else {
    cart.push({
      ...product,
      quantity: 1,
      addedAt: new Date().toISOString(),
    })
    showMessage(`${product.name} added to cart!`, "success")
  }

  updateCartCount()
  updateWishlistCount()
  saveCart()

  // Add animation to cart button
  const cartBtn = document.querySelector(".cart-btn")
  cartBtn.classList.add("bounce")
  setTimeout(() => cartBtn.classList.remove("bounce"), 300)
}

function addToWishlist(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = wishlist.find((item) => item.id === productId)

  if (existingItem) {
    removeFromWishlist(productId)
    return
  }

  wishlist.push({
    ...product,
    addedAt: new Date().toISOString(),
  })

  updateWishlistCount()
  saveWishlist()
  showMessage(`${product.name} added to wishlist!`, "success")

  // Update wishlist button state
  updateWishlistButtons()
}

function removeFromCart(productId) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    cart = cart.filter((item) => item.id !== productId)
    updateCartCount()
    saveCart()
    displayCartItems()
    showMessage(`${item.name} removed from cart`, "success")
  }
}

function removeFromWishlist(productId) {
  const item = wishlist.find((item) => item.id === productId)
  if (item) {
    wishlist = wishlist.filter((item) => item.id !== productId)
    updateWishlistCount()
    saveWishlist()
    displayWishlistItems()
    updateWishlistButtons()
    showMessage(`${item.name} removed from wishlist`, "success")
  }
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    const newQuantity = item.quantity + change

    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else if (newQuantity <= 10) {
      // Max quantity limit
      item.quantity = newQuantity
      updateCartCount()
      saveCart()
      displayCartItems()
    } else {
      showMessage("Maximum quantity limit reached (10)", "error")
    }
  }
}

function clearCart() {
  if (cart.length === 0) {
    showMessage("Cart is already empty!", "error")
    return
  }

  if (confirm("Are you sure you want to clear your cart?")) {
    cart = []
    updateCartCount()
    saveCart()
    displayCartItems()
    showMessage("Cart cleared successfully!", "success")
  }
}

function moveToCart(productId) {
  const wishlistItem = wishlist.find((item) => item.id === productId)
  if (wishlistItem) {
    addToCart(productId)
    removeFromWishlist(productId)
  }
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function getShippingCost() {
  const subtotal = getCartSubtotal()
  return subtotal > 100 ? 0 : 9.99 // Free shipping over $100
}

function getTaxAmount() {
  const subtotal = getCartSubtotal()
  return subtotal * 0.08 // 8% tax
}

function getCartTotal() {
  return getCartSubtotal() + getShippingCost() + getTaxAmount()
}

function applyPromoCode(code) {
  const promoCodes = {
    SAVE10: { discount: 0.1, minAmount: 50 },
    WELCOME20: { discount: 0.2, minAmount: 100 },
    FREESHIP: { freeShipping: true, minAmount: 25 },
  }

  const promo = promoCodes[code.toUpperCase()]
  const subtotal = getCartSubtotal()

  if (!promo) {
    showMessage("Invalid promo code!", "error")
    return false
  }

  if (subtotal < promo.minAmount) {
    showMessage(`Minimum order of $${promo.minAmount} required for this promo code`, "error")
    return false
  }

  // Store applied promo
  localStorage.setItem("appliedPromo", JSON.stringify(promo))
  showMessage(
    `Promo code applied! You saved ${promo.discount ? (promo.discount * 100) + "%" : "on shipping"}`,
    "success",
  )
  displayCartItems()
  return true
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountElement = document.getElementById("cartCount")
  if (cartCountElement) {
    cartCountElement.textContent = totalItems

    // Add animation when count changes
    if (totalItems > 0) {
      cartCountElement.style.display = "flex"
      cartCountElement.classList.add("pulse")
      setTimeout(() => cartCountElement.classList.remove("pulse"), 300)
    } else {
      cartCountElement.style.display = "none"
    }
  }
}

function updateWishlistCount() {
  const wishlistCountElement = document.getElementById("wishlistCount")
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlist.length

    if (wishlist.length > 0) {
      wishlistCountElement.style.display = "flex"
    } else {
      wishlistCountElement.style.display = "none"
    }
  }
}

function updateWishlistButtons() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const productId = Number.parseInt(btn.dataset.productId)
    const isInWishlist = wishlist.some((item) => item.id === productId)

    if (isInWishlist) {
      btn.classList.add("active")
      btn.innerHTML = '<i class="fas fa-heart"></i>'
    } else {
      btn.classList.remove("active")
      btn.innerHTML = '<i class="far fa-heart"></i>'
    }
  })
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
}

function displayCartItems() {
  const cartItems = document.getElementById("cartItems")
  const cartSubtotal = document.getElementById("cartSubtotal")
  const cartShipping = document.getElementById("cartShipping")
  const cartTotal = document.getElementById("cartTotal")

  if (!cartItems) return

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <button class="btn btn-primary" onclick="toggleCart(); scrollToProducts();">Continue Shopping</button>
            </div>
        `
    if (cartSubtotal) cartSubtotal.textContent = "$0.00"
    if (cartShipping) cartShipping.textContent = "$0.00"
    if (cartTotal) cartTotal.textContent = "$0.00"
    return
  }

  cartItems.innerHTML = ""
  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='public/placeholder-fcgef.png'">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="item-actions">
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
    cartItems.appendChild(cartItem)
  })

  // Update totals
  const subtotal = getCartSubtotal()
  const shipping = getShippingCost()
  const total = getCartTotal()

  if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`
  if (cartShipping) cartShipping.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`
}

function displayWishlistItems() {
  const wishlistItems = document.getElementById("wishlistItems")
  if (!wishlistItems) return

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save items you love for later!</p>
                <button class="btn btn-primary" onclick="toggleWishlist(); scrollToProducts();">Browse Products</button>
            </div>
        `
    return
  }

  wishlistItems.innerHTML = ""
  wishlist.forEach((item) => {
    const wishlistItem = document.createElement("div")
    wishlistItem.className = "wishlist-item"
    wishlistItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='public/placeholder-fcgef.png'">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-rating">
                    ${generateStars(item.rating)}
                    <span class="rating-text">(${item.reviews})</span>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary btn-sm" onclick="moveToCart(${item.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="remove-btn" onclick="removeFromWishlist(${item.id})" title="Remove from wishlist">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
    wishlistItems.appendChild(wishlistItem)
  })
}

function toggleCart() {
  if (cartSidebar && overlay) {
    const isActive = cartSidebar.classList.contains("active")

    if (isActive) {
      cartSidebar.classList.remove("active")
      overlay.classList.remove("active")
    } else {
      cartSidebar.classList.add("active")
      overlay.classList.add("active")
      displayCartItems()
    }
  }
}

function toggleWishlist() {
  if (wishlistSidebar && overlay) {
    const isActive = wishlistSidebar.classList.contains("active")

    if (isActive) {
      wishlistSidebar.classList.remove("active")
      overlay.classList.remove("active")
    } else {
      wishlistSidebar.classList.add("active")
      overlay.classList.add("active")
      displayWishlistItems()
    }
  }
}

function quickView(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const modal = document.getElementById("quickViewModal")
  const content = document.getElementById("quickViewContent")

  if (modal && content) {
    const isInWishlist = wishlist.some((item) => item.id === productId)
    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

    content.innerHTML = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='public/placeholder-fcgef.png'">
                    ${discount > 0 ? `<div class="discount">-${discount}%</div>` : ""}
                </div>
                <div class="quick-view-details">
                    <div class="product-category">${product.category}</div>
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="rating-text">(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <button class="btn btn-primary ${!product.inStock ? "disabled" : ""}" 
                                onclick="addToCart(${product.id}); closeQuickView();" 
                                ${!product.inStock ? "disabled" : ""}>
                            <i class="fas fa-cart-plus"></i>
                            ${product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                        <button class="btn btn-secondary ${isInWishlist ? "active" : ""}" 
                                onclick="addToWishlist(${product.id})">
                            <i class="fa${isInWishlist ? "s" : "r"} fa-heart"></i>
                            ${isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                    <div class="product-stock">
                        <i class="fas fa-${product.inStock ? "check-circle text-success" : "times-circle text-danger"}"></i>
                        ${product.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                </div>
            </div>
        `

    modal.classList.add("active")
  }
}

function closeQuickView() {
  if (quickViewModal) {
    quickViewModal.classList.remove("active")
  }
}

// Modal functions
function openAuthModal() {
  document.getElementById("authModal").classList.add("active")
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active")
}

function toggleAuthMode() {
  const authTitle = document.getElementById("authTitle")
  const authSubmitBtn = document.getElementById("authSubmitBtn")
  const authSwitchText = document.getElementById("authSwitchText")
  const authSwitchLink = document.getElementById("authSwitchLink")
  const nameGroup = document.getElementById("nameGroup")
  const confirmPasswordGroup = document.getElementById("confirmPasswordGroup")

  if (authTitle.textContent === "Login") {
    // Switch to signup
    authTitle.textContent = "Sign Up"
    authSubmitBtn.textContent = "Sign Up"
    authSwitchText.innerHTML = 'Already have an account? <a href="#" id="authSwitchLink">Login</a>'
    nameGroup.style.display = "block"
    confirmPasswordGroup.style.display = "block"
    document.getElementById("fullName").required = true
    document.getElementById("confirmPassword").required = true
  } else {
    // Switch to login
    authTitle.textContent = "Login"
    authSubmitBtn.textContent = "Login"
    authSwitchText.innerHTML = 'Don\'t have an account? <a href="#" id="authSwitchLink">Sign up</a>'
    nameGroup.style.display = "none"
    confirmPasswordGroup.style.display = "none"
    document.getElementById("fullName").required = false
    document.getElementById("confirmPassword").required = false
  }

  // Re-attach event listener to new link
  document.getElementById("authSwitchLink").addEventListener("click", (e) => {
    e.preventDefault()
    toggleAuthMode()
  })
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showMessage("Your cart is empty!", "error")
    return
  }

  if (!currentUser) {
    showMessage("Please login to proceed with checkout", "error")
    closeQuickView()
    openAuthModal()
    return
  }

  document.getElementById("checkoutModal").classList.add("active")
  updateCheckoutSummary()
  closeQuickView()
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("active")
}

function updateCheckoutSummary() {
  const subtotal = getCartSubtotal()
  const shipping = getShippingCost()
  const total = getCartTotal()

  document.getElementById("checkoutSubtotal").textContent = subtotal.toFixed(2)
  document.getElementById("checkoutShipping").textContent = shipping.toFixed(2)
  document.getElementById("checkoutTotal").textContent = total.toFixed(2)
}

function togglePaymentMethod() {
  const cardDetails = document.getElementById("cardDetails")
  const selectedPayment = document.querySelector('input[name="payment"]:checked').value

  if (selectedPayment === "card") {
    cardDetails.style.display = "block"
    cardDetails.querySelectorAll("input").forEach((input) => (input.required = true))
  } else {
    cardDetails.style.display = "none"
    cardDetails.querySelectorAll("input").forEach((input) => (input.required = false))
  }
}

// Form handlers
function handleAuth(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const isSignup = document.getElementById("authTitle").textContent === "Sign Up"

  if (isSignup) {
    const fullName = document.getElementById("fullName").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (password !== confirmPassword) {
      showMessage("Passwords do not match!", "error")
      return
    }

    // Simulate signup
    const user = {
      id: Date.now(),
      name: fullName,
      email: email,
    }

    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
    showMessage("Account created successfully!", "success")
  } else {
    // Simulate login
    const user = {
      id: Date.now(),
      name: "User",
      email: email,
    }

    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
    showMessage("Logged in successfully!", "success")
  }

  updateUserInterface()
  closeAuthModal()
  e.target.reset()
}

function handleCheckout(e) {
  e.preventDefault()

  // Simulate payment processing
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.innerHTML = '<span class="loading"></span> Processing...'
  submitBtn.disabled = true

  setTimeout(() => {
    // Simulate successful payment
    showMessage("Order placed successfully! Thank you for your purchase.", "success")

    // Clear cart
    cart = []
    updateCartCount()
    saveCart()

    // Reset form and close modal
    e.target.reset()
    closeCheckoutModal()

    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

function handleContactForm(e) {
  e.preventDefault()
  showMessage("Thank you for your message! We will get back to you soon.", "success")
  e.target.reset()
}

// User interface updates
function updateUserInterface() {
  const loginBtn = document.getElementById("loginBtn")
  const mobileLoginBtn = document.getElementById("mobileLoginBtn")

  if (currentUser) {
    loginBtn.textContent = `Hi, ${currentUser.name}`
    loginBtn.onclick = logout
    mobileLoginBtn.textContent = `Hi, ${currentUser.name}`
    mobileLoginBtn.onclick = logout
  } else {
    loginBtn.textContent = "Login"
    loginBtn.onclick = openAuthModal
    mobileLoginBtn.textContent = "Login"
    mobileLoginBtn.onclick = () => {
      mobileMenu.classList.remove("active")
      openAuthModal()
    }
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUserInterface()
  showMessage("Logged out successfully!", "success")
}

// Utility functions
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" })
}

function showMessage(message, type) {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(".message")
  existingMessages.forEach((msg) => msg.remove())

  // Create new message
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
  messageDiv.textContent = message

  // Insert at top of body
  document.body.insertBefore(messageDiv, document.body.firstChild)

  // Remove after 3 seconds
  setTimeout(() => {
    messageDiv.remove()
  }, 3000)
}

// Search functionality (bonus feature)
function setupSearch() {
  const searchBtn = document.getElementById("searchBtn")
  let searchInput = null

  searchBtn.addEventListener("click", () => {
    if (!searchInput) {
      searchInput = document.createElement("input")
      searchInput.type = "text"
      searchInput.placeholder = "Search products..."
      searchInput.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                width: 250px;
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                background: white;
                z-index: 1001;
            `

      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase()
        if (query === "") {
          filteredProducts = [...products]
        } else {
          filteredProducts = products.filter(
            (product) =>
              product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
          )
        }
        displayProducts(filteredProducts)
      })

      searchBtn.parentElement.style.position = "relative"
      searchBtn.parentElement.appendChild(searchInput)
    }

    searchInput.style.display = searchInput.style.display === "none" ? "block" : "none"
    if (searchInput.style.display === "block") {
      searchInput.focus()
    }
  })
}

// Initialize search
setupSearch()

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Close mobile menu if open
    mobileMenu.classList.remove("active")
  })
})

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s"
  })
})

// Hero slider initialization
function initializeHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  if (slides.length === 0) return

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none"
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  showSlide(currentSlide)
  slideInterval = setInterval(nextSlide, 5000)
}

// Stop slider on interaction
document.querySelectorAll(".hero-slide").forEach((slide) => {
  slide.addEventListener("mouseenter", () => clearInterval(slideInterval))
  slide.addEventListener("mouseleave", () => initializeHeroSlider())
})
