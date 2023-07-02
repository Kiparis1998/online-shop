import { data } from "./data.js";

const mainBlock = document.querySelector('.block');
const leftBlock = document.querySelector('.block_column__left');
const middleBlock = document.querySelector('.block_column_in-between');
const rightBlock = document.querySelector('.block_column_right');
const visibilityOfMiddleBlock = document.querySelector('.visibility-in-between');
const visibilityOfRightBlock = document.querySelector('.visibility-right');
const form = document.querySelector('.block-form');
const name = document.querySelector('#name');
const city = document.querySelector('#city');
const cityDnipro = document.querySelector('#post-dnipro');
const cityKiev = document.querySelector('#post-kiev');
const cityOdessa = document.querySelector('#post-odessa');
const cityLviv = document.querySelector('#post-lviv');
const cash = document.querySelector('#cash');
const creditCard = document.querySelector('#credit-card');
const comment = document.querySelector('#comment');
const amount = document.querySelector('#amount');
const message = document.querySelector('.message');
const dataInfo = document.querySelector('.data-info');
const nameData = document.querySelector('.data-info_name');
const cityData = document.querySelector('.data-info_city');
const deliveryData = document.querySelector('.data-info_delivery');
const paymentData = document.querySelector('.data-info_payment');
const modelData = document.querySelector('.data-info_model');
const amountData = document.querySelector('.data-info_amount');
const commentData = document.querySelector('.data-info_comment');
const returnButton = document.querySelector('.data-info_return-button');
const resetButton = document.querySelector('.block-form_reset-button');

const arrOfPostCities = [cityDnipro, cityKiev, cityOdessa, cityLviv];

let modelOfItem = '';

function renderCategories() {
    const CATEGORY = Object.keys(data);
    CATEGORY.forEach((category) => {
        const blockOfCategories = document.createElement('div');
        blockOfCategories.classList.add('stuff');
        const textOfCategory = document.createElement('p');
        textOfCategory.classList.add('text-style');
        textOfCategory.innerText = category;
        blockOfCategories.append(textOfCategory);
        leftBlock.append(blockOfCategories);
    });
}

renderCategories()

function renderSelectedCategory(nameOfCategory) {
    const SELECTED_CATEGORY = Object.entries(data);
    visibilityOfMiddleBlock.classList.remove('visibility-in-between');
    SELECTED_CATEGORY.forEach(([key, {appleModels }]) => {
        appleModels.forEach(({name}) => {
            if (nameOfCategory.innerText.toLowerCase() === key.toLowerCase()) {
                const blockOfSelectedCategory = document.createElement('div');
                blockOfSelectedCategory.classList.add('stuff');
                const textOfSelectedCategory = document.createElement('p');
                textOfSelectedCategory.classList.add('text-style');
                textOfSelectedCategory.innerText = name;
                blockOfSelectedCategory.append(textOfSelectedCategory);
                middleBlock.append(blockOfSelectedCategory);
            }
        });
    });
}

function renderItemData(nameOfItem) {
    const ITEM_DATA = Object.values(data);
    visibilityOfRightBlock.classList.remove('visibility-right');
    ITEM_DATA.forEach(({ appleModels }) => {
        appleModels.forEach(({name, description}) => {
            if (nameOfItem.innerText.toLowerCase() === name.toLowerCase()) {
                const blockOfItemDescription = document.createElement('div');
                const textOfItemDescription = document.createElement('p');
                const buttonClose = document.createElement('button');
                blockOfItemDescription.classList.add('stuff');
                textOfItemDescription.classList.add('text-style');
                buttonClose.classList.add('button-close');
                buttonClose.innerText = 'Buy';
                textOfItemDescription.innerText = description;
                blockOfItemDescription.append(textOfItemDescription, buttonClose);
                rightBlock.append(blockOfItemDescription);
            }
        });
    });
}

function disablePostOptions() {
    arrOfPostCities.forEach((postCity) => {
        postCity.setAttribute('disabled', 'true')
        postCity.value = 'empty';
    });
}

