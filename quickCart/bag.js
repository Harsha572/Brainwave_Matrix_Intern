const cartContainer = document.getElementById('cart-container');

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.className = "empty-cart";
    cartContainer.innerHTML = `
      <div>
        <img src="empty-cart.png" alt="Empty Cart" />
        <h2>Oops! Your cart is empty.</h2>
        <p>But that's nothing a little shopping can't fix 😉</p>
        <a href="products.html" class="shop-now-btn">
          <span>🛍️ Start Shopping</span>
        </a>
      </div>
    `;
    return;
  }

  const grouped = {};
  cartItems.forEach(item => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, quantity: 1 };
    } else {
      grouped[item.id].quantity++;
    }
  });

  let total = 0;

  for (let id in grouped) {
    const item = grouped[id];
    const itemTotal = Math.ceil(item.price) * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>Price: ₹${Math.ceil(item.price)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p><strong>Total: ₹${itemTotal}</strong></p>
      <div class="button-wrapper">
        <button onclick="removeItem(${item.id})">Remove One</button>
      </div>
    `;
    cartContainer.appendChild(div);
  }

  const footer = document.createElement('div');
  footer.className = "cart-footer";
  footer.innerHTML = `
    <h2>Grand Total: ₹${total}</h2>
    <button onclick="clearCart()">Clear Cart</button>
  `;
  cartContainer.appendChild(footer);
}

function removeItem(id) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cartItems.findIndex(item => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
  }
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
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

  renderCart();
});
