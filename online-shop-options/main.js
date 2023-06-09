import { Category } from "./category.js";
import { GoodsOfCategory } from "./goodsOfCategory.js";
import { GoodInfo } from "./goodInfo.js";
import { data } from "./data.js";

const INDEX_OF_LEFT_BLOCK = 0;
const INDEX_OF_MIDDLE_BLOCK = 1;
const INDEX_OF_RIGHT_BLOCK = 2;

const mainBlock = [...document.querySelectorAll('.block_column')];
const visibilityOfMiddleBlock = document.querySelector('.block_column_in-between');
const visibilityOfRightBlock = document.querySelector('.block_column_right');
const notification = document.querySelector('.notification');

const namesOfCategories = Object.keys(data);

const firstCategory = new Category();
const secondCategory = new Category();
const thirdCategory = new Category();
const fourthCategory = new Category();
const fifthCategory = new Category();

const arrOfCategories = [];
arrOfCategories.push(firstCategory, secondCategory, thirdCategory, fourthCategory, fifthCategory);

arrOfCategories.forEach((category, indexOfCategory) => {
    category.renderCategory(mainBlock, INDEX_OF_LEFT_BLOCK, namesOfCategories, indexOfCategory);
})

let arrOfGoods = [];
let arrOfInfo = [];
let button = '';
function showSecondBlock({ target }) {
    arrOfCategories.forEach((category) => {
        // console.log(category)
        if (category.blockOfCategory.getAttribute('listener') === 'true' && (category.blockOfCategory === target || category.category === target)) {
            category.blockOfCategory.setAttribute('listener', 'false');
            visibilityOfMiddleBlock.classList.add('visibility-in-between');
            visibilityOfRightBlock.classList.add('visibility-right');
            mainBlock[INDEX_OF_RIGHT_BLOCK].innerHTML = '';
            mainBlock[INDEX_OF_MIDDLE_BLOCK].innerHTML = '';
            arrOfGoods = [];
            arrOfInfo = [];
        } else if (category.blockOfCategory.getAttribute('listener') === 'false' && (category.blockOfCategory === target || category.category === target)) {
            category.blockOfCategory.setAttribute('listener', 'true');
            visibilityOfMiddleBlock.classList.remove('visibility-in-between');
            mainBlock[INDEX_OF_MIDDLE_BLOCK].innerHTML = '';
            const product = new GoodsOfCategory();
            product.renderGoods(mainBlock, INDEX_OF_MIDDLE_BLOCK, target.innerText, data);
            arrOfGoods.push(...product.arrOfGoods)
        } else if (category.blockOfCategory.getAttribute('listener') === 'true') {
            category.blockOfCategory.setAttribute('listener', 'false');
            visibilityOfMiddleBlock.classList.add('visibility-in-between');
            mainBlock[INDEX_OF_MIDDLE_BLOCK].innerHTML = '';
            visibilityOfRightBlock.classList.add('visibility-right');
            mainBlock[INDEX_OF_RIGHT_BLOCK].innerHTML = '';
            arrOfGoods = [];
            arrOfInfo = [];
        } else if (category.blockOfCategory.getAttribute('listener') === null && (category.blockOfCategory === target || category.category === target)) {
            category.blockOfCategory.setAttribute('listener', 'true');
            visibilityOfMiddleBlock.classList.remove('visibility-in-between');
            const product = new GoodsOfCategory();
            product.renderGoods(mainBlock, INDEX_OF_MIDDLE_BLOCK, target.innerText, data);
            arrOfGoods.push(...product.arrOfGoods)
        }
    });
}
function showThirdBlock({ target }) {
    arrOfGoods.forEach((product) => {
        if (product.getAttribute('listener') === 'true' && product === target) {
            product.setAttribute('listener', 'false');
            visibilityOfRightBlock.classList.add('visibility-right');
            mainBlock[INDEX_OF_RIGHT_BLOCK].innerHTML = '';
            arrOfInfo = [];
            button = '';
        } else if (product.getAttribute('listener') === 'false' && product === target) {
            product.setAttribute('listener', 'true');
            visibilityOfRightBlock.classList.remove('visibility-right');
            mainBlock[INDEX_OF_RIGHT_BLOCK].innerHTML = '';
            const productInfo = new GoodInfo();
            productInfo.renderInfo(mainBlock, INDEX_OF_RIGHT_BLOCK, target.innerText, data);
            arrOfInfo.push(...productInfo.arrOfInfo);
            button = productInfo.buttonClose;
        } else if (product.getAttribute('listener') === 'true') {
            product.setAttribute('listener', 'false');
            visibilityOfRightBlock.classList.add('visibility-right');
            mainBlock[INDEX_OF_RIGHT_BLOCK].innerHTML = '';
            arrOfInfo = [];
            button = '';
        } else if (product.getAttribute('listener') === null && product === target) {
            product.setAttribute('listener', 'true');
            visibilityOfRightBlock.classList.remove('visibility-right');
            const productInfo = new GoodInfo();
            productInfo.renderInfo(mainBlock, INDEX_OF_RIGHT_BLOCK, target.innerText, data);
            arrOfInfo.push(...productInfo.arrOfInfo);
            button = productInfo.buttonClose;
        }
    })
}
function closeBlocks({ target }) {
    if (button === target) {
        visibilityOfMiddleBlock.classList.add('visibility-in-between');
        visibilityOfRightBlock.classList.add('visibility-right');
        mainBlock[INDEX_OF_MIDDLE_BLOCK].innerHTML = '';
        mainBlock[INDEX_OF_RIGHT_BLOCK].innerHTML = '';
        arrOfGoods = [];
        arrOfInfo = [];
        notification.classList.remove('notification-visibility');
        arrOfCategories.forEach((category) => {
            if (category.blockOfCategory.getAttribute('listener') === 'true') {
                category.blockOfCategory.setAttribute('listener', 'false');
            }
        });
        setTimeout(() => {
            notification.classList.add('notification-visibility');
        }, 2000);
    }
}

mainBlock[INDEX_OF_LEFT_BLOCK].addEventListener('click', showSecondBlock);
mainBlock[INDEX_OF_MIDDLE_BLOCK].addEventListener('click', showThirdBlock);
mainBlock[INDEX_OF_RIGHT_BLOCK].addEventListener('click', closeBlocks);
