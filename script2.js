document.addEventListener("DOMContentLoaded", function () {
  
  // ==========================================
  // 1. STICKY NAVBAR ON SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('header.site-navbar') || document.querySelector('.site-navbar');
  
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check on load
  }

  // ==========================================
  // 2. SCROLL REVEAL ANIMATION (Our Process / Programs)
  // ==========================================
  // Targeting elements across sections safely using loose feature queries
  const itemsToAnimate = document.querySelectorAll(
    '.services-item, [class*="services"] .col-, .program-entry, [class*="program"] .col-'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('element-visible');
        observer.unobserve(entry.target); // Runs animation only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  itemsToAnimate.forEach(item => {
    // Inject base animation styles dynamically to protect existing markup layouts
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    revealObserver.observe(item);
  });

  // ==========================================
  // 3. DYNAMIC STATS COUNTER ENGINE
  // ==========================================
  const counterSection = document.querySelector('[class*="counter"]').parentNode || document.querySelector('.ftco-counter');
  let countersStarted = false;

  function runCounterAnimation() {
    // Selects elements that house numerical values (e.g., 5,000, 4,560, 570, 900)
    const counters = document.querySelectorAll('[class*="number"], .number, [data-number]');
    
    counters.forEach(counter => {
      // Clean up string values to pull accurate targets (handling formatting commas)
      const targetText = counter.getAttribute('data-number') || counter.innerText;
      const target = parseInt(targetText.replace(/,/g, ''), 10);
      
      if (isNaN(target)) return; // Escape check if content isn't numeric
      
      let count = 0;
      const duration = 2000; // Total duration of counts in milliseconds
      const increment = Math.ceil(target / (duration / 16)); // Target roughly 60 FPS refresh rate

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count.toLocaleString();
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      
      updateCount();
    });
  }

  // Monitor viewport positioning to execute counting animation smoothly when scrolled to
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          runCounterAnimation();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
  } else {
    // Fallback hook checking broad numerical layout blocks if explicit class names diverge
    runCounterAnimation();
  }
});

