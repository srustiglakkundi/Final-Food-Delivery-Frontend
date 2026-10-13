const restaurantData = [
  {
    id: 'sunset-bowl',
    name: 'Sunset Bowl',
    cuisine: 'Asian',
    rating: 4.9,
    delivery: 18,
    fee: 2.99,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    description: 'Rice bowls, noodles, and crispy bites built for easy comfort.',
    menu: [
      { id: 'sunset-katsu', name: 'Crispy Katsu Bowl', price: 16.5, description: 'Crispy tofu, jasmine rice, pickled veg, sesame dressing.', type: 'veg' },
      { id: 'sunset-miso', name: 'Miso Ramen', price: 18.0, description: 'Rich broth, spring onion, mushrooms, soft egg.', type: 'nonveg' },
      { id: 'sunset-garlic', name: 'Garlic Edamame', price: 8.5, description: 'Warm, roasted edamame with chili crisp.', type: 'veg' }
    ]
  },
  {
    id: 'saffron',
    name: 'Saffron & Co.',
    cuisine: 'Indian',
    rating: 4.8,
    delivery: 23,
    fee: 3.49,
    badge: 'Top rated',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    description: 'Slow-cooked curries, warming breads, and bright spice.',
    menu: [
      { id: 'saffron-paneer', name: 'Paneer Tikka', price: 15.0, description: 'Charred paneer, yogurt marinade, lime-coriander finish.', type: 'veg' },
      { id: 'saffron-butter', name: 'Butter Chicken', price: 19.5, description: 'Creamy tomato curry with tender chicken and basmati.', type: 'nonveg' },
      { id: 'saffron-naan', name: 'Garlic Naan', price: 6.5, description: 'Fresh, oven-baked naan brushed with garlic butter.', type: 'veg' }
    ]
  },
  {
    id: 'hillbilly-pizza',
    name: 'Hillbilly Pizza',
    cuisine: 'Pizza',
    rating: 4.7,
    delivery: 16,
    fee: 2.5,
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    description: 'Wood-fired pies with a little drama and a lot of cheese.',
    menu: [
      { id: 'pizza-margherita', name: 'Margherita', price: 17.0, description: 'Tomato, basil, mozzarella, olive oil.', type: 'veg' },
      { id: 'pizza-pepperoni', name: 'Pepperoni Fire', price: 19.5, description: 'Spicy pepperoni, mozzarella, tomato, chili flakes.', type: 'nonveg' },
      { id: 'pizza-garden', name: 'Garden Pie', price: 18.0, description: 'Roasted peppers, olives, onion, rocket, burrata.', type: 'veg' }
    ]
  },
  {
    id: 'ember-burger',
    name: 'Ember Burger',
    cuisine: 'Burgers',
    rating: 4.9,
    delivery: 20,
    fee: 2.99,
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    description: 'Big burgers, crisp fries, and properly good shakes.',
    menu: [
      { id: 'burger-truffle', name: 'Truffle Melt', price: 15.5, description: 'Double patty, cheddar, truffle aioli, onion jam.', type: 'nonveg' },
      { id: 'burger-veg', name: 'Garden Smash', price: 14.0, description: 'Plant-based patty, lettuce, tomato, vegan mayo.', type: 'veg' },
      { id: 'burger-fries', name: 'Loaded Fries', price: 7.5, description: 'Crispy fries, parmesan, herbs, garlic dip.', type: 'veg' }
    ]
  },
  {
    id: 'cinder-sweet',
    name: 'Cinder Sweet',
    cuisine: 'Desserts',
    rating: 4.8,
    delivery: 14,
    fee: 1.99,
    badge: 'Sweet',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
    description: 'Baked goods, soft cakes, and a very convincing dessert moment.',
    menu: [
      { id: 'sweet-tart', name: 'Berry Cheesecake', price: 9.5, description: 'Creamy vanilla cheesecake with a berry glaze.', type: 'veg' },
      { id: 'sweet-croissant', name: 'Almond Croissant', price: 6.0, description: 'Buttery pastry with almond filling and crunch.', type: 'veg' },
      { id: 'sweet-choco', name: 'Chocolate Lava Cake', price: 10.0, description: 'Warm center, dark chocolate finish, vanilla cream.', type: 'veg' }
    ]
  }
];

