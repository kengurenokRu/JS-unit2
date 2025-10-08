'use strict';




const items = document.getElementsByClassName('items')[0].children;

items[2].after(items[0]);
items[3].after(items[2]);

const itemTitle = document.getElementsByClassName('item__title');

itemTitle[0].textContent = "Область видимости и замыкание";
itemTitle[1].textContent = "This и прототипы объектов";
itemTitle[3].textContent = "Асинхронная обработка и оптимизация";
itemTitle[4].textContent = "ES6 и не только";

const ads = document.getElementsByClassName('ads')[0];
ads.remove();

const propsItemTwo = document.getElementsByClassName('props__item_two');
const propsItemFour = document.getElementsByClassName('props__item_four');

propsItemFour[4].before(propsItemFour[0]);
propsItemTwo[7].after(propsItemTwo[8]);
propsItemTwo[8].after(propsItemTwo[9]);


const propsList = document.getElementsByClassName('props__list');

propsList[2].before(propsList[4]);
itemTitle[3].after(propsList[3]);
