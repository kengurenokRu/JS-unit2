import { getTotal, getDataId, getCategory,getTotalCount,
  getPageCount } from './dataControl.js';
import { createList } from './createElements.js';

export const getTotalText = async (cmsTotalPrice) => {
  const total = await getTotal();
  cmsTotalPrice.textContent = `${total}$`;
}

export const createRow = (obj, numberRow) => {
  const tr = `
<tr class = "good">
              <td class="table__cell table__cell_number">${numberRow}</td>
              <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
                <span class="table__cell-id">id: ${obj.id}</span>${obj.title}</td>
              <td class="table__cell table__cell_left">${obj.category}</td>
              <td class="table__cell">${obj.units}</td>
              <td class="table__cell">${obj.count}</td>
              <td class="table__cell">${obj.price}</td>
              <td class="table__cell">${obj.price * obj.count * (1 - obj.discount / 100.00)}</td>
              <td class="table__cell table__cell_btn-wrapper">
                <button class="table__btn table__btn_pic" data-pic="${obj.url}"></button>
                <button class="table__btn table__btn_edit"></button>
                <button class="table__btn table__btn_del"></button>
              </td>
            </tr>
`;
  return tr;
};

export const addGood = (table, good, numberRow) => {
  table.insertAdjacentHTML('beforeend', createRow(good, numberRow));
};

export const renderGoods = async (table, goods, cmsTotalPrice, page = 1) => {
  let numberRow = page*10-10;
  for (const el of goods) {
    numberRow++;
    addGood(table, el, numberRow);
  }
  getTotalText(cmsTotalPrice);
  await renderCountSubPanel(page, goods);
};

export const clearTableGoods = (table) => {
  table.innerHTML = '';
};

export const newNumberRows = () => {
  const tableCellNumber = document.querySelectorAll('.table__cell_number');
  tableCellNumber.forEach((el, i) => {
    el.textContent = i + 1;
  })
};

export const clearImage = (imageBlock, modalFile, text) => {
  imageBlock.style.display = 'none';
    modalFile.value = '';
    text.style.display = 'none';
}

export const textForm = (caption, button) => {
const modalTitle = document.querySelector('.modal__title');
modalTitle.textContent = caption;
const modalSubmit = document.querySelector('.modal__submit');
modalSubmit.textContent = button;
}

export const fillFields = async (id, form, image, imageBlock, modalFile, text) => {
  const codeId = document.querySelector('.vendor-code__id');
  codeId.textContent = id;
  const good = await getDataId(id);
  console.log(good);
  form.elements.name.value = good.title;
  form.elements.category.value = good.category;
  form.elements.description.value = good.description;
  form.elements.units.value = good.units;
  if (good.discount != 0) {
    form.elements.discount.checked = true;
    form.elements.discount_count.value = good.discount;
  }
  form.elements.count.value = good.count;
  form.elements.price.value = good.price;
  image.src = `http://localhost:3000/${good.image}`;
  image.alt = 'Изображение товара';
  imageBlock.style.display = 'block';
  form.elements.total.innerHTML = `${form.elements.count.value * form.elements.price.value *
    (1 - form.elements.discount_count.value / 100.00)}$`;
    clearImage(imageBlock, modalFile, text);
}

export const fillCategoryList = async (categoryList) => {
  const category = await getCategory();
  createList(categoryList, category);
};

export const openModalError = () => {
  const overlayError = document.querySelector('.overlay__error');
  overlayError.classList.add('active');
};

export const addTextError = (text) => {
  const textError = document.querySelector('text-error');
  textError.textContent = text;
}

export const renderCountSubPanel = async (page = 1, goods) => {
  const goodsCount = await getTotalCount();
    const pageCount = await getPageCount();
  const subPanelPages = document.querySelector('.sub-panel__pages');
    subPanelPages.textContent = `${page*10-9}-${page*10 - 10 + goods.length} из ${goodsCount}`;
}
