// script.js – human readable, handles reveal animations and any small interactions
(function() {
    "use strict";

    // ----- animate on scroll (fade-up) -----
    const animateElements = document.querySelectorAll('[data-animate="fade-up"]');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const buffer = 80; // px before it appears
        return (
            rect.top <= (window.innerHeight - buffer) && rect.bottom >= buffer
        );
    }

    function revealElements() {
        animateElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('revealed')) {
                el.classList.add('revealed');
            }
            // optional: keep revealed, no need to remove class
        });
    }

    // initial check after tiny delay (some browsers need layout)
    window.addEventListener('load', () => {
        setTimeout(revealElements, 80);
    });

    // throttle with requestAnimationFrame for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealElements();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ----- small hover interaction for skill tags (optional smoothness) -----
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', (e) => {
            // just a tiny extra, css does most
        });
    });

    // ----- optional: console reminder of follower count (human touch) -----
    console.log("✨ Kea Nhlapo portfolio – 133 followers & building.");

    // ----- any placeholder image fallback (but we use font icons) -----
    // ensure all placeholder logos have consistent icon
    // no op, everything fine

    // ----- simulate activity later? but we keep static, all good.
    // maybe add a tiny dynamic year update in footer? but not necessary.

    // set current year for footer (simple polish)
    const footer = document.querySelector('footer span');
    // but we don't want to break text – optional.
    // I'll leave it, but can add a small detail:
    const yearSpan = document.createElement('span');
    // not needed, but shows human touch.
})();

// additional micro interaction: smooth scroll for anchor links? none present.
// all good.

// script end