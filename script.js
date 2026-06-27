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
    const counters = document.querySelectorAll('[class*="number"], .number, [data-number]');
    
    counters.forEach(counter => {
      const targetText = counter.getAttribute('data-number') || counter.innerText;
      const target = parseInt(targetText.replace(/,/g, ''), 10);
      
      if (isNaN(target)) return; 
      
      let count = 0;
      const duration = 2000; 
      const increment = Math.ceil(target / (duration / 16)); 

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
    runCounterAnimation();
  }
});

/**
 * Bodyfit Theme Animation & Sticky Core Script
 */
document.addEventListener("DOMContentLoaded", function () {
    
    const headerElement = document.querySelector("header");
    
    function toggleHeaderScrollState() {
        if (window.scrollY > 40) {
            headerElement.classList.add("scrolled");
        } else {
            headerElement.classList.remove("scrolled");
        }
    }

    toggleHeaderScrollState();
    window.addEventListener("scroll", toggleHeaderScrollState);

    const animatedElements = document.querySelectorAll('.process-card, .program-item, .stat-box');
    
    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.12 
    };

    const revealOnScrollObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("element-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

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
        
        playBtn.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            
            lightboxContent.innerHTML = `
                <video id="localVideoPlayer" controls autoplay style="width:100%; height:100%; object-fit:contain;">
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
                
            lightbox.classList.add('active');
        });

        function closeVideoModal() {
            const videoElement = document.getElementById('localVideoPlayer');
            if (videoElement) {
                videoElement.pause(); 
            }
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = ''; 
        }

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
    const speed = 2000; 

    if (!statsSection || counters.length === 0) return;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < speed) {
                const progress = elapsedTime / speed;
                const easeOutProgress = progress * (2 - progress);
                const currentValue = Math.floor(easeOutProgress * target);
                
                counter.innerText = currentValue.toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateNumber);
    };

    const observerOptions = {
        root: null,
        threshold: 0.1 
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => startCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlideIndex = 0;
    const slideDuration = 4000; 

    if (slides.length <= 1) return; 

    function changeHeroSlide() {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    }

    setInterval(changeHeroSlide, slideDuration);
});

const strip = document.getElementById('galleryStrip');
const prevBtn = document.getElementById('galleryPrevBtn');
const nextBtn = document.getElementById('galleryNextBtn');

if(strip && prevBtn && nextBtn) {
    let currentSlideOffset = 0;

    nextBtn.addEventListener('click', () => {
        const itemWidth = strip.querySelector('.gallery-item').clientWidth;
        const totalItems = strip.querySelectorAll('.gallery-item').length;
        const visibleItems = Math.round(strip.clientWidth / itemWidth);
        const maxOffsetMax = totalItems - visibleItems;

        if (currentSlideOffset < maxOffsetMax) {
            currentSlideOffset++;
            strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
        } else {
            currentSlideOffset = 0;
            strip.style.transform = `translateX(0px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = strip.querySelector('.gallery-item').clientWidth;
        const totalItems = strip.querySelectorAll('.gallery-item').length;
        const visibleItems = Math.round(strip.clientWidth / itemWidth);
        const maxOffsetMax = totalItems - visibleItems;

        if (currentSlideOffset > 0) {
            currentSlideOffset--;
            strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
        } else {
            currentSlideOffset = maxOffsetMax;
            strip.style.transform = `translateX(-${currentSlideOffset * itemWidth}px)`;
        }
    });

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
        hamburger.addEventListener("click", function (e) {
            e.stopPropagation();
            navMenu.classList.toggle("mobile-active");
            
            const icon = hamburger.querySelector("i");
            if (navMenu.classList.contains("mobile-active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("mobile-active");
                const icon = hamburger.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });

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
    const stripElement = document.querySelector('.gallery-strip');
    const items = document.querySelectorAll('.gallery-item');
    const prevArrow = document.querySelector('.gallery-arrow.prev');
    const nextArrow = document.querySelector('.gallery-arrow.next');

    if (!viewport || !stripElement || items.length === 0) return;

    let currentIndex = 0;

    function getItemsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 4; 
    }

    function updateSliderPosition() {
        if (window.innerWidth <= 576) {
            stripElement.style.transform = 'none';
            return;
        }

        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, items.length - itemsPerView);
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const itemWidth = items[0].getBoundingClientRect().width;
        const moveAmount = currentIndex * itemWidth;
        stripElement.style.transform = `translateX(-${moveAmount}px)`;
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function () {
            const itemsPerView = getItemsPerView();
            if (currentIndex < items.length - itemsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; 
            }
            updateSliderPosition();
        });
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', function () {
            const itemsPerView = getItemsPerView();
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, items.length - itemsPerView); 
            }
            updateSliderPosition();
        });
    }

    window.addEventListener('resize', updateSliderPosition);
});

// ==================================================================
// BACKGROUND FORM SUBMISSION ENGINE (With Custom Success Popup Modal)
// ==================================================================
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("mobile-contact-modal");
    const closeBtn = document.querySelector(".close-modal-btn");
    
    const modalForm = document.getElementById("html-modal-form");
    const mainBookingForm = document.getElementById("html-main-booking-form");
    
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

    if (successModal && closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", function() {
            successModal.classList.remove("show-success");
            document.body.style.overflow = "auto"; 
        });
    }

    function handleFormSubmit(formElement, isModal = false) {
        if (!formElement) return;

        formElement.addEventListener("submit", function (e) {
            e.preventDefault(); 

            const submitBtn = formElement.querySelector("button[type='submit']") || 
                              formElement.querySelector(".btn-appointment") || 
                              formElement.querySelector(".btn-modal-submit");
            const originalBtnText = submitBtn ? submitBtn.innerText : "Send Message";
            
            if (submitBtn) {
                submitBtn.innerText = "Sending...";
                submitBtn.disabled = true;
            }

            const formData = new FormData(formElement);

            fetch(formElement.action, {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok || response.status === 200) {
                    formElement.reset();
                    if (isModal) closeMobileModal();
                    
                    if (successModal) {
                        successModal.classList.add("show-success");
                        document.body.style.overflow = "hidden"; 
                    } else {
                        alert("Thank you! Your fitness inquiry has been submitted successfully.");
                    }
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            })
            .catch(error => {
                console.error("Submission Error Details:", error);
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

    handleFormSubmit(modalForm, true);
    handleFormSubmit(mainBookingForm, false);
});

// ==================================================================
// PACKAGES CAROUSEL NAVIGATION CONTROLLER
// ==================================================================
(function() {
    const track = document.getElementById('packagesSliderTrack');
    const prevBtn = document.getElementById('pkgPrevBtn');
    const nextBtn = document.getElementById('pkgNextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    // Calculates card size + gap width configuration dynamically
    function getScrollAmount() {
        const firstCard = track.querySelector('.package-card');
        return firstCard ? firstCard.offsetWidth + 30 : 340; 
    }

    nextBtn.addEventListener('click', () => {
        track.scrollLeft += getScrollAmount();
    });

    prevBtn.addEventListener('click', () => {
        track.scrollLeft -= getScrollAmount();
    });
})();