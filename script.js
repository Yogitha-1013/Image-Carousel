const carousel = document.getElementById('carousel');
let currentIndex = 0;
let images = [];
async function fetchImages(count = 10, query = 'moon') {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${'C8po-YOwtzHabrzSwl6BlDAITagpEA_NQPnVdrZakwU'}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("Fetched data:", data); 
    images = data.results.map(img => img.urls.regular);
    renderImages();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


function renderImages() {
  console.log('Rendering', images.length, 'images');
  carousel.innerHTML = images.map(src => `<img src="${src}" alt="Image">`).join('');
  updateCarousel();
}


// Show current image
function updateCarousel() {
  const width = carousel.clientWidth;
  carousel.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Navigation functions
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
}

// Keyboard interaction
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Touch interaction
let startX = 0;
carousel.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, { passive: true });
carousel.addEventListener('touchend', (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50) nextImage();
  else if (diff < -50) prevImage();
}, { passive: true });

// Initial load
window.addEventListener('load', () => fetchImages());
