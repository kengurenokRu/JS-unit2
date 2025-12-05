import { textForm, getTotalText, addGood, newNumberRows, clearTableGoods, renderGoods, fillFields, clearImage } from './render.js';
import { getDataId, deleteData, getData, addData, editData } from './dataControl.js';

export const formControl = (goods, overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text, imagePopUp, imageBlockPopUp) => {
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
    const codeId = document.querySelector('.vendor-code__id');
    codeId.textContent = generateId();
    textForm('Добавить товар', 'Добавить товар');
    openModal();
  });

  overlay.addEventListener('click', e => {
    if ((e.target === overlay) || (e.target.closest('.modal__close'))) {
      closeModal();
      const form = document.querySelector('.modal__form');
      form.reset();
      clearImage(imageBlock, modalFile, text);
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
    if (good.image.name !== '')
      good.image = await toBase64(good.image);
    else delete good.image;
    if (await getDataId(good.id)) {
      await editData(good);
      clearTableGoods(table);
      goods = await getData();
      renderGoods(table, goods, cmsTotalPrice);
    }
    else {
      await addData(good);
      addGood(table, good);
    }
    form.reset();
    discountCountDisabled(form);
    clearImage(imageBlock, modalFile, text);
    closeModal();
    getTotalText(cmsTotalPrice);
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
    const id = e.target.closest('.good').children[1].dataset.id;
    if (e.target.classList.contains('table__btn_del')) {
      await deleteData(id);
      goods = await getData();
      e.target.closest('.good').remove();
      if (goods.length >= table.children.length) {
        clearTableGoods(table);
        renderGoods(table, goods, cmsTotalPrice);
      }
      else {
        getTotalText(cmsTotalPrice);
        newNumberRows();
      }
    } else if (e.target.classList.contains('table__btn_pic')) {
      const good = await getDataId(id);
      imagePopUp.src = `http://localhost:3000/${good.image}`;
      imageBlockPopUp.style.display = 'block';
    }
    else if (e.target.classList.contains('table__btn_edit')) {
      textForm('Редактировать товар', 'Сохранить товар');
      await fillFields(id, form, image, imageBlock, modalFile, text);
      imageBlock.style.display = 'block';
      openModal();

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
    clearImage(imageBlock, modalFile, text);
  });
};

export const imagePopUpControl = (imageBlockPopUp) => {
  imageBlockPopUp.addEventListener('click', () => {
    imageBlockPopUp.style.display = 'none';
  });
}

export const panelSearchControl = (goods, panelSearch, table, cmsTotalPrice) => {
  let timeout;

  panelSearch.addEventListener('keyup', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      goods = await getData(panelSearch.search.value);
      clearTableGoods(table);
      renderGoods(table, goods, cmsTotalPrice);
    }, 300);
  });
}
