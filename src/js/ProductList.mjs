import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/product_detail.html?id=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);

    const formattedCategory = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    document.querySelector(".title").textContent = `Top Products: ${formattedCategory}`;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
