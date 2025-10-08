'use strict';

const itemOne = document.getElementsByClassName('props__item_one');
const itemTwo = document.getElementsByClassName('props__item_two');
const itemThree = document.getElementsByClassName('props__item_three');
const itemFour = document.getElementsByClassName('props__item_four');
const itemFive = document.getElementsByClassName('props__item_five');
const itemSix = document.getElementsByClassName('props__item_six');

const items = document.getElementsByClassName('items')[0].children;
const itemTitle = document.getElementsByClassName('item__title');

items[2].after(items[0]);
items[3].after(items[2]);


//itemTitle[0].textContent = ""

