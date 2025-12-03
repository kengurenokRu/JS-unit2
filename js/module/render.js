import { sumGoods } from './dataControl.js';

export const addTotalPrice = (cmsTotalPrice, goods) => {
  cmsTotalPrice.textContent = `$ ${sumGoods(goods)}`;
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

export const renderGoods = (table, goods, cmsTotalPrice) => {
  for (const el of goods) {
    addGood(table, el);
  }
  addTotalPrice(cmsTotalPrice, goods);
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
