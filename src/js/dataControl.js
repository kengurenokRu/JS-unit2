export const getPageCount = async () => {
  const data = await fetch('http://localhost:3000/api/goods')
    .then((response) => {
      if (response.ok) { return response.json(); }
      else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .then((data) => data.pages)
    .catch((error) => {
      console.error(error.message);
      return 0;
    });
  return data;
}

export const getTotalCount = async () => {
  const data = await fetch('http://localhost:3000/api/goods')
    .then((response) => {
      if (response.ok) { return response.json(); }
      else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .then((data) => data.totalCount)
    .catch((error) => {
      console.error(error.message);
      return 0;
    });
  return data;
}


export const getData = async (page = 1, searchText = '',) => {
  const data = await fetch(`http://localhost:3000/api/goods?page=${page}&search=${searchText}`)
    .then((response) => {
      if (response.ok) { return response.json(); }
      else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .then((data) => data.goods)
    .catch((error) => {
      console.error(error.message);
      return [];
    });
  return data;
}

export const getDataId = async (id) => {
  const data = await fetch(`http://localhost:3000/api/goods/${id}`)
    .then((response) => {
      if (response.ok) { return response.json(); }
      else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
  return data;
}

export const editData = async (good) => {
  await fetch(`http://localhost:3000/api/goods/${good.id}`, {
      method: 'PATCH',
      body: JSON.stringify(good),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      if (response.status === 422 || response.status === 404 || response.status >= 500) {
        if (response.statusText === '')
        {callback();}
      else {
        callbackText(`${response.status}: ${response.statusText}`);
      }
      return 'error';
      }
      return 'good';
    })
    .catch((error) => {
      console.error(error.message);
    });
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

export const addData = async (good, callback, callbackText) => {
  const response = await fetch('http://localhost:3000/api/goods', {
      method: 'POST',
      body: JSON.stringify(good),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.status === 422 || response.status === 404 || response.status >= 500) {
      if (response.statusText === '')
      {callback();}
    else {
      callbackText(`${response.status}: ${response.statusText}`);
    }
      return 'error';
    }
    return 'good';
/*
    .then((response) => {
      console.log(response.status)
      if (response.status === 422 || response.status === 404 || response.status >= 500) {
        if (response.statusText === '')
        {callback();}
      else {
        callbackText(`${response.status}: ${response.statusText}`);
      }
        return 'error';
        //Promise.reject(response);
      }
      else
      return 'good';
    })*/
   /* .catch((error) => {
      console.error(error.message);
      return 'error';
    });*/
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
    .catch((error) => {
      console.error(error.message);
      return 0;
    });
  return data;
}

export const getCategory = async () => {
  const data = await fetch('http://localhost:3000/api/categories')
    .then((response) => {
      if (response.ok) {
        return response.json(); }
      else {
        Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error(error.message);
      return [];
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



