import { addGoodData, deleteGood } from './dataControl.js';
import {addTotalPrice,  
  addGood,
  newNumberRows,} from './render.js';

const formControl = (goods, overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text) => {
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
    addGoodData(goods, good);
    console.log(good);
    addGood(table, good);
    form.reset();
    discountCountDisabled(form);
    text.style.display = 'none';
    imageBlock.style.display = 'none';     
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


  modalFile.addEventListener('change', () => {
    if (modalFile.files.length > 0) {
      if (modalFile.files[0].size > 1048576) {
        text.style.display = 'block';
        imageBlock.style.display = 'none';
      }
      else {
      image.src = URL.createObjectURL(modalFile.files[0]);
      image.alt = 'Изображение товара';
      imageBlock.style.display = 'block';
      text.style.display = 'none';
      }
    }
  });

  image.addEventListener('click', () => {
    imageBlock.style.display = 'none';    
  });
};

export default formControl;