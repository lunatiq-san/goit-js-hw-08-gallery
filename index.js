import images from './gallery-items.js';

// + Создание и рендер разметки по массиву данных и предоставленному шаблону.
// + Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// + Открытие модального окна по клику на элементе галереи.
// + Подмена значения атрибута src элемента img.lightbox__image.
// - Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// - Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
const imagesContainer = document.querySelector('.js-gallery');
const imagesMarkup = createGaleryItemMarkup(images);

// 1. Создать разметку
imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);

// 2. Повесить слушателя событий на контейнер с будущей разметкой
imagesContainer.addEventListener('click', onImageGalleryClick);

function createGaleryItemMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="#"
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
    })
    .join('');
}

// 2.1 Если нажали не на картинку - пропускаем
// 2.2 Получение url большого изображения
// 2.3 Открытие модального окна по клику на элементе галереи
// 2.4 Подмена значения атрибута src элемента img.lightbox__image

function onImageGalleryClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const galleryImageSrcRef = event.target.dataset.source;
  const modalContainerRef = document.querySelector('.lightbox');

  modalContainerRef.classList.add('is-open');

  const openLightboxImageRef = document.querySelector('.lightbox__image');

  if (modalContainerRef.classList.contains('is-open')) {
    openLightboxImageRef.src = galleryImageSrcRef;
  }
}

// 3. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
const isModalOpen = document.querySelector('.lightbox .is-open');

if (isModalOpen) {
  console.log('111');
}

const btnModalClose = document.querySelector('[data-action="close-lightbox"]');
