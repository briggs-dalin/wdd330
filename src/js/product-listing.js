import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

const modal = document.querySelector("#quick-view-modal");
const closeBtn = modal.querySelector(".close-btn");
const image = modal.querySelector("#modal-image");
const name = modal.querySelector("#modal-name");
const price = modal.querySelector("#modal-price");
const description = modal.querySelector("#modal-description");

//fallback description
function getFallbackDescription(product) {
  return (
    product.DescriptionHtmlSimple ||
    product.Description ||
    product.Features ||
    `No description available for "${product.Name}".`
  );
}

// Show modal on "Quick View" button click
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("quick-view-btn")) {
    const productId = e.target.dataset.id;
    try {
      const product = await dataSource.findProductById(productId);

      image.src = product.Images.PrimaryLarge || product.Images.PrimaryMedium;
      image.alt = product.Name;
      name.textContent = product.Name;
      price.textContent = `$${product.FinalPrice}`;
      description.innerHTML = getFallbackDescription(product);

      modal.classList.remove("hidden");
    } catch (err) {
      //console.error("Error loading product for quick view:", err);
      alert("Sorry, product details could not be loaded.");
    }
  }

  // Hide modal when background or close button is clicked
  if (e.target === modal || e.target === closeBtn) {
    modal.classList.add("hidden");
  }
});
