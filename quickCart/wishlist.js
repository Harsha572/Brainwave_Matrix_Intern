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
      alert("Added to cart!");
    });
}

function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const container = document.getElementById('wishlist-list');

  if (wishlist.length === 0) {
    container.className = "empty-wishlist";
    container.innerHTML = `
      <div style="text-align: center; padding: 5vh 2vw;">
        <h1 style="font-size: 2.5rem; font-weight: bold;">My Wishlist</h1>
        <p style="font-size: 1.2rem; color: #555;">Your Wishlist is empty!!</p>
        <p style="color: #888;">ADD A FEW PRODUCTS AND THEN EXPLORE THE COOLEST WAY TO SHOP CLOTHES ONLINE!</p>
        <a href="products.html" class="save-now">Wishlist Your Clothes</a>
      </div>
    `;
    return;
  }

  wishlist.forEach(product => {
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
        <button class="remove" onclick="removeFromWishlist(${product.id})" style="background-color: red;">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(product => product.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderWishlist();
  updateCartCount();
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

  renderWishlist();
  updateCartCount();
});
