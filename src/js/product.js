import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData();

loadHeaderFooter();

const productID = getParam("product");

// create a new instance of ProductDetails with productID and dataSource
const product = new ProductDetails(productID, dataSource);
product.init();