const state = {
  selectedCuisine: 'All',
  search: '',
  sort: 'recommended',
  cart: []
};

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.play().catch(() => {
    heroVideo.controls = true;
  });
}

const restaurantGrid = document.getElementById('restaurant-grid');
const cuisineFilter = document.getElementById('cuisine-filter');
const restaurantSearch = document.getElementById('restaurant-search');
const sortSelect = document.getElementById('sort-select');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');
const cartCount = document.getElementById('cart-count');
const drawerCount = document.getElementById('drawer-count');
const cartDrawer = document.getElementById('cart-drawer');
const drawerScrim = document.getElementById('drawer-scrim');
const cartContent = document.getElementById('cart-content');
const cartFooter = document.getElementById('cart-footer');
const restaurantDialog = document.getElementById('restaurant-dialog');
const restaurantDetail = document.getElementById('restaurant-detail');
const checkoutDialog = document.getElementById('checkout-dialog');
const checkoutTotal = document.getElementById('checkout-total');
const successDialog = document.getElementById('success-dialog');
const checkoutForm = document.getElementById('checkout-form');

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getVisibleRestaurants() {
  const query = state.search.trim().toLowerCase();

  const filtered = restaurantData.filter((restaurant) => {
    const matchesCuisine = state.selectedCuisine === 'All' || restaurant.cuisine === state.selectedCuisine;
    const matchesSearch = !query || [restaurant.name, restaurant.cuisine, restaurant.description, ...restaurant.menu.map(item => item.name)].join(' ').toLowerCase().includes(query);
    return matchesCuisine && matchesSearch;
  });

  const sorted = [...filtered];
  if (state.sort === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (state.sort === 'delivery') {
    sorted.sort((a, b) => a.delivery - b.delivery);
  }

  return sorted;
}

function renderCuisineFilter() {
  if (!cuisineFilter) return;

  const cuisines = ['All', ...new Set(restaurantData.map(item => item.cuisine))];
  cuisineFilter.innerHTML = cuisines.map((cuisine) => `
    <button class="filter-chip" type="button" data-cuisine="${cuisine}" aria-pressed="${cuisine === state.selectedCuisine}">
      <span>${cuisine === 'All' ? '✦' : cuisine.charAt(0)}</span>${cuisine}
    </button>
  `).join('');

  cuisineFilter.querySelectorAll('.filter-chip').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedCuisine = button.dataset.cuisine;
      renderCuisineFilter();
      renderRestaurants();
    });
  });
}

function renderRestaurants() {
  if (!restaurantGrid || !resultsCount || !emptyState) return;

  const visibleRestaurants = getVisibleRestaurants();
  resultsCount.textContent = `(${visibleRestaurants.length})`;

  if (!visibleRestaurants.length) {
    restaurantGrid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  restaurantGrid.innerHTML = visibleRestaurants.map((restaurant) => `
    <article class="restaurant-card" data-restaurant-id="${restaurant.id}" tabindex="0" aria-label="Open ${restaurant.name}">
      <div class="restaurant-image">
        <img src="${restaurant.image}" alt="${restaurant.name}" />
        <span class="card-badge">${restaurant.badge}</span>
        <button class="save-button" type="button" aria-label="Save ${restaurant.name}" aria-pressed="false">♡</button>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-name-row">
          <h3>${restaurant.name}</h3>
          <span class="rating">★ ${restaurant.rating.toFixed(1)}</span>
        </div>
        <p class="restaurant-cuisine">${restaurant.cuisine}</p>
        <div class="restaurant-meta">
          <span>${restaurant.delivery} min</span>
          <span class="meta-dot"></span>
          <span>${restaurant.fee === 0 ? 'Free delivery' : `${formatPrice(restaurant.fee)} delivery`}</span>
          <span class="fee">$$</span>
        </div>
      </div>
    </article>
  `).join('');

  restaurantGrid.querySelectorAll('.restaurant-card').forEach((card) => {
    const restaurantId = card.dataset.restaurantId;
    card.addEventListener('click', (event) => {
      if (event.target.closest('.save-button')) return;
      openRestaurantDialog(restaurantId);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openRestaurantDialog(restaurantId);
      }
    });
  });
}

