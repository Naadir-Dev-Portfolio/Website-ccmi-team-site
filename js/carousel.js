/* carousel.js */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration Array: Add your images and their corresponding links here
    const carouselData = [
        {
            imageSrc: 'images/showcase_image1.PNG',
            link: 'https://example.com',
            label: 'Capital Delivery' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image2.PNG',
            link: 'https://example.com',
            label: 'Complaints' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image3.PNG',
            link: 'https://example.com',
            label: 'Enquiries' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image4.PNG',
            link: 'https://example.com',
            label: 'GSOP' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image5.PNG',
            link: 'https://example.com',
            label: 'CO Hotspot for FCO' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image6.PNG',
            link: 'https://example.com',
            label: 'Call Handling Statistics' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image7.PNG',
            link: 'https://example.com',
            label: 'Call Handling Statistics' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image8.PNG',
            link: 'https://example.com',
            label: 'Company Cars' // Add label for the first image
        },
        {
            imageSrc: 'images/showcase_image9.PNG',
            link: 'https://example.com',
            label: 'Innovations and BI' // Add label for the first image
        }
        // Add more slides as needed
    ];

    // Function to create carousel HTML
    function createCarousel() {
        // Create main container
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('pc-carousel-container');

        // Create carousel wrapper
        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('pc-carousel-wrapper');

        // Create carousel track
        const carouselTrack = document.createElement('div');
        carouselTrack.classList.add('pc-carousel');

        // Create slides
        carouselData.forEach((slide, index) => {
            const carouselSlide = document.createElement('div');
            carouselSlide.classList.add('pc-carousel-slide');
            if (index === 0) {
                carouselSlide.classList.add('active');
            }

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('pc-carousel-image-container');

            // Create link wrapping the main image
            const link = document.createElement('a');
            link.href = slide.link;
            link.target = '_blank'; // Opens link in a new tab
            link.rel = 'noopener noreferrer'; // Security best practices

            const mainImage = document.createElement('img');
            mainImage.src = slide.imageSrc;
            mainImage.alt = `Slide ${index + 1}`;
            mainImage.classList.add('pc-carousel-main-image');

            link.appendChild(mainImage);

            // Create reflection image
            const reflectionImage = document.createElement('img');
            reflectionImage.src = slide.imageSrc;
            reflectionImage.alt = `Reflection of Slide ${index + 1}`;
            reflectionImage.classList.add('pc-carousel-reflection');

            // Create label for the slide
            const label = document.createElement('div');
            label.classList.add('carousel-label'); // Add a class for styling
            label.textContent = slide.label; // Set the label text

            // Append images and label to image container
            imageContainer.appendChild(link);
            imageContainer.appendChild(reflectionImage);
            imageContainer.appendChild(label); // Append the label

            // Append image container to slide
            carouselSlide.appendChild(imageContainer);

            // Append slide to carousel track
            carouselTrack.appendChild(carouselSlide);
        });

        // Append carousel track to wrapper
        carouselWrapper.appendChild(carouselTrack);

        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.classList.add('pc-carousel-button', 'pc-carousel-prev');
        prevButton.setAttribute('aria-label', 'Previous Slide');
        prevButton.innerHTML = '&#10094;'; // Left arrow

        const nextButton = document.createElement('button');
        nextButton.classList.add('pc-carousel-button', 'pc-carousel-next');
        nextButton.setAttribute('aria-label', 'Next Slide');
        nextButton.innerHTML = '&#10095;'; // Right arrow

        // Create indicators
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.classList.add('pc-carousel-indicators');

        carouselData.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('pc-carousel-indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicator.setAttribute('data-slide-to', index);
            indicatorsContainer.appendChild(indicator);
        });

        // Append all elements to the main container
        carouselContainer.appendChild(carouselWrapper);
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
        carouselContainer.appendChild(indicatorsContainer);

        // Append the carousel to the body or a specific container
        // Here, we assume there's a div with id 'pc-carousel' in your index.html
        const target = document.getElementById('pc-carousel');
        if (target) {
            target.appendChild(carouselContainer);
        } else {
            // If no target div, append to body
            document.body.appendChild(carouselContainer);
        }

        return {
            carousel: carouselTrack,
            slides: document.querySelectorAll('.pc-carousel-slide'),
            prevButton: prevButton,
            nextButton: nextButton,
            indicators: indicatorsContainer.querySelectorAll('.pc-carousel-indicator')
        };
    }

    // Initialize Carousel
    const carouselElements = createCarousel();
    const carousel = carouselElements.carousel;
    const slides = carouselElements.slides;
    const prevButton = carouselElements.prevButton;
    const nextButton = carouselElements.nextButton;
    const indicators = carouselElements.indicators;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let slideInterval;

    // Function to go to a specific slide
    function goToSlide(index) {
        // Boundary checks
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Update carousel position
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active class for slides
        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update indicators
        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[currentIndex]) {
            indicators[currentIndex].classList.add('active');
        }
    }

    // Function to go to the next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Function to go to the previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Event listeners for indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            let index = parseInt(e.target.getAttribute('data-slide-to'));
            goToSlide(index);
            resetInterval();
        });
    });

    // Automatic sliding
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Pause on hover
    carousel.parentElement.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.parentElement.addEventListener('mouseleave', () => {
        startInterval();
    });

    // Initialize carousel
    goToSlide(0);
    startInterval();

    // Handle swipe events for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.parentElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.parentElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetInterval();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            resetInterval();
        }
    }
});
