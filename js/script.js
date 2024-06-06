let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {
  ///////// ** related** /////////
  var specials = new Swiper(".related-slider .swiper-container", {
    // loop: true,
    autoplay: true,
    slidesPerView: 3.2,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      1199: {
        slidesPerView: 3.2,
        spaceBetween: 30,
      },
    },
  });
});
