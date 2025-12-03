import { renderGoods } from './module/render.js';
import formControl from './module/control.js';
import { createImageContainer, createText } from './module/createElements.js';
import {getData} from './module/dataControl.js';
{
  const init = async () => {
    const goods = await getData();
    const table = document.querySelector('tbody');
    const overlay = document.querySelector('.overlay');
    const panelAddGoods = document.querySelector('.panel__add-goods');
    const form = document.querySelector('.modal__form');
    const cmsTotalPrice = document.querySelector('.cms__total-price');
    const modalFile = document.querySelector('.modal__file');
    const modalFieldset = document.querySelector('.modal__fieldset');
    const modalLabelFile = document.querySelector('.modal__label_file');

    const text = createText('modal__text_file');
    modalLabelFile.before(text);
    const [image, imageBlock] = createImageContainer(modalFieldset);

    formControl(goods, overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text);
    renderGoods(table, goods, cmsTotalPrice);
  };
  init();
};


