import {
  textForm,
  getTotalText,
  addGood,
  newNumberRows,
  clearTableGoods,
  renderGoods,
  fillFields,
  clearImage,
  openModalError,
  addTextError,
  renderCountSubPanel
} from './render.js';
import {
  getDataId,
  deleteData,
  getData,
  addData,
  editData,
  getTotalCount,
  getPageCount
} from './dataControl.js';

let page = 1;

export const formControl = (overlay, panelAddGoods, form, table, cmsTotalPrice, modalFile, image, imageBlock, text, imagePopUp, imageBlockPopUp, textError) => {
  overlay.classList.remove('active');

  const generateId = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  };

  const closeModal = () => {
    overlay.classList.remove('active');
    textError.textContent = '';
    clearImage(imageBlock, modalFile, text);
    discountCountDisabled(form);
    form.reset();
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
    else {
      good.discount = good.discount_count;
      delete good.discount_count;
    }
    if (good.image.name !== '')
      good.image = await toBase64(good.image);
    else delete good.image;
    const res = await getDataId(good.id);
    console.log(res.length);
    if (res.length !== 0) {
      const status = await editData(good, openModalError, addTextError);
      if (status === 'error') return;
    }
    else {
      const status = await addData(good, openModalError, addTextError);
      if (status === 'error') return;
    }
    clearTableGoods(table);
    const goods = await getData(page);
    renderGoods(table, goods, cmsTotalPrice, page);
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
      const goods = await getData(page);
      e.target.closest('.good').remove();
      if (goods.length >= table.children.length) {
        clearTableGoods(table);
        renderGoods(table, goods, cmsTotalPrice, page);
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

export const panelSearchControl = (panelSearch, table, cmsTotalPrice) => {
  let timeout;

  panelSearch.addEventListener('keyup', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const goods = await getData(page, panelSearch.search.value);
      clearTableGoods(table);
      renderGoods(table, goods, cmsTotalPrice, page);
    }, 300);
  });
}

export const modalErrorControl = (overlayError) => {
  const closeModal = () => {
    overlayError.classList.remove('active');
  };

  overlayError.addEventListener('click', e => {
    if ((e.target === overlayError) || (e.target.closest('.modal__close'))) {
      closeModal();
    }
  });
}

export const subPanelControl = (subPanel, table, cmsTotalPrice) => {
  subPanel.addEventListener('click', async (e) => {
    if (e.target.classList.contains('sub-panel__left')) {
      if (page === 1) return;
      page--;
    }
    else
      if (e.target.classList.contains('sub-panel__right')) {
        const pageCount = await getPageCount();
        if (page === pageCount) return;
        page++;
      }
    clearTableGoods(table);
    const goods = await getData(page, '');
    console.log(goods);
    renderGoods(table, goods, cmsTotalPrice, page);
    getTotalText(cmsTotalPrice);
  });
}
