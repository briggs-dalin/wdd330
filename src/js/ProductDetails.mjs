import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details from API using product ID
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details to page
    this.renderProductDetails();

    // Attach event listener for Add to Cart button
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.NameWithoutBrand} added to cart!`); // optional user feedback
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Capitalize category for display
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);

  document.querySelector("#p-brand").textContent = product.Brand.Name || "Unknown Brand";

  document.querySelector("#p-name").textContent = product.NameWithoutBrand || product.Name;

  // Use PrimaryLarge image for detail page
  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images?.PrimaryLarge || "/images/placeholder.png";
  productImage.alt = product.NameWithoutBrand || "Product Image";

  // Format price as USD (or keep your EUR formatting)
  const usdPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(product.FinalPrice));

  document.querySelector("#p-price").textContent = usdPrice;

  // Handle colors: show first color or fallback
  if (product.Colors && product.Colors.length > 0) {
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  } else {
    document.querySelector("#p-color").textContent = "N/A";
  }

  // Render description as HTML safely
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple || "<p>No description available.</p>";

  // Store product ID in Add to Cart button dataset for future use
  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
