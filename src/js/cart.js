import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // If there are no items, we can stop here or show a message
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    cartSubtotal(cartItems);
    return;
  }
  // If there are items, we can render them
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Set the total price of the cart
  cartSubtotal(cartItems);

  // console.log(cartItems);
  addRemoveButtonEventListeners();
}

function addRemoveButtonEventListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

function removeCartItem(event) {
  const itemId = event.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");

  const cartItemRemoved = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", cartItemRemoved);
  

  renderCartContents();
}