function openRestaurantDialog(restaurantId) {
  if (!restaurantDialog || !restaurantDetail) return;

  const restaurant = restaurantData.find((item) => item.id === restaurantId);
  if (!restaurant) return;

  restaurantDetail.innerHTML = `
    <div class="detail-hero">
      <img src="${restaurant.image}" alt="${restaurant.name}" />
      <div class="detail-hero-copy">
        <p class="eyebrow"><span></span> ${restaurant.cuisine}</p>
        <h2>${restaurant.name}</h2>
      </div>
    </div>
    <div class="detail-summary">
      <span>★ ${restaurant.rating.toFixed(1)}</span>
      <span>${restaurant.delivery} min</span>
      <span>${restaurant.fee === 0 ? 'Free delivery' : `${formatPrice(restaurant.fee)} delivery`}</span>
      <span>${restaurant.badge}</span>
    </div>
    <div class="menu-heading">
      <h3>Menu</h3>
      <span>${restaurant.menu.length} items</span>
    </div>
    <div class="menu-list">
      ${restaurant.menu.map((item) => `
        <div class="menu-item">
          <div class="menu-item-info">
            <h4><span class="veg-mark ${item.type === 'veg' ? '' : 'nonveg'}"></span>${item.name}</h4>
            <p>${item.description}</p>
            <span class="menu-price">${formatPrice(item.price)}</span>
          </div>
          <button class="add-button" type="button" data-restaurant-id="${restaurant.id}" data-item-id="${item.id}" data-item-name="${item.name}" data-item-price="${item.price}">Add</button>
        </div>
      `).join('')}
    </div>
  `;

  if (typeof restaurantDialog.showModal === 'function') {
    restaurantDialog.showModal();
  }

  restaurantDetail.querySelectorAll('.add-button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = {
        id: button.dataset.itemId,
        name: button.dataset.itemName,
        price: Number(button.dataset.itemPrice),
        restaurantId: button.dataset.restaurantId
      };
      addToCart(item);
      restaurantDialog.close();
      closeCart();
    });
  });
}

function addToCart(item) {
  const existing = state.cart.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
  renderCart();
}

function openCart() {
  if (!cartDrawer || !drawerScrim) return;
  cartDrawer.classList.add('is-open');
  drawerScrim.hidden = false;
  document.body.classList.add('dialog-open');
}

function closeCart() {
  if (!cartDrawer || !drawerScrim) return;
  cartDrawer.classList.remove('is-open');
  drawerScrim.hidden = true;
  document.body.classList.remove('dialog-open');
}

function getCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = state.cart.length ? 4.5 : 0;
  const serviceFee = state.cart.length ? subtotal * 0.08 : 0;
  const total = subtotal + deliveryFee + serviceFee;
  return { subtotal, deliveryFee, serviceFee, total };
}

function updateCartQuantity(itemId, change) {
  const target = state.cart.find((item) => item.id === itemId);
  if (!target) return;

  target.quantity += change;
  if (target.quantity <= 0) {
    state.cart = state.cart.filter((item) => item.id !== itemId);
  }
  renderCart();
}

