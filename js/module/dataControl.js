const sumGoods = (goods) => {
  return goods.reduce((sum, el) => {
    return sum + (el.count * el.price) * (1 - el.discount_count / 100.00);
  }, 0);
}

const addGoodData = (good) => {
  goodsList.push(good);
};

const deleteGood = (id, goods) => {
    const tempGoods = goods;
    goods.forEach((good, index) => {
      if (good.id == id) goods.splice(index, 1)
    });
    return tempGoods;
  };

  export default {
    sumGoods,
    addGoodData,
    deleteGood
  }
