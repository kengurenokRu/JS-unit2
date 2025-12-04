import { addTotalPrice, addGood, newNumberRows, clearTableGoods, renderGoods } from './render.js';
import { addGoodData, deleteData, getData, addData } from './dataControl.js';

export const formControl = (goods, overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text) => {
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const good = Object.fromEntries(formData);
    good.id = document.querySelector('.vendor-code__id').textContent;
    good.title = good.name;
    delete good.name;
    if (!('discount_count' in good))
      good.discount = 0;
    else { good.discount = good.discount_count; delete good.discount_count; }
    await addData(good);
    good.image = await toBase64(good.image);
    addGood(table, good);
    form.reset();
    discountCountDisabled(form);
    text.style.display = 'none';
    imageBlock.style.display = 'none';
    modalFile.value = '';
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

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', err => {
      reject(err);
    });
    reader.readAsDataURL(file);
  });

  table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('table__btn_del')) {
      const id = e.target.closest('.good').children[1].dataset.id;
      await deleteData(id);
      goods = await getData();
      e.target.closest('.good').remove();
      if (goods.length >= table.children.length) {
        clearTableGoods(table);
        renderGoods(table, goods, cmsTotalPrice);
      }
      else {
        addTotalPrice(cmsTotalPrice, goods);
        newNumberRows();
      }
    }
  });


  modalFile.addEventListener('change', () => {
    if (modalFile.files.length > 0) {
      if (modalFile.files[0].size > 1048576) {
        text.style.display = 'block';
        imageBlock.style.display = 'none';
        modalFile.value = '';
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
    modalFile.value = '';
  });
};

export const panelSearchControl = (goods, panelSearch, table, cmsTotalPrice) => {
  let timeout;

  panelSearch.addEventListener('keyup', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      goods = await getData(panelSearch.search.value);
      console.log(goods);
      clearTableGoods(table);
      renderGoods(table, goods, cmsTotalPrice);
    }, 300);


  });
}