function renderCart() {
  if (!cartContent || !cartFooter || !cartCount || !drawerCount) return;

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = String(totalItems);
  drawerCount.textContent = `(${totalItems})`;

  if (!state.cart.length) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <span>⊕</span>
        <h3>Your cart is empty</h3>
        <p>Add a few good things from your favorite kitchen.</p>
      </div>
    `;
    cartFooter.innerHTML = `
      <div class="cart-totals">
        <div class="cart-total-row"><span>Subtotal</span><strong>${formatPrice(0)}</strong></div>
        <div class="cart-total-row"><span>Delivery</span><strong>${formatPrice(0)}</strong></div>
        <div class="cart-total-row grand"><span>Total</span><strong>${formatPrice(0)}</strong></div>
      </div>
      <button class="checkout-button" type="button" disabled>Checkout</button>
      <p class="cart-helper">Your bag is waiting.</p>
    `;
    return;
  }

  const totals = getCartTotals();

  cartContent.innerHTML = state.cart.map((item) => `
    <div class="cart-line">
      <div>
        <h3>${item.name}</h3>
        <p>${formatPrice(item.price)} each</p>
      </div>
      <div class="cart-line-price">${formatPrice(item.price * item.quantity)}</div>
      <div class="quantity-control" aria-label="Quantity for ${item.name}">
        <button type="button" data-action="decrease" data-item-id="${item.id}">−</button>
        <output>${item.quantity}</output>
        <button type="button" data-action="increase" data-item-id="${item.id}">+</button>
      </div>
    </div>
  `).join('');

  cartFooter.innerHTML = `
    <div class="cart-totals">
      <div class="cart-total-row"><span>Subtotal</span><strong>${formatPrice(totals.subtotal)}</strong></div>
      <div class="cart-total-row"><span>Delivery</span><strong>${formatPrice(totals.deliveryFee)}</strong></div>
      <div class="cart-total-row"><span>Service</span><strong>${formatPrice(totals.serviceFee)}</strong></div>
      <div class="cart-total-row grand"><span>Total</span><strong>${formatPrice(totals.total)}</strong></div>
    </div>
    <button class="checkout-button" type="button">Checkout <span>${formatPrice(totals.total)}</span></button>
    <p class="cart-helper">Small fees keep the kitchen moving.</p>
  `;

  cartContent.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const action = button.dataset.action;
      updateCartQuantity(itemId, action === 'increase' ? 1 : -1);
    });
  });

  cartFooter.querySelector('.checkout-button').addEventListener('click', () => {
    if (!state.cart.length) return;
    checkoutTotal.textContent = formatPrice(totals.total);
    if (typeof checkoutDialog.showModal === 'function') {
      checkoutDialog.showModal();
    }
  });
}

if (restaurantSearch) {
  restaurantSearch.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderRestaurants();
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderRestaurants();
  });
}

const clearFiltersButton = document.querySelector('.clear-filters');
if (clearFiltersButton) {
  clearFiltersButton.addEventListener('click', () => {
    state.selectedCuisine = 'All';
    state.search = '';
    if (restaurantSearch) restaurantSearch.value = '';
    if (sortSelect) sortSelect.value = 'recommended';
    state.sort = 'recommended';
    renderCuisineFilter();
    renderRestaurants();
  });
}

const cartTrigger = document.querySelector('.cart-trigger');
if (cartTrigger) {
  cartTrigger.addEventListener('click', openCart);
}

if (drawerScrim) {
  drawerScrim.addEventListener('click', closeCart);
}

const closeCartButton = document.querySelector('.close-cart');
if (closeCartButton) {
  closeCartButton.addEventListener('click', closeCart);
}

const checkoutCloseButton = document.querySelector('.checkout-close');
if (checkoutCloseButton) {
  checkoutCloseButton.addEventListener('click', () => checkoutDialog.close());
}

const successDoneButton = document.querySelector('.success-done');
if (successDoneButton) {
  successDoneButton.addEventListener('click', () => {
    successDialog.close();
    closeCart();
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (typeof checkoutDialog.close === 'function') {
      checkoutDialog.close();
    }
    state.cart = [];
    renderCart();
    if (typeof successDialog.showModal === 'function') {
      successDialog.showModal();
    }
  });
}

if (restaurantDialog) {
  restaurantDialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
  });
}

if (checkoutDialog) {
  checkoutDialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
  });
}

if (successDialog) {
  successDialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
  });
}

renderCuisineFilter();
renderRestaurants();
renderCart();
