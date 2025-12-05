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
    // const text = createText('modal__label_file');
    const img = createImage('modal__label_file-add');
    imageBlock.append(/*text,*/ img);
    modalFieldset.append(imageBlock);

    return [img, imageBlock];
}


export const createPicturesBox = () => {
    /* const imageBlock = createContainer('image');
     imageBlock.cssText = `
    width: 300px; 
   height: 200px;
   overflow: hidden;   
   display: flex;
   justify-content: center;
   align-items: center;
 `;
     const img = createImage('image-show');
     img.cssText = `
   width: 100%; 
   height: auto; 
   display: block;
 `;
     imageBlock.append(img);
     document.body.append(imageBlock);
     return [img, imageBlock];*/

    const imageBlock = createContainer('image-container');
    const img = createImage('modal__label_file-add');
    imageBlock.append(img);
    document.body.append(imageBlock);

    return [img, imageBlock];
}