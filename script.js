import images from './gallery-items.js';

const refs = {
  imagesContainer: document.querySelector('.js-gallery'),
  modalContainer: document.querySelector('.lightbox'),
  openLightboxImage: document.querySelector('.lightbox__image'),
};

const imagesMarkup = createGaleryItemMarkup(images);

refs.imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup.join(''));
refs.imagesContainer.addEventListener('click', onImageGalleryClick);

function createGaleryItemMarkup(images) {
  return images.map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `;
  });
}

function onImageGalleryClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const galleryImageSrcRef = event.target.dataset.source;

  refs.modalContainer.classList.add('is-open');
  refs.modalContainer.addEventListener('click', onCloseModalByClick);

  document.addEventListener('keydown', onCloseModalByEscape);

  changeImageSrc(galleryImageSrcRef);
  onCloseModalByClick(event);
  onCloseModalByEscape(event);
}

function onCloseModalByClick(event) {
  if (event.target.nodeName === 'IMG') {
    return;
  }

  refs.modalContainer.classList.remove('is-open');

  clearImageSrc();
}

function onCloseModalByEscape(event) {
  if (event.key === 'Escape') {
    onCloseModalByClick(event);
  }
}

function changeImageSrc(source) {
  refs.openLightboxImage.src = source;
}

function clearImageSrc() {
  refs.openLightboxImage.src = '';
}
