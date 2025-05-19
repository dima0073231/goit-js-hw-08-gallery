script>
  document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.js-gallery');
    const lightbox = document.querySelector('.js-lightbox');
    const lightboxImage = document.querySelector('.lightbox__image');
    const closeBtn = document.querySelector('[data-action="close-lightbox"]');
    const prevBtn = document.querySelector('[data-action="prev-lightbox"]');
    const nextBtn = document.querySelector('[data-action="next-lightbox"]');
    const overlay = document.querySelector('.lightbox__overlay');
    
    const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
    let currentIndex = 0;


    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = index;
        openLightbox(index);
      });
    });


    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.removeEventListener('keydown', handleKeyPress);
    }

    function openLightbox(index) {
      const imageSrc = galleryItems[index].querySelector('img').dataset.source;
      const imageAlt = galleryItems[index].querySelector('img').alt;
      
      lightboxImage.src = imageSrc;
      lightboxImage.alt = imageAlt;
      lightbox.classList.add('is-open');
      
      document.addEventListener('keydown', handleKeyPress);
    }


    function handleKeyPress(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }


    function showPrevImage() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentIndex);
    }

  
    function showNextImage() {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      openLightbox(currentIndex);
    }

    
    overlay.addEventListener('click', closeLightbox);
    
    closeBtn.addEventListener('click', closeLightbox);
  
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
  });