/**
 * Bodyfit Theme Animation & Sticky Core Script
 */
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Sticky Navigation Blur & Shadow Trigger
    const headerElement = document.querySelector("header");
    
    function toggleHeaderScrollState() {
        if (window.scrollY > 40) {
            headerElement.classList.add("scrolled");
        } else {
            headerElement.classList.remove("scrolled");
        }
    }

    // Run immediately on load check and assign to viewport scrolling
    toggleHeaderScrollState();
    window.addEventListener("scroll", toggleHeaderScrollState);


    // 2. High-Performance Intersection Observer for Scroll Reveals
    const animatedElements = document.querySelectorAll('.process-card, .program-item, .stat-box');
    
    const observerOptions = {
        root: null, // watches the global viewport
        rootMargin: "0px",
        threshold: 0.12 // fires as soon as 12% of the card peeks in
    };

    const revealOnScrollObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to initiate CSS transition
                entry.target.classList.add("element-visible");
                // Stop observing once visible to optimize background rendering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Register elements to the observer stream
    animatedElements.forEach(element => {
        revealOnScrollObserver.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelector('.play-btn');
    const lightbox = document.getElementById('videoLightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const closeBtn = document.querySelector('.lightbox-close');

    if (playBtn && lightbox && lightboxContent && closeBtn) {
        
        // Open Lightbox and load the local video player
        playBtn.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            
            // Injects a native HTML5 video player with controls and autoplay enabled
            lightboxContent.innerHTML = `
                <video id="localVideoPlayer" controls autoplay style="width:100%; height:100%; object-fit:contain;">
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
                
            lightbox.classList.add('active');
        });

        // Function to turn off the video and close the modal window safely
        function closeVideoModal() {
            const videoElement = document.getElementById('localVideoPlayer');
            if (videoElement) {
                videoElement.pause(); // Instantly freezes audio/video playback
            }
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = ''; // Wipes the player block cleanly
        }

        // Close Event Listeners
        closeBtn.addEventListener('click', closeVideoModal);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeVideoModal();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const statsSection = document.querySelector('.stats-banner');
    const counters = document.querySelectorAll('.stat-box h2');
    const speed = 2000; // Total duration of the animation in milliseconds (2 seconds)

    if (!statsSection || counters.length === 0) return;

    // Helper function to animate an individual counter
    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < speed) {
                // Calculate progress percentage (0 to 1)
                const progress = elapsedTime / speed;
                
                // Ease-out quad function for smooth deceleration at the end
                const easeOutProgress = progress * (2 - progress);
                const currentValue = Math.floor(easeOutProgress * target);
                
                // Format with commas and update text
                counter.innerText = currentValue.toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                // Ensure it snaps perfectly to the final target value
                counter.innerText = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // Setup Observer to trigger only when section comes into view
    const observerOptions = {
        root: null,
        threshold: 0.1 // Triggers when 10% of the section is visible
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start all counters simultaneously
                counters.forEach(counter => startCounter(counter));
                // Disconnect observer so it doesn't re-trigger if the user scrolls up and down again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlideIndex = 0;
    const slideDuration = 4000; // Time each slide stays on screen (4.0 seconds)

    if (slides.length <= 1) return; // Exit if you only have one slide setup

    function changeHeroSlide() {
        // Remove active markers from the currently playing slide
        slides[currentSlideIndex].classList.remove('active');

        // Target the next slide layout index position
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        // Apply active markers to kick off the next paired background and text sequence
        slides[currentSlideIndex].classList.add('active');
    }

    // Initialize looping cycle
    setInterval(changeHeroSlide, slideDuration);
});

// 3. HORIZONTAL IMAGES GALLERY TRACK SLIDER ENGINE
const strip = document.getElementById('galleryStrip');
const prevBtn = document.getElementById('galleryPrevBtn');
const nextBtn = document.getElementById('galleryNextBtn');

if(strip && prevBtn && nextBtn) {
    let currentSlideOffset = 0;

    // Slide Next Click Functionality
    nextBtn.addEventListener('click', () => {
        const itemWidth = strip.querySelector('.gallery-item').clientWidth;
        const totalItems = strip.querySelectorAll('.gallery-item').length;
        const visibleItems = Math.round(strip.clientWidth / itemWidth);
        const maxOffsetMax = totalItems - visibleItems;

        if (currentSlideOffset < maxOffsetMax) {
            currentSlideOffset++;
            strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
        } else {
            // Loop back to start smoothly
            currentSlideOffset = 0;
            strip.style.transform = `translateX(0px)`;
        }
    });

    // Slide Previous Click Functionality
    prevBtn.addEventListener('click', () => {
        const itemWidth = strip.querySelector('.gallery-item').clientWidth;
        const totalItems = strip.querySelectorAll('.gallery-item').length;
        const visibleItems = Math.round(strip.clientWidth / itemWidth);
        const maxOffsetMax = totalItems - visibleItems;

        if (currentSlideOffset > 0) {
            currentSlideOffset--;
            strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
        } else {
            // Go back directly to the end slide window block
            currentSlideOffset = maxOffsetMax;
            strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
        }
    });

    // Recalculates positioning gracefully if browser size changes
    window.addEventListener('resize', () => {
        const itemWidth = strip.querySelector('.gallery-item').clientWidth;
        strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
    });
}

// ==========================================
// MOBILE MENU SLIDEOUT NAVIGATION ENGINE
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu ul li a");

    if (hamburger && navMenu) {
        // Toggle slide menu drawer open/close
        hamburger.addEventListener("click", function (e) {
            e.stopPropagation();
            navMenu.classList.toggle("mobile-active");
            
            // Switch out icon look between standard bars and closing "X"
            const icon = hamburger.querySelector("i");
            if (navMenu.classList.contains("mobile-active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu panel automatically when clicking on any navigational route link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("mobile-active");
                const icon = hamburger.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });

        // Close sidebar safely if clicked anywhere outside the layout space
        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove("mobile-active");
                const icon = hamburger.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }
});

// ==========================================
// GALLERY SLIDER MECHANISM (Desktop & Tablet)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const viewport = document.querySelector('.gallery-viewport');
    const strip = document.querySelector('.gallery-strip');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');

    if (!viewport || !strip || items.length === 0) return;

    let currentIndex = 0;

    function getItemsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 4; // Default desktop views
    }

    function updateSliderPosition() {
        // Disable JS transforms on mobile viewports since we use native CSS swipe snapping
        if (window.innerWidth <= 576) {
            strip.style.transform = 'none';
            return;
        }

        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, items.length - itemsPerView);
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const itemWidth = items[0].getBoundingClientRect().width;
        const moveAmount = currentIndex * itemWidth;
        strip.style.transform = `translateX(-${moveAmount}px)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const itemsPerView = getItemsPerView();
            if (currentIndex < items.length - itemsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start smoothly
            }
            updateSliderPosition();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            const itemsPerView = getItemsPerView();
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, items.length - itemsPerView); // Loop to end
            }
            updateSliderPosition();
        });
    }

    // Recalculate dimensions dynamically if the screen is rotated or resized
    window.addEventListener('resize', updateSliderPosition);
});

