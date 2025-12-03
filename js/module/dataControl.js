export const getData = async () => {
  const data = await fetch('http://localhost:3000/api/goods')
    .then((response) => {
      if (response.ok) { return response.json(); }
      else {
        Promise.reject(response);
      }
    })
    .then((data) => data.goods)
    .catch((error) => {
      console.error(error.message);
      return [];
    });
  return data;
}

export const deleteData = async (id) => {
  await fetch(`http://localhost:3000/api/goods/${id}`, {
    method: 'DELETE'
  })
    .then((response) => {
      if (!response.ok) {
        Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
}


/*
export const fetchRequest = async (url, { method = 'GET', callback, body, headers }) => {
try {
  const options = { method, };
  if (body) options.body = JSON.stringify(body);
  if (headers) options.headers = headers;
  const response = await fetch(url, options);
  if (response.ok) {
    const data = await response.json();
    if (callback) callback(null, data);
    return;
  }
  throw new Error(response.status);
}
catch (err) {
  callback(new Error(err));
}
};*/


export const sumGoods = (goods) => {
  return goods.reduce((sum, el) => {
    return sum + (el.count * el.price) * (1 - el.discount / 100.00);
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

