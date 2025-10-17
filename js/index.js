'use strict';
{
  const goodsList = [
    {
      "id": 1,
      "name": "Смартфон Xiaomi 11T 8/128GB",
      "price": 27000,
      "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
      "category": "mobile-phone",
      "discount_count": false,
      "count": 3,
      "units": "шт",
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
    },
    {
      "id": 2,
      "name": "Радиоуправляемый автомобиль Cheetan",
      "price": 4000,
      "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
      "category": "toys",
      "discount_count": 5,
      "count": 1,
      "units": "шт",
      "images": {
        "small": "img/cheetancar-m.jpg",
        "big": "img/cheetancar-b.jpg"
      }
    },
    {
      "id": 3,
      "name": "ТВ приставка MECOOL KI",
      "price": 12400,
      "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
      "category": "tv-box",
      "discount_count": 15,
      "count": 4,
      "units": "шт",
      "images": {
        "small": "img/tvboxmecool-m.jpg",
        "big": "img/tvboxmecool-b.jpg"
      }
    },
    {
      "id": 4,
      "name": "Витая пара PROConnect 01-0043-3-25",
      "price": 22,
      "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
      "category": "cables",
      "discount_count": false,
      "count": 420,
      "units": "v",
      "images": {
        "small": "img/lan_proconnect43-3-25.jpg",
        "big": "img/lan_proconnect43-3-25-b.jpg"
      }
    }
  ]

  const sumGoods = (goods) => {
    return goods.reduce((sum, el) => {
    return sum + (el.count * el.price) * (1 - el.discount_count / 100.00);
  }, 0);
}

  const addTotalPrice = (cmsTotalPrice, goods) => {
    cmsTotalPrice.textContent = `$ ${sumGoods(goods)}`;
  }
  /*
  const title = document.getElementsByClassName('modal__title');
  const labelCheckbox = document.querySelector('.modal__checkbox-wrapper').previousElementSibling;
  */

  const addGoodData = (good) => {
    goodsList.push(good);
  };

  const createRow = (obj) => {
    const trLast = document.querySelectorAll('tr');
    let numb
    if (trLast[trLast.length - 1].firstElementChild.textContent === '№') numb = 1;
    else numb = +trLast[trLast.length - 1].firstElementChild.textContent + 1;
    const tr = `
<tr class = "good">
                <td class="table__cell table__cell_number">${numb}</td>
                <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
                  <span class="table__cell-id">id: ${obj.id}</span>${obj.name}</td>
                <td class="table__cell table__cell_left">${obj.category}</td>
                <td class="table__cell">${obj.units}</td>
                <td class="table__cell">${obj.count}</td>
                <td class="table__cell">${obj.price}</td>
                <td class="table__cell">${obj.price * obj.count * (1 - obj.discount_count / 100.00)}</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic"></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>
              </tr>
`;
    return tr;
  };

  const addGood = (table, good) => {
    table.insertAdjacentHTML('beforeend', createRow(good));
  };

  const renderGoods = (table, goods, cmsTotalPrice) => {
    for (const el of goods) {
      addGood(table, el);
    }
    addTotalPrice(cmsTotalPrice, goods);
  };

  const deleteGood = (id, goods) => {
    const tempGoods = goods;
    goods.forEach((good, index) => {
      if (good.id == id) goods.splice(index, 1)
    });
    return tempGoods;
  };

  const newNumberRows = () => {
    const tableCellNumber = document.querySelectorAll('.table__cell_number');

    tableCellNumber.forEach((el, i) => {
      el.textContent = i + 1;
    })
  };

  const formControl = (goods, overlay, panelAddGoods, form, table, cmsTotalPrice) => {
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
      if ((e.target === overlay) || (e.target.closest('.modal__close')))
        closeModal();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const good = Object.fromEntries(formData);
      good.id = document.querySelector('.vendor-code__id').textContent;
      addGoodData(good);
      console.log(good);
      addGood(table, good);
      form.reset();
      closeModal();
      addTotalPrice(cmsTotalPrice, goods);
    });

    form.addEventListener('change', e => {
      if (e.target.type === 'checkbox') {
        const inputDiscount = document.querySelector('.modal__input_discount');
        if (e.target.checked) {
          inputDiscount.removeAttribute('disabled');
        }
        else {
          inputDiscount.value = '';
          inputDiscount.setAttribute('disabled', true);
        }
      }
      else if (e.target.type === 'number') {
        const count = document.querySelector('input[name = "count"]').value;
        const price = document.querySelector('input[name = "price"]').value;
        const discont = document.querySelector('input[name = "discount_count"]').value;
        const total = document.querySelector('output[name = "total"]');
        total.innerHTML = `${count * price * (1 - discont / 100.00)}$`;
      };
    });
  };

  const dataControl = (table) => {
    table.addEventListener('click', e => {
      if (e.target.closest('.table__cell_btn-wrapper')) {
        e.target.closest('.good').remove();
        const id = e.target.closest('.good').children[1].dataset.id;
        goods = deleteGood(id, goods);
        console.log(goods);
        newNumberRows();
      }
    });
  };


  const init = (goods) => {
    const table = document.querySelector('tbody');
    const overlay = document.querySelector('.overlay');
    const panelAddGoods = document.querySelector('.panel__add-goods');
    const form = document.querySelector('.modal__form');
    const cmsTotalPrice = document.querySelector('.cms__total-price');


    formControl(goods, overlay, panelAddGoods, form, table, cmsTotalPrice);
    dataControl(table);
    renderGoods(table, goods, cmsTotalPrice);
  };

  window.render = init(goodsList);
}
