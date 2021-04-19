import images from './gallery-items.js';

// + Создание и рендер разметки по массиву данных и предоставленному шаблону.
// + Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// + Открытие модального окна по клику на элементе галереи.
// + Подмена значения атрибута src элемента img.lightbox__image.
// + Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// + Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
const refs = {
  imagesContainer: document.querySelector('.js-gallery'),
  modalContainer: document.querySelector('.lightbox'),
  openLightboxImage: document.querySelector('.lightbox__image'),
};

let activeIndex = 0;

const imagesMarkup = createGaleryItemMarkup(images);

// 1. Создать разметку
refs.imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup.join(''));

function createGaleryItemMarkup(images) {
  return images.map(({ preview, original, description }) => {
    // imagesSrc.push(`${original}`);
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
// 2. Повесить слушателя событий на контейнер с будущей разметкой
// 2.1 Если нажали не на картинку - пропускаем
// 2.2 Получение url большого изображения
// 2.3 Открытие модального окна по клику на элементе галереи
// 2.4 Подмена значения атрибута src элемента img.lightbox__image

refs.imagesContainer.addEventListener('click', onImageGalleryClick);

function onImageGalleryClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const galleryImageSrcRef = event.target.dataset.source;

  refs.modalContainer.classList.add('is-open');
  refs.openLightboxImage.src = galleryImageSrcRef;

  // 3. + Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
  // 3.1 + Закрытие модального окна по клику на div.lightbox__overlay.

  refs.modalContainer.addEventListener('click', onCloseModal);

  function onCloseModal(event) {
    if (event.target.nodeName === 'IMG') {
      return;
    }

    refs.modalContainer.classList.remove('is-open');
    refs.openLightboxImage.src = '';
  }

  // 3.2 - Закрытие модального окна по нажатию клавиши ESC.
  document.addEventListener('keydown', onCloseModalEscape);

  function onCloseModalEscape(event) {
    if (event.key === 'Escape') {
      onCloseModal(event);
      console.log(event);
    }
  }
}
