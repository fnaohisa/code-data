// JavaScript Document
//スマホ用
if ($(window).width() < 769) {
  //SPトグルメニュー
  var state = false;
  var scrollpos;
  $('.button-toggle').on('click', function(){
    $(".header__nav_sp").slideToggle();
    $('.button-toggle').toggleClass('active');
    if(state === false) {
      scrollpos = $(window).scrollTop();
      $('body').addClass('fixed').css({'top': -scrollpos});
      state = true;
    } else {
      $('body').removeClass('fixed').css({'top': 0});
      window.scrollTo( 0 , scrollpos );
      state = false;
    }
  });
  $('.menu li a').on('click', function(){
    $('.button-toggle').toggleClass('active');
    if(state === false) {
      scrollpos = $(window).scrollTop();
      $('body').addClass('fixed').css({'top': -scrollpos});
      state = true;
    } else {
      $('body').removeClass('fixed').css({'top': 0});
      window.scrollTo( 0 , scrollpos );
      state = false;
    }
  });
  //headerトグルメニュー
  $(function(){
    $(".header__nav_sp__title").on("click", function() {
      $(this).next().slideToggle();
      $(this).toggleClass("active");
    });
  });

  //SPメニューアニメーション
  $(function(){
    $(".menu-trigger").on("click", function() {
       if($(".menu-trigger").hasClass('active')){
        $(".menu-trigger").removeClass("active");
       }else{
      $(".menu-trigger").addClass("active");
       }
    });
    $(".menu li a").on("click", function() {
       if($(".menu-trigger").hasClass('active')){
        $(".menu-trigger").removeClass("active");
       }else{
      $(".menu-trigger").addClass("active");
       }
    });
  });
} else {
  //PC用
  $(function () {
    $('a[href^="#"]').click(function () {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  });
}

//モーダル
$(function() {
    $('a[rel*=leanModal]').leanModal({top: 50,　overlay: 0.5,　closeButton: ".modal_close"});
});
