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
    loop: true,
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
const timerExists =
  document.getElementsByClassName("countdown-container").length > 0;
if (timerExists) {
  //timer setting
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("mins");
  const secondsEl = document.getElementById("seconds");

  const newYears = "31 Dec 2024";

  function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // initial call
  countdown();
  setInterval(countdown, 1000);
}
