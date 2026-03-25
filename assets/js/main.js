// Mobile Menu Toggle
// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fade-in on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('fade-in');
});
// ================= IMPACT COUNTERS =================
const counters = document.querySelectorAll('.counter');
let started = false;

function startCounters() {
    if (!started && window.scrollY + window.innerHeight >= document.querySelector('.impact-section').offsetTop) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 80; // lower = faster

                if (count < target) {
                    counter.innerText = Math.ceil(count + target / speed);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
        started = true;
    }
}
// ================= SCROLL REVEAL =================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in');

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

window.addEventListener('scroll', startCounters);

