// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        category: "electronics",
        image: "/placeholder.svg?height=250&width=280",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        category: "electronics",
        image: "/placeholder.svg?height=250&width=280",
        description: "Track your fitness goals with GPS, heart rate monitor, and sleep tracking."
    },
    {
        id: 3,
        name: "Casual Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "/placeholder.svg?height=250&width=280",
        description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes."
    },
    {
        id: 4,
        name: "Denim Jeans",
        price: 59.99,
        category: "clothing",
        image: "/placeholder.svg?height=250&width=280",
        description: "Classic fit denim jeans made from premium quality denim fabric."
    },
    {
        id: 5,
        name: "Smartphone",
        price: 699.99,
        category: "electronics",
        image: "/placeholder.svg?height=250&width=280",
        description: "Latest smartphone with advanced camera system and all-day battery life."
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 89.99,
        category: "sports",
        image: "/placeholder.svg?height=250&width=280",
        description: "Lightweight running shoes with superior cushioning and breathable design."
    },
    {
        id: 7,
        name: "Yoga Mat",
        price: 29.99,
        category: "sports",
        image: "/placeholder.svg?height=250&width=280",
        description: "Non-slip yoga mat perfect for all types of yoga and exercise routines."
    },
    {
        id: 8,
        name: "Coffee Maker",
        price: 149.99,
        category: "home",
        image: "/placeholder.svg?height=250&width=280",
        description: "Programmable coffee maker with built-in grinder and thermal carafe."
    },
    {
        id: 9,
        name: "Indoor Plant Set",
        price: 39.99,
        category: "home",
        image: "/placeholder.svg?height=250&width=280",
        description: "Beautiful set of low-maintenance indoor plants to brighten your home."
    },
    {
        id: 10,
        name: "Laptop Backpack",
        price: 49.99,
        category: "electronics",
        image: "/placeholder.svg?height=250&width=280",
        description: "Durable laptop backpack with multiple compartments and USB charging port."
    },
    {
        id: 11,
        name: "Winter Jacket",
        price: 129.99,
        category: "clothing",
        image: "/placeholder.svg?height=250&width=280",
        description: "Warm and stylish winter jacket with water-resistant exterior."
    },
    {
        id: 12,
        name: "Basketball",
        price: 34.99,
        category: "sports",
        image: "/placeholder.svg?height=250&width=280",
        description: "Official size basketball with superior grip and durability."
    }
];

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let filteredProducts = [...products];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    updateUserInterface();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });

    // Category filter
    categoryFilter.addEventListener('change', filterProducts);
    
    // Sort filter
    sortFilter.addEventListener('change', sortProducts);

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            categoryFilter.value = category;
            filterProducts();
            scrollToProducts();
        });
    });

    // Cart modal
    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    document.getElementById('closeCartModal').addEventListener('click', closeCartModal);

    // Auth modal
    document.getElementById('loginBtn').addEventListener('click', openAuthModal);
    document.getElementById('mobileLoginBtn').addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        openAuthModal();
    });
    document.getElementById('closeAuthModal').addEventListener('click', closeAuthModal);

    // Checkout modal
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    document.getElementById('closeCheckoutModal').addEventListener('click', closeCheckoutModal);

    // Auth form switching
    document.getElementById('authSwitchLink').addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthMode();
    });

    // Form submissions
    document.getElementById('authForm').addEventListener('submit', handleAuth);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);

    // Cart actions
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showMessage('Thank you for subscribing to our newsletter!', 'success');
        e.target.reset();
    });

    // Payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', togglePaymentMethod);
    });
}

// Product display functions
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">No products found.</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    
    sortProducts();
}

function sortProducts() {
    const sortValue = sortFilter.value;
    
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order
            break;
    }
    
    displayProducts(filteredProducts);
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showMessage('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    displayCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            saveCart();
            displayCartItems();
        }
    }
}

