export const sumGoods = (goods) => {
  return goods.reduce((sum, el) => {
    return sum + (el.count * el.price) * (1 - el.discount_count / 100.00);
  }, 0);
}

export const addGoodData = (goods, good) => {
  goods.push(good);
};

export const deleteGood = (id, goods) => {
  const tempGoods = goods;
  goods.forEach((good, index) => {
    if (good.id == id) goods.splice(index, 1)
  });
  return tempGoods;
};

