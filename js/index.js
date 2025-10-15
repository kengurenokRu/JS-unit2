'use strict';
{
  const goodsList = [
    {
      "id": 1,
      "title": "Смартфон Xiaomi 11T 8/128GB",
      "price": 27000,
      "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
      "category": "mobile-phone",
      "discont": false,
      "count": 3,
      "units": "шт",
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
    },
    {
      "id": 2,
      "title": "Радиоуправляемый автомобиль Cheetan",
      "price": 4000,
      "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
      "category": "toys",
      "discont": 5,
      "count": 1,
      "units": "шт",
      "images": {
        "small": "img/cheetancar-m.jpg",
        "big": "img/cheetancar-b.jpg"
      }
    },
    {
      "id": 3,
      "title": "ТВ приставка MECOOL KI",
      "price": 12400,
      "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
      "category": "tv-box",
      "discont": 15,
      "count": 4,
      "units": "шт",
      "images": {
        "small": "img/tvboxmecool-m.jpg",
        "big": "img/tvboxmecool-b.jpg"
      }
    },
    {
      "id": 4,
      "title": "Витая пара PROConnect 01-0043-3-25",
      "price": 22,
      "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
      "category": "cables",
      "discont": false,
      "count": 420,
      "units": "v",
      "images": {
        "small": "img/lan_proconnect43-3-25.jpg",
        "big": "img/lan_proconnect43-3-25-b.jpg"
      }
    }
  ]
  /*
  const title = document.getElementsByClassName('modal__title');
  const form = document.getElementsByClassName('modal__form');
  const checkbox = document.getElementsByClassName('modal__checkbox');
  const labelCheckbox = document.querySelector('.modal__checkbox-wrapper').previousElementSibling;
  */

  const createRow = (obj) => {
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
                <td class="table__cell">${obj.price * obj.count}</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic"></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>
              </tr>
`;
    return tr;
  }

  const renderGoods = (goods) => {
    const table = document.querySelector('tbody');
    console.log(table);

    for (const el of goods) {
      table.insertAdjacentHTML('beforeend', createRow(el));
    }
  }

  const deleteGood = (id, goods) => {
    const tempGoods = goods;
    goods.forEach((good, index) => {
      if (good.id == id) goods.splice(index, 1)
    });
  return tempGoods;
  }

  const newNumberRows = () => {
    const tableCellNumber = document.querySelectorAll('.table__cell_number');
    tableCellNumber.forEach((el, i) => {
      el.textContent = i+1;
    })
  }

  const init = (goods) => {
    const overlay = document.querySelector('.overlay');
    const panelAddGoods = document.querySelector('.panel__add-goods');
    const tableBody = document.querySelector('.table__body');

    tableBody.addEventListener('click', e => {
      if (e.target.closest('.table__cell_btn-wrapper')) {
        e.target.closest('.good').remove();
        const id = e.target.closest('.good').children[1].dataset.id;
        goods = deleteGood(id, goods);
        console.log(goods);
        newNumberRows();
      }
    });


    overlay.classList.remove('active');

    panelAddGoods.addEventListener('click', () => {
      overlay.classList.add('active');
    });

    overlay.addEventListener('click', e => {
      if ((e.target === overlay) || (e.target.closest('.modal__close')))
        overlay.classList.remove('active');
    });

    renderGoods(goods);
  }

  window.render = init(goodsList);
}