function clearCart() {
    cart = [];
    updateCartCount();
    saveCart();
    displayCartItems();
    showMessage('Cart cleared!', 'success');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Modal functions
function openCartModal() {
    document.getElementById('cartModal').classList.add('active');
    displayCartItems();
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = getCartTotal().toFixed(2);
}

function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

function toggleAuthMode() {
    const authTitle = document.getElementById('authTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authSwitchText = document.getElementById('authSwitchText');
    const authSwitchLink = document.getElementById('authSwitchLink');
    const nameGroup = document.getElementById('nameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    
    if (authTitle.textContent === 'Login') {
        // Switch to signup
        authTitle.textContent = 'Sign Up';
        authSubmitBtn.textContent = 'Sign Up';
        authSwitchText.innerHTML = 'Already have an account? <a href="#" id="authSwitchLink">Login</a>';
        nameGroup.style.display = 'block';
        confirmPasswordGroup.style.display = 'block';
        document.getElementById('fullName').required = true;
        document.getElementById('confirmPassword').required = true;
    } else {
        // Switch to login
        authTitle.textContent = 'Login';
        authSubmitBtn.textContent = 'Login';
        authSwitchText.innerHTML = 'Don\'t have an account? <a href="#" id="authSwitchLink">Sign up</a>';
        nameGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        document.getElementById('fullName').required = false;
        document.getElementById('confirmPassword').required = false;
    }
    
    // Re-attach event listener to new link
    document.getElementById('authSwitchLink').addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthMode();
    });
}

function openCheckoutModal() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    if (!currentUser) {
        showMessage('Please login to proceed with checkout', 'error');
        closeCartModal();
        openAuthModal();
        return;
    }
    
    document.getElementById('checkoutModal').classList.add('active');
    updateCheckoutSummary();
    closeCartModal();
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function updateCheckoutSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    document.getElementById('checkoutSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('checkoutShipping').textContent = shipping.toFixed(2);
    document.getElementById('checkoutTotal').textContent = total.toFixed(2);
}

function togglePaymentMethod() {
    const cardDetails = document.getElementById('cardDetails');
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    if (selectedPayment === 'card') {
        cardDetails.style.display = 'block';
        cardDetails.querySelectorAll('input').forEach(input => input.required = true);
    } else {
        cardDetails.style.display = 'none';
        cardDetails.querySelectorAll('input').forEach(input => input.required = false);
    }
}

// Form handlers
function handleAuth(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isSignup = document.getElementById('authTitle').textContent === 'Sign Up';
    
    if (isSignup) {
        const fullName = document.getElementById('fullName').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match!', 'error');
            return;
        }
        
        // Simulate signup
        const user = {
            id: Date.now(),
            name: fullName,
            email: email
        };
        
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('Account created successfully!', 'success');
    } else {
        // Simulate login
        const user = {
            id: Date.now(),
            name: 'User',
            email: email
        };
        
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('Logged in successfully!', 'success');
    }
    
    updateUserInterface();
    closeAuthModal();
    e.target.reset();
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate payment processing
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful payment
        showMessage('Order placed successfully! Thank you for your purchase.', 'success');
        
        // Clear cart
        cart = [];
        updateCartCount();
        saveCart();
        
        // Reset form and close modal
        e.target.reset();
        closeCheckoutModal();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleContactForm(e) {
    e.preventDefault();
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    e.target.reset();
}

// User interface updates
function updateUserInterface() {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    
    if (currentUser) {
        loginBtn.textContent = `Hi, ${currentUser.name}`;
        loginBtn.onclick = logout;
        mobileLoginBtn.textContent = `Hi, ${currentUser.name}`;
        mobileLoginBtn.onclick = logout;
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = openAuthModal;
        mobileLoginBtn.textContent = 'Login';
        mobileLoginBtn.onclick = () => {
            mobileMenu.classList.remove('active');
            openAuthModal();
        };
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showMessage('Logged out successfully!', 'success');
}

// Utility functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of body
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Search functionality (bonus feature)
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    let searchInput = null;
    
    searchBtn.addEventListener('click', () => {
        if (!searchInput) {
            searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search products...';
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
            `;
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query === '') {
                    filteredProducts = [...products];
                } else {
                    filteredProducts = products.filter(product =>
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query)
                    );
                }
                displayProducts(filteredProducts);
            });
            
            searchBtn.parentElement.style.position = 'relative';
            searchBtn.parentElement.appendChild(searchInput);
        }
        
        searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
        if (searchInput.style.display === 'block') {
            searchInput.focus();
        }
    });
}

// Initialize search
setupSearch();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
    });
});