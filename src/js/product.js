import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

loadHeaderFooter();

const productID = getParam("product");
//console.log(dataSource.findProductById(productID));

// function addProductToCart(product) {
//   const productList = getLocalStorage("so-cart") || []
//   productList.push(product)
//   setLocalStorage("so-cart", productList);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

const product = new ProductDetails(productID, dataSource);
product.init();

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
