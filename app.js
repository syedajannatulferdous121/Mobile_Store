// Placeholder product data
const products = [
  {
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 19.99,
  },
  {
    name: "Product 2",
    description: "Ut aliquet ex eu gravida viverra.",
    price: 29.99,
  },
  // Add more products here
];

// Function to render the products on the page
function renderProducts() {
  const productContainer = document.querySelector(".product-list");

  products.forEach((product) => {
    // Create HTML elements to display the product information
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productName = document.createElement("h3");
    productName.innerText = product.name;

    const productDescription = document.createElement("p");
    productDescription.innerText = product.description;

    const productPrice = document.createElement("span");
    productPrice.innerText = `$${product.price.toFixed(2)}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.innerText = "Add to Cart";

    productCard.appendChild(productName);
    productCard.appendChild(productDescription);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartButton);

    productContainer.appendChild(productCard);
  });
}

// Event listener for adding items to the cart
function addToCart(event) {
  const productName = event.target.parentNode.querySelector("h3").innerText;
  const productPrice = parseFloat(
    event.target.parentNode.querySelector("span").innerText.replace("$", "")
  );

  // Update the cart count
  const cartCount = document.querySelector(".cart-count");
  const currentCount = parseInt(cartCount.innerText);
  cartCount.innerText = currentCount + 1;

  // Store the product details in localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push({ name: productName, price: productPrice });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Initialize the product rendering and event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
});