function getValidatedData() {
    const validatedData = {};
    if (name.value.trim() !== '') {
        validatedData['name'] = name.value;
    } if (city.value !== 'empty') {
        validatedData['city'] = city.value;
    }
    arrOfPostCities.forEach((postCity) => {
        if (!postCity.hasAttribute('disabled') && postCity.value !== 'empty') validatedData['postAddress'] = postCity.value;
    });
    if (cash.checked === true || creditCard.checked === true) {
        cash.checked === true ? validatedData['payment'] = cash.value : validatedData['payment'] = creditCard.value;
    } if (amount.value > 0) {
        validatedData['amount'] = amount.value;
    } if (comment.value.trim() !== '') {
        validatedData['comment'] = comment.value;
    } if (Object.keys(validatedData).length === 6) {
        return validatedData;
    }
    throw new Error('Invalid input');
}

function attachAllClickListeners() {
    leftBlock.addEventListener('click', ({target}) => {
        if (target.classList.contains('stuff') || target.classList.contains('text-style')) {
            if (!visibilityOfMiddleBlock.classList.contains('visibility-in-between')) visibilityOfMiddleBlock.classList.add('visibility-in-between');
            if (!visibilityOfRightBlock.classList.contains('visibility-right')) visibilityOfRightBlock.classList.add('visibility-right');
            middleBlock.innerText = '';
            rightBlock.innerText = '';
            renderSelectedCategory(target);
        }
    });
    middleBlock.addEventListener('click', ({target}) => {
        if (target.classList.contains('stuff') || target.classList.contains('text-style')) {
            if (!visibilityOfRightBlock.classList.contains('visibility-right')) visibilityOfRightBlock.classList.add('visibility-right');
            rightBlock.innerText = '';
            renderItemData(target);
        }
    });
    rightBlock.addEventListener('click', ({target}) => {
        if (target.tagName === 'BUTTON') {
            if (!visibilityOfMiddleBlock.classList.contains('visibility-in-between')) visibilityOfMiddleBlock.classList.add('visibility-in-between');
            if (!visibilityOfRightBlock.classList.contains('visibility-right')) visibilityOfRightBlock.classList.add('visibility-right');
            middleBlock.innerText = '';
            rightBlock.innerText = '';
            form.classList.toggle('hidden');
            mainBlock.style.display = 'none';
            Object.values(data).forEach(({ appleModels }) => {
                appleModels.forEach(({name, description}) => {
                    if (target.previousSibling.innerText === description) modelOfItem = {'model' : name};
                });
            });
        }
    });

    city.addEventListener('blur', ({target}) => {
        disablePostOptions();
        if (target.value === 'dnipro') cityDnipro.removeAttribute('disabled')
        if (target.value === 'kiev') cityKiev.removeAttribute('disabled');
        if (target.value === 'odessa') cityOdessa.removeAttribute('disabled');
        if (target.value === 'lviv') cityLviv.removeAttribute('disabled');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
            const result = getValidatedData();
            if (nameData.classList.contains('data-info_name')) nameData.innerText = `Name - ${result.name}`;
            if (modelData.classList.contains('data-info_model')) modelData.innerText = `Model - ${modelOfItem.model}`;
            if (cityData.classList.contains('data-info_city')) cityData.innerText = `City - ${result.city.charAt(0).toUpperCase() + result.city.slice(1).toLowerCase()}`;
            if (deliveryData.classList.contains('data-info_delivery')) deliveryData.innerText = `Delivering to ${result.postAddress}`;
            if (paymentData.classList.contains('data-info_payment')) paymentData.innerText = `Method of a payment - ${result.payment}`;
            if (amountData.classList.contains('data-info_amount')) amountData.innerText = `Amount - ${result.amount}`;
            if (commentData.classList.contains('data-info_comment')) commentData.innerText = `Optional - ${result.comment}`;
            dataInfo.style.display = 'flex';
            form.classList.toggle('hidden');
            form.reset();
            disablePostOptions();
        } catch (error) {
            message.innerText = error.message;
            form.classList.add('warning-border');
            setTimeout(() => {
                message.innerText = '';
                form.classList.remove('warning-border');
            }, 2000);
        }
    });

    resetButton.addEventListener('click', () => {
        disablePostOptions();
    });

    returnButton.addEventListener('click', () => {
        mainBlock.style.display = 'flex';
        dataInfo.style.display = 'none';
    });
}

attachAllClickListeners();