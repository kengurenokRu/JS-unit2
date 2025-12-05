import { getTotal, getDataId, getCategory } from './dataControl.js';
import { createList } from './createElements.js';

export const getTotalText = async (cmsTotalPrice) => {
  const total = await getTotal();
  cmsTotalPrice.textContent = `${total}$`;
}

export const createRow = (obj) => {
  const trLast = document.querySelectorAll('tr');
  let numb
  if (trLast[trLast.length - 1].firstElementChild.textContent === '№') numb = 1;
  else numb = +trLast[trLast.length - 1].firstElementChild.textContent + 1;
  const tr = `
<tr class = "good">
              <td class="table__cell table__cell_number">${numb}</td>
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

export const addGood = (table, good) => {
  table.insertAdjacentHTML('beforeend', createRow(good));
};

export const renderGoods = async (table, goods, cmsTotalPrice) => {
  for (const el of goods) {
    addGood(table, el);
  }

  getTotalText(cmsTotalPrice);
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
