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

export const createText = (classList, text) => {
  const p = document.createElement('p');
  p.textContent = text;
  p.classList = classList;
  return p;
}

export const createOption = (value, textContent) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = textContent;
  return option;
}

const createButton = (classList) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = classList;
  return button;
}

export const createImageContainer = (modalFieldset) => {
  const imageBlock = createContainer('image-container');
  const img = createImage('modal__label_file-add');
  imageBlock.append(img);
  modalFieldset.append(imageBlock);
  return [img, imageBlock];
}

const createSvg = (width, height, fill, innerHtml, viewBox = '') => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('height', height);
  svg.setAttribute('fill', fill);
  if (viewBox != '')
    svg.setAttribute('viewBox', viewBox);
  svg.innerHTML = innerHtml;
  return svg;
}

export const createPicturesBox = () => {
  const imageBlock = createContainer('image-popUp-container');
  const img = createImage('image-show');
  img.style.cssText = `
   width: auto;
   height: 100%;
   object-fit: contain;`;
  imageBlock.append(img);
  document.body.append(imageBlock);
  return [img, imageBlock];
}

export const createErrorBlock = () => {
  const overlay = createContainer('overlay overlayError');
  const overlayModal = createContainer('overlay__modal modal modal__error');
  overlayModal.style.width = '350px';
  overlayModal.style.height = '350px';
  overlayModal.style.display = 'flex';
  overlayModal.style.flexDirection = 'column';
  overlayModal.style.justifyContent = 'center';
  overlayModal.style.alignItems = 'center';
  overlayModal.style.letterSpacing = '10%';
  overlayModal.style.font = 'Inter';
  overlayModal.style.padding = '10px';
  overlay.append(overlayModal);
  const buttonClose = createButton('modal__close modal__error-close');
  const svgClose = createSvg(24, 24, 'none', '<path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />');
  buttonClose.append(svgClose);
  overlayModal.append(buttonClose);
  const svgX = createSvg(93, 93, 'none', '<path d="M1.5 1.5L91.5 91.5" stroke="#D80101" stroke-width="3" stroke-linecap="round"/> <path d="M1.5 91.5L91.5 1.5" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>', '0 0 93 93');
  svgX.style.marginBottom = '33px';
  overlayModal.append(svgX);
  const text = createText('', 'Что-то пошло не так');
  text.style.fontSize = '18px';
  text.style.fontWeight = '700';
  text.style.textTransform = 'uppercase';
  overlayModal.append(text);
  document.body.append(overlay);
}

export const createList = (categoryList, category) =>{
  for (const el of category) {
    const op = createOption (el, el);
    categoryList.append(op);
  }
};
