let products = [];
let filteredProducts = [];
let selectedCategory = null;
let selectedRating = null;
let searchQuery = '';

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    });
}

function addToWishlist(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const alreadyExists = wishlist.find(item => item.id === product.id);

      if (!alreadyExists) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert("Added to wishlist!");
      } else {
        alert("Already in wishlist!");
      }
    });
}

function displayProducts(productsToDisplay) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  if (productsToDisplay.length === 0) {
    container.innerHTML = `<p style="font-size: 1.2rem; color: gray;">No products found.</p>`;
    return;
  }

  productsToDisplay.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <div class="top">
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
      </div>
      <div class="middile">
        <p><em>${product.category}</em></p>
        <div class="product-description">${product.description}</div>
      </div>
      <div class="bottom">
        <p><strong>₹${Math.ceil(product.price)}</strong></p>
        <p>⭐ ${product.rating.rate} (${product.rating.count})</p>
      </div>
      <div style="display: flex; justify-content: space-between; gap: 0.5rem;">
        <button class="add" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="save" onclick="addToWishlist(${product.id})">Wishlist</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function applyFilters() {
  filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesRating = selectedRating ? p.rating.rate >= selectedRating : true;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesRating && matchesSearch;
  });

  displayProducts(filteredProducts);
}

function initFilters() {
  const categoryItems = document.querySelectorAll('#category-filters li');
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      categoryItems.forEach(li => li.classList.remove('selected'));
      item.classList.add('selected');
      selectedCategory = item.dataset.category;
      applyFilters();
    });
  });

  const ratingItems = document.querySelectorAll('.star-filter');
  ratingItems.forEach(item => {
    item.addEventListener('click', () => {
      ratingItems.forEach(div => div.classList.remove('selected'));
      item.classList.add('selected');
      selectedRating = parseInt(item.dataset.rating);
      applyFilters();
    });
  });

  document.getElementById('search').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    applyFilters();
  });

  document.querySelector('.clear-filters').addEventListener('click', () => {
    selectedCategory = null;
    selectedRating = null;
    searchQuery = '';
    document.getElementById('search').value = '';
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    applyFilters();
  });
}

function renderProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      products = data;
      displayProducts(products);
      initFilters();
    })
    .catch(err => {
      document.getElementById('product-list').innerHTML = '<p>Error loading products.</p>';
    });
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  renderProducts();
  updateCartCount();
});
