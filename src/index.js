import { renderGoods, fillCategoryList} from './js/render.js';
import {formControl, panelSearchControl, imagePopUpControl, modalErrorControl, subPanelControl} from './js/control.js';
import { createImageContainer, createText, createPicturesBox, createErrorBlock, cteateTextForm } from './js/createElements.js';
import {getData} from './js/dataControl.js';

import './index.css';

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
    const panelSearch = document.querySelector('.panel__search');
    const categoryList = document.querySelector('#category-list');
    const subPanel = document.querySelector('.sub-panel');


    const text = createText('modal__text_file', 'Изображение не должно превышать размер 1 Мб');
    modalLabelFile.before(text);
    const [image, imageBlock] = createImageContainer(modalFieldset);
    const [imagePopUp, imageBlockPopUp] = createPicturesBox();
    const textError = cteateTextForm(form);
    formControl(overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text, imagePopUp, imageBlockPopUp, textError);
    imagePopUpControl(imageBlockPopUp)
    panelSearchControl(panelSearch, table, cmsTotalPrice);

    console.log(goods);
    renderGoods(table, goods, cmsTotalPrice);

    const overlayError = createErrorBlock();
    fillCategoryList(categoryList);
    modalErrorControl(overlayError);
    subPanelControl(subPanel, table, cmsTotalPrice)
  };
  init();
};


