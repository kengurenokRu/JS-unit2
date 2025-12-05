import { renderGoods } from './module/render.js';
import {formControl, panelSearchControl} from './module/control.js';
import { createImageContainer, createText, createPicturesBox } from './module/createElements.js';
import {getData} from './module/dataControl.js';
{
  const init = async () => {
    let goods = await getData();
    const table = document.querySelector('tbody');
    const overlay = document.querySelector('.overlay');
    const panelAddGoods = document.querySelector('.panel__add-goods');
    const form = document.querySelector('.modal__form');
    const cmsTotalPrice = document.querySelector('.cms__total-price');
    const modalFile = document.querySelector('.modal__file');
    const modalFieldset = document.querySelector('.modal__fieldset');
    const modalLabelFile = document.querySelector('.modal__label_file');
    const panelSearch = document.querySelector('.panel__search');
    const text = createText('modal__text_file');
    modalLabelFile.before(text);
    const [image, imageBlock] = createImageContainer(modalFieldset);
    const [imagePopUp, imageBlockPopUp] = createPicturesBox();
    formControl(goods, overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text, imagePopUp, imageBlockPopUp);
    panelSearchControl(goods, panelSearch, table, cmsTotalPrice);
    renderGoods(table, goods, cmsTotalPrice);
  };
  init();
};