// ==========================================
// MOBILE CONTACT POPUP TRIGGER SYSTEM
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("mobile-contact-modal");
    const closeBtn = document.querySelector(".close-modal-btn");

    if (!modal || !closeBtn) return;

    // Function to safely open the modal on mobile viewports
    function openMobileModal() {
        if (window.innerWidth <= 768) {
            modal.classList.add("active-popup");
            document.body.style.overflow = "hidden"; // Stops the background page from scrolling
        }
    }

    // Function to close the modal
    function closeMobileModal() {
        modal.classList.remove("active-popup");
        document.body.style.overflow = "auto"; // Restores page scrolling
    }

    // 1. AUTOMATIC TRIGGER: Open 2 seconds after the page loads
    setTimeout(function() {
        openMobileModal();
    }, 2000); // 2000 milliseconds = 2 seconds

    // 2. CLICK TRIGGER: Find the "Contact" link inside your navigation menu
    // Your index.html uses href="#booking" for the contact link
    const contactLinks = document.querySelectorAll('nav a[href="#booking"], .btn-appointment, .mobile-info-item button');

    contactLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevents jumping down the page on mobile
                openMobileModal();
            }
        });
    });

    // 3. CLOSE MECHANISMS
    // Close on clicking the 'X' button
    closeBtn.addEventListener("click", closeMobileModal);

    // Close automatically if the user clicks anywhere on the dark space outside the box
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeMobileModal();
        }
    });
});

