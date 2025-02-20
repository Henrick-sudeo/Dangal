const header = document.querySelector("header");
const subheader = document.querySelector(".subheader");
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
const slider = document.querySelector(".hero-slider");
const dots = document.querySelectorAll(".dot");
const heroNext = document.querySelector(".hero-next");
const heroPrev = document.querySelector(".hero-prev");
let currentIndex = 0;
let autoScroll;

if (header && subheader) {
    window.addEventListener("scroll", function () {
        const isScrolled = window.scrollY > 100;
        header.classList.toggle("sticky", window.scrollY > 0);
        subheader.classList.toggle("show-subheader", isScrolled);
    });
}

if (menu) {
    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        navlist?.classList.toggle("open");
    };
}

window.onscroll = () => {
    menu?.classList.remove("bx-x");
    navlist?.classList.remove("open");
};

if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        distance: "30px",
        duration: 2600,
        reset: true,
    });
    sr.reveal(".some-class", { delay: 200, origin: "bottom" });
}

function jumpToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoScroll();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateSlider();
}

function updateSlider() {
    if (!slider) return;
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add("active");
    }
}

function startAutoScroll() {
    clearInterval(autoScroll); // Prevent multiple intervals
    autoScroll = setInterval(nextSlide, 3000);
}

function resetAutoScroll() {
    clearInterval(autoScroll);
    startAutoScroll();
}

if (heroNext) {
    heroNext.addEventListener("click", () => {
        nextSlide();
        resetAutoScroll();
    });
}

if (heroPrev) {
    heroPrev.addEventListener("click", () => {
        prevSlide();
        resetAutoScroll();
    });
}

startAutoScroll();
updateSlider();
