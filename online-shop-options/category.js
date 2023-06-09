export class Category {
    blockOfCategory = document.createElement('div');
    category = document.createElement('p');
    renderCategory(block, indexOfBlock, arrOfProducts, indexOfCategory) {
        this.blockOfCategory.classList.add('stuff');
        this.category.classList.add('text-style');
        this.category.innerText = arrOfProducts[indexOfCategory];
        block[indexOfBlock].append(this.blockOfCategory);
        this.blockOfCategory.append(this.category);
    }
}