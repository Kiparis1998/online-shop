import { GoodsOfCategory } from "./goodsOfCategory.js";

export class GoodInfo extends GoodsOfCategory {
    blockInfo;
    infoOfProduct;
    buttonClose;
    arrOfInfo = [];
    constructor() {
        super();
    }
    renderInfo(block, indexOfBlock, nameOfProduct, data) {
        const infoAboutProduct = Object.values(data);
        infoAboutProduct.forEach(({ appleModels }) => {
            appleModels.forEach(({name, description}) => {
                if (name.toLowerCase() === nameOfProduct.toLowerCase()) {
                    this.blockInfo = document.createElement('div');
                    this.infoOfProduct = document.createElement('p');
                    this.buttonClose = document.createElement('button');
                    this.blockInfo.classList.add('stuff', 'stuff-new-height');
                    this.infoOfProduct.classList.add('text-style');
                    this.buttonClose.classList.add('button-close');
                    this.infoOfProduct.innerText = description;
                    this.buttonClose.innerText = 'Buy';
                    block[indexOfBlock].append(this.blockInfo);
                    this.blockInfo.append(this.infoOfProduct, this.buttonClose);
                    this.arrOfInfo.push(this.blockInfo);
                }
            });
        });
    }
}