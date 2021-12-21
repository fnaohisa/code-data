//スライドショー
var mySwiper = new Swiper('.swiper-container', {
  autoplay: 4000,
  speed: 1000,
  autoplayDisableOnInteraction: true,
  //disableOnInteraction: true,
  loop: true,
  slidesPerView: "auto",
  //spaceBetween: 10,
  centeredSlides : true,
  //pagination: '.swiper-pagination',
  //追記リンク動作用ここから
  preventClicks: false,
  preventClicksPropagation: false,
  //追記リンク動作用ここまで
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  breakpoints: {
    767: {
      slidesPerView: 1,
      spaceBetween: 0
    }
  }
})

$(".swiper-container").hover(
  function() {
    mySwiper.stopAutoplay();
  },
  function() {
    mySwiper.startAutoplay();
  }
);
