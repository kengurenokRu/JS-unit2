export const getData = async (searchText = '') => {
  const data = await fetch(`http://localhost:3000/api/goods?page=1&search=${searchText}`)
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

export const addData = async (good) => {
  console.log(good);
  await fetch('http://localhost:3000/api/goods', {
      method: 'POST',
      body: JSON.stringify(good),
      headers: { 'Content-Type': 'application/json' },
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

export const getTotal = async () => {
  const data = await fetch('http://localhost:3000/api/total')
    .then((response) => {
      if (response.ok) { 
        return response.json(); }
      else {
        Promise.reject(response);
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error.message);
      return 0;
    });
  return data;
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



