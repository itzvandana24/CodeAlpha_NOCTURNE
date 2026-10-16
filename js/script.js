document.addEventListener('DOMContentLoaded', () => {
    // Gallery Filter Navigation Code
    const filterButtons = document.querySelectorAll("button[data-filter]");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => {
                // Removes active state from all-btn and add it to classList's item 1
                btn.classList.remove('active');
                button.classList.add('active');
                //Gets the selected category
                const selectedCategory = button.getAttribute('data-filter');

                //Show or hides the gallery items based on category
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add("hidden");
                    }
                });
            });
        });
    });
    //   Selecting lightbox images and elements
    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");
    const lightboxCounter = document.getElementById("lightboxCounter");
    let currentIndex = 0;

    //   Opening lightbox when an image is clicked
    galleryImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            showImage(index);
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            // Adding next and previous button feature
            // Perevious button listner
            lightboxPrev.addEventListener("click", () => {
                if (currentIndex > 0) {
                    showImage(currentIndex - 1);
                }
            });

            //Next button listner
            lightboxNext.addEventListener("click", () => {
                if (currentIndex < galleryImages.length - 1) {
                    showImage(currentIndex + 1);
                }
            });
        });
    });
    // Closing lightbox when the close button is clicked
    lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
    });
    // Closing the lightbox when backdrop is clicked
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });
    // Closing the lightbox when "Escape" key is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key == 'Escape' && lightbox.classList.contains("active")) {
            lightbox.classList.remove("active");
        }
    });

    // Creating a function to display an image
    function showImage(index) {
        currentIndex = index;
        const image = galleryImages[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        // Updating the lightboxCounter value 
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }

});

// Gallery Pagination Code
document.addEventListener('DOMContentLoaded', () => {
    const pageButtons = document.querySelectorAll(".page-numbers .page-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentPage = 1;
    const totalPages = pageButtons.length;

    function updateActivePage(newPage) {
        if (newPage < 1 || newPage > totalPages) return;
        currentPage = newPage;
        // Updating active class on number buttons
        pageButtons.forEach(btn => {
            const pageNum = parseInt(btn.getAttribute("data-page"));
            if (pageNum === currentPage) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Changing gallery items per page: 10images/page
        const galleryItems = document.querySelectorAll('.gallery-item');
        const imagesPerPage = 10;
        let startingIndx = (currentPage - 1) * imagesPerPage;
        let endingIndx = startingIndx + imagesPerPage;

        galleryItems.forEach((item, index) => {
            if (index < startingIndx || index >= endingIndx) {
                item.classList.add("hidden");
            } else {
                item.classList.remove("hidden");
            }
        });
    }

    // Click Events for page numbers buttons
    pageButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const pageNum = parseInt(btn.getAttribute("data-page"));
            //calling above funciton
            updateActivePage(pageNum);
        });
    });

    // Click Events for Previous button
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            updateActivePage(currentPage - 1);
        }
    });

    // Click Events for Next button
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            updateActivePage(currentPage + 1);
        }
    });

});

// Adding Controls for Home Featured Section slider pannel
const featuredTrack = document.getElementById("featured-track");
const featuredSlides = document.querySelectorAll(".featured-slide");
const previousButton = document.getElementById("featured-prev");
const nextButton = document.getElementById("featured-next");
const currentSlideText = document.getElementById("current-slide");
const progressBar = document.getElementById("slider-progress-bar");

if (
    featuredTrack &&
    featuredSlides.length > 0 &&
    previousButton &&
    nextButton &&
    currentSlideText &&
    progressBar
) {
    let currentIndex = 0;

    function updateFeaturedSlider() {
        const slide = featuredSlides[currentIndex];
        // to check whether the gap value in css is valid or not if it returns truthy value(Fine) 
        // else instead of colapsing sliders img it acceps column-gap as 0 (OR condition)
        const gap =
            parseFloat(getComputedStyle(featuredTrack).columnGap) || 0;
        //getBoundingClientRect() it gets the element defined with box boundaries(by default all elements follows box model)
        const slideWidth = slide.getBoundingClientRect().width;
        const offset = currentIndex * (slideWidth + gap);
        //update & resize the slider img horizontally when screen changes (Updates CSS transform property)
        featuredTrack.style.transform = `translateX(-${offset}px)`;
        //Adds leading zero with slider img index: e.g, indx=0 | display txt will be: 01
        currentSlideText.textContent = String(currentIndex + 1).padStart(2, "0");
        //Upadates the progress bar styling & txt content
        const progress =
            ((currentIndex + 1) / featuredSlides.length) * 100;

        progressBar.style.width = `${progress}%`;
    }

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % featuredSlides.length;
        updateFeaturedSlider();
    });

    previousButton.addEventListener("click", () => {
        currentIndex =
            (currentIndex - 1 + featuredSlides.length) % featuredSlides.length;

        updateFeaturedSlider();
    });

    window.addEventListener("resize", updateFeaturedSlider);

    updateFeaturedSlider();
}

// NOCUTRNE: REUSABLE ANIMATION CODE FOR ALL PAGES
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// ABOUT PAGE: REUSABLE ANIMATION CODE FOR SCROLLING ELEMENTS
document.addEventListener("DOMContentLoaded", () => {
  const aboutElements = document.querySelectorAll(
    ".about-animate, .about-heading-animate, " +
    ".about-text-animate, .about-image-animate"
  );

  const showAllAboutElements = () => {
    aboutElements.forEach((element) => {
      element.classList.add("about-visible");
    });
  };

  // Respect reduced-motion preferences
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAllAboutElements();
    return;
  }

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    showAllAboutElements();
    return;
  }

  const aboutObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("about-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  aboutElements.forEach((element) => {
    aboutObserver.observe(element);
  });
});