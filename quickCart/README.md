# 🛍️ My E-Commerce Product Listing App

A responsive web application built using HTML, CSS, and JavaScript that allows users to browse products, add items to a wishlist or cart, and manage their selections. It features a dark/light theme toggle, category/rating filters, and full mobile responsiveness.

## 📦 Features

- 🔍 Browse products from [Fake Store API](https://fakestoreapi.com/)
- 🎯 Filter by category, rating, and search
- ❤️ Wishlist functionality with local storage
- 🛒 Cart management (add/remove)
- 🌓 Dark mode / Light mode toggle with persistence
- 📱 Fully responsive layout for desktop, tablet, and mobile
- 💾 Uses `localStorage` to retain data across page reloads
- ✅ Alerts for wishlist duplication and cart confirmations

## 🗂️ Project Structure

📁 project-root/
├── bag.html             # Shopping cart page
├── bag.js               # JS logic for cart management
├── bag.css              # Styling for bag.html
├── home.html            # Landing/homepage
├── home.css             # Styling for home.html
├── products.html        # Product listing with filters
├── products.js          # Handles fetching, displaying, and filtering products
├── products.css         # Styling for product page
├── responsive.css       # Media queries for responsiveness
├── wishlist.html        # Wishlist display page
├── wishlist.js          # Wishlist add/remove logic
├── logo.png             # Logo for the app
└── README.md            # This file

## 🚀 Getting Started

### 1. Download the Repository
You can just download the ZIP and extract it.

### 2. Run the Application

You don’t need any backend server.

Just open the `home.html` file (or any other `.html` file) in your browser:

* **Right-click** → **Open with** → **Browser**
* Or drag the file into your browser window

## 💡 How It Works

* **products.html** fetches products from [Fake Store API](https://fakestoreapi.com/)
* DOM is dynamically populated with product cards
* Filters can be applied by:
  * Category (Men, Women, Electronics, Jewelry)
  * Rating (1 to 4 stars)
  * Search text (matches title or description)
* Wishlist and Cart:
  * Stored using `localStorage`
  * Persist across reloads
  * Can be added or removed with buttons

## 📱 Responsive Design

Handled using:

* Flexbox layouts
* `products.css` and `responsive.css`
* Mobile-friendly filters (slide toggle)
* Media queries for `480px`, `600px`, `768px`, and `1024px` breakpoints

## 🌗 Dark Mode Support

* Toggle using the `🌓` button in the navbar
* Theme preference is saved in localStorage

## 🧰 Built With

* HTML5
* CSS3
* JavaScript (Vanilla)
* [Fake Store API](https://fakestoreapi.com/)

## 👤 Author

**Harshavardhan Reddy**
[LinkedIn](https://www.linkedin.com/in/harshavardhan-reddy-391b51218) [GitHub](https://github.com/Harsha572)

## 📜 License

This project is licensed under the MIT License.
