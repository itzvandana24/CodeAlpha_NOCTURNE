document.addEventListener('DOMContentLoaded', () =>{
    // Gallery Filter Navigation Code
   const filterButtons = document.querySelectorAll("button[data-filter]");
   const galleryItems = document.querySelectorAll(".gallery-item"); 

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach( (btn) => {
            // Removes active state from all-btn and add it to classList's item 1
            btn.classList.remove('active');
            button.classList.add('active');
            //Gets the selected category
            const selectedCategory = button.getAttribute('data-filter');

            //Show or hides the gallery items based on category
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if(selectedCategory === 'all' || itemCategory === selectedCategory){
                    item.classList.remove('hidden');
                } else{
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
  galleryImages.forEach((image,index) => {
    image.addEventListener("click", () => {
        showImage(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        // Adding next and previous button feature
        // Perevious button listner
        lightboxPrev.addEventListener("click", () => {
            if(currentIndex > 0){
                showImage(currentIndex - 1);
            }
        });

        //Next button listner
        lightboxNext.addEventListener("click", () => {
            if(currentIndex < galleryImages.length-1){
                showImage(currentIndex+1);
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
        if(event.target === lightbox){
            lightbox.classList.remove("active");
        }
    });
    // Closing the lightbox when "Escape" key is pressed
    document.addEventListener("keydown", (event) => {
        if(event.key == 'Escape' && lightbox.classList.contains("active")){
            lightbox.classList.remove("active");
        }
    });

     // Creating a function to display an image
    function showImage(index){
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
    const totalPages  = pageButtons.length;

    function updateActivePage(newPage){
        if(newPage < 1 || newPage > totalPages) return;
        currentPage = newPage;
        // Updating active class on number buttons
        pageButtons.forEach(btn => {
            const pageNum = parseInt(btn.getAttribute("data-page"));
            if(pageNum === currentPage){
                btn.classList.add("active");
            } else{
                btn.classList.remove("active");
            }
        });

        // Changing gallery items per page: 10images/page
        const galleryItems = document.querySelectorAll('.gallery-item');
        const imagesPerPage = 10;
        let startingIndx = (currentPage -1) * imagesPerPage;
        let endingIndx = startingIndx + imagesPerPage;

        galleryItems.forEach((item, index) => {
            if( index < startingIndx || index >= endingIndx){
                item.classList.add("hidden");
            } else{
                item.classList.remove("hidden");
            }
        });
    }

    // Click Events for page numbers buttons
    pageButtons.forEach(btn =>{
        btn.addEventListener("click", () => {
            const pageNum = parseInt(btn.getAttribute("data-page"));
            //calling above funciton
            updateActivePage(pageNum);
        });
    });

    // Click Events for Previous button
    prevBtn.addEventListener("click", () => {
        if(currentPage > 1){
            updateActivePage(currentPage-1);
        }
    });

    // Click Events for Next button
    nextBtn.addEventListener("click", () => {
        if(currentPage < totalPages){
            updateActivePage(currentPage+1);
        }
    });

});