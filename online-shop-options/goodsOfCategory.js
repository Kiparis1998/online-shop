import { Category } from "./category.js";

export class GoodsOfCategory extends Category {
    blockOfProduct;
    productOfCategory;
    arrOfGoods = [];

    constructor() {
        super();
    }
    renderGoods(block, indexOfBlock, nameOfCategory, data) {
        const kindsOfGoods = Object.entries(data);
        kindsOfGoods.forEach(([key, { appleModels }]) => {
            if (key === nameOfCategory.toLowerCase()) {
                appleModels.forEach((product) => {
                    this.blockOfProduct = document.createElement('div');
                    this.productOfCategory = document.createElement('p');
                    this.blockOfProduct.classList.add('stuff');
                    this.productOfCategory.classList.add('text-style');
                    this.productOfCategory.innerText = product.name;
                    block[indexOfBlock].append(this.blockOfProduct);
                    this.blockOfProduct.append(this.productOfCategory)
                    this.arrOfGoods.push(this.blockOfProduct);
                });
            }
        });
    }
}