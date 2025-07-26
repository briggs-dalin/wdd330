import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

const modal = document.getElementById("quick-view-modal");

const closeBtn = modal.querySelector(".close-btn");
const image = modal.querySelector("#modal-image");
const name = modal.querySelector("#modal-name");
const price = modal.querySelector("#modal-price");
const description = modal.querySelector("#modal-description");

// Event listener for Quick View buttons and modal close
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("quick-view-btn")) {
    const productId = e.target.dataset.id;
    try {
      const product = await dataSource.findProductById(productId);

      image.src = product.Images.PrimaryMedium;
      image.alt = product.Name;
      name.textContent = product.Name;
      price.textContent = `$${product.FinalPrice}`;
      description.textContent =
        product.Description || "No description available.";

      modal.classList.remove("hidden");
    } catch (error) {
      //console.error("Failed to load product details:", error);
      alert("Sorry, product details could not be loaded.");
    }
  }

  // Close modal when clicking close button or outside modal content
  if (e.target === modal || e.target === closeBtn) {
    modal.classList.add("hidden");
  }
});