// ==========================================
// BACKGROUND FORM SUBMISSION ENGINE (No WhatsApp)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("mobile-contact-modal");
    const closeBtn = document.querySelector(".close-modal-btn");
    
    // Forms
    const modalForm = document.getElementById("html-modal-form");
    const mainBookingForm = document.getElementById("html-main-booking-form");

    // Modal Display Logic Triggers
    const triggers = document.querySelectorAll(".btn-appointment, .mobile-info-item button");
    
    function openMobileModal() {
        if (window.innerWidth <= 768 && modal) {
            modal.classList.add("active-popup");
            document.body.style.overflow = "hidden";
        }
    }

    function closeMobileModal() {
        if (modal) {
            modal.classList.remove("active-popup");
            document.body.style.overflow = "auto";
        }
    }

    if (modal && closeBtn) {
        setTimeout(openMobileModal, 2000);
        
        const contactLinks = document.querySelectorAll('nav a[href="#booking"]');
        contactLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    openMobileModal();
                }
            });
        });

        closeBtn.addEventListener("click", closeMobileModal);
        window.addEventListener("click", function (e) {
            if (e.target === modal) closeMobileModal();
        });
    }

    // Reuseable background submission sender function
    function handleFormSubmit(formElement, isModal = false) {
        if (!formElement) return;

        formElement.addEventListener("submit", function (e) {
            e.preventDefault(); // STOPS page navigation or app switching

            // Change button text to show it's working
            const submitBtn = formElement.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // Gather the data from the HTML layout input fields
            const formData = new FormData(formElement);

            // Send form data silently behind the scenes
            fetch(formElement.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Thank you! Your fitness inquiry has been submitted successfully.");
                    formElement.reset(); // Clear input items
                    if (isModal) closeMobileModal(); // Hide modal popup
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            })
            .catch(error => {
                alert("Connection error. Please check your network and try again.");
            })
            .finally(() => {
                // Restore button functionality back to original state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Activate the silent background sender for both forms
    handleFormSubmit(modalForm, true);
    handleFormSubmit(mainBookingForm, false);
});

// ==================================================================
        // 2. BACKGROUND FORM SUBMISSION ENGINE (With Custom Success Popup)
        // ==================================================================
        const modal = document.getElementById("mobile-contact-modal");
        const closeBtn = document.querySelector(".close-modal-btn");
        
        const modalForm = document.getElementById("html-modal-form");
        const mainBookingForm = document.getElementById("html-main-booking-form");
        
        // Success Popup Elements
        const successModal = document.getElementById("form-success-modal");
        const closeSuccessBtn = document.getElementById("close-success-btn");

        function openMobileModal() {
            if (window.innerWidth <= 768 && modal) {
                modal.classList.add("active-popup");
                document.body.style.overflow = "hidden";
            }
        }

        function closeMobileModal() {
            if (modal) {
                modal.classList.remove("active-popup");
                document.body.style.overflow = "auto";
            }
        }

        if (modal && closeBtn) {
            setTimeout(openMobileModal, 2000);
            
            const contactLinks = document.querySelectorAll('nav a[href="#booking"], .mobile-info-item button');
            contactLinks.forEach(link => {
                link.addEventListener("click", function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        openMobileModal();
                    }
                });
            });

            closeBtn.addEventListener("click", closeMobileModal);
            window.addEventListener("click", function (e) {
                if (e.target === modal) closeMobileModal();
            });
        }

        // Logic to control the Custom Success Popup
        if (successModal && closeSuccessBtn) {
            closeSuccessBtn.addEventListener("click", function() {
                successModal.classList.remove("show-success");
                document.body.style.overflow = "auto";
            });
        }

        // Reusable background form submit handler
        function handleFormSubmit(formElement, isModal = false) {
            if (!formElement) return;

            formElement.addEventListener("submit", function (e) {
                e.preventDefault(); 

                const submitBtn = formElement.querySelector("button[type='submit']") || formElement.querySelector(".btn-appointment") || formElement.querySelector(".btn-modal-submit");
                const originalBtnText = submitBtn ? submitBtn.innerText : "Send Message";
                
                if (submitBtn) {
                    submitBtn.innerText = "Sending...";
                    submitBtn.disabled = true;
                }

                const formData = new FormData(formElement);

                fetch(formElement.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        formElement.reset();
                        if (isModal) closeMobileModal();
                        
                        // Open the gorgeous custom success popup container instead of browser alert
                        if (successModal) {
                            successModal.classList.add("show-success");
                            document.body.style.overflow = "hidden"; // Locks viewport scroll
                        }
                    } else {
                        alert("Oops! There was a problem submitting your form. Please try again.");
                    }
                })
                .catch(error => {
                    alert("Connection error. Please check your network and try again.");
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    }
                });
            });
        }

        // Activate background configurations
        handleFormSubmit(modalForm, true);
        handleFormSubmit(mainBookingForm, false);