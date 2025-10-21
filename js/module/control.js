import * as dataControl from 'dataControl.js';
import * as render from 'render.js';

const { addTotalPrice, addGood, newNumberRows } = render;
const { addGoodData, deleteGood } = dataControl;

export const formControl = (goods, overlay, panelAddGoods, form, table, cmsTotalPrice) => {
  overlay.classList.remove('active');

  const generateId = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  };

  const closeModal = () => {
    overlay.classList.remove('active');
  };

  const openModal = () => {
    overlay.classList.add('active');
  };

  panelAddGoods.addEventListener('click', () => {
    openModal();
    const codeId = document.querySelector('.vendor-code__id');
    codeId.textContent = generateId();
  });

  overlay.addEventListener('click', e => {
    if ((e.target === overlay) || (e.target.closest('.modal__close'))) {
      closeModal();
      const form = document.querySelector('.modal__form');
      form.reset();
      discountCountDisabled(form);
    }
  });

  const discountCountDisabled = (form) => {
    form.elements.discount_count.setAttribute('disabled', true);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const good = Object.fromEntries(formData);
    good.id = document.querySelector('.vendor-code__id').textContent;
    if (!('discount_count' in good))
      good.discount_count = 0;
    addGoodData(good);
    console.log(good);
    addGood(table, good);
    form.reset();
    discountCountDisabled(form);
    closeModal();
    addTotalPrice(cmsTotalPrice, goods);
  });

  form.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        form.elements.discount_count.removeAttribute('disabled');
      }
      else {
        form.elements.discount_count.value = '';
        discountCountDisabled(form);
      }
    }
    else if (e.target.type === 'number') {
      form.elements.total.innerHTML = `${form.elements.count.value * form.elements.price.value *
        (1 - form.elements.discount_count.value / 100.00)}$`;
    };
  });

  table.addEventListener('click', e => {
    if (e.target.closest('.table__cell_btn-wrapper')) {
      e.target.closest('.good').remove();
      const id = e.target.closest('.good').children[1].dataset.id;
      goods = deleteGood(id, goods);
      console.log(goods);
      newNumberRows();
      addTotalPrice(cmsTotalPrice, goods);
    }
  });
};
