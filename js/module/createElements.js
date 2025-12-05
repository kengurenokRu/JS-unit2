const createContainer = (classList) => {
  const div = document.createElement('div');
  div.classList = classList;
  return div;
}

const createImage = (classList) => {
  const image = document.createElement('img');
  image.classList = classList;
  return image;
}

export const createText = (classList) => {
  const p = document.createElement('p');
  p.textContent = 'Изображение не должно превышать размер 1 Мб';
  p.classList = classList;
  return p;
}

export const createImageContainer = (modalFieldset) => {
  const imageBlock = createContainer('image-container');
  const img = createImage('modal__label_file-add');
  imageBlock.append(img);
  modalFieldset.append(imageBlock);
  return [img, imageBlock];
}


export const createPicturesBox = () => {
  const imageBlock = createContainer('image-popUp-container');
  /*imageBlock.style.cssText = `
  display: none;
  width: 500px;
  height: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -250px;
  box-shadow: 0px 0px 50px #6E6893;
  text-align: center;
  background-color: #F4F2FF;`;*/
  const img = createImage('image-show');
  img.style.cssText = `
   width: auto;
   height: 100%;
   object-fit: contain;`;
  imageBlock.append(img);
  document.body.append(imageBlock);
  return [img, imageBlock];
}
