/**
 * Theme Name: Kawasaki Keiba
 * Description: home 用 js
 */

(function($) {
	/**
	 * news tab
	 */
	$(function() {
		var tab_o = 'all';
		var tab = $('#js-news-tab > li');
		tab.on('click', function(e) {
			tab.removeClass('active');
			$(this).addClass('active');
			var tab_n = $(this).data('role');
			if (tab_o === tab_n) {
				return;
			}
			var c = 0;
			var list = $('#js-news-list');
			list.toggleClass('all', 'all' == tab_n);
			$('> li', list).each(function() {
				$(this).hide().removeClass('first')
				if ('all' == tab_n) {
					c++;
					$(this).fadeIn(300);
				} else if ($(this).data('role') == tab_n) {
					c++;
					$(this).fadeIn(300);
				}
				if (c === 1) {
					c++;
					$(this).addClass('first');
				}
				e.preventDefault();
				tab_o = tab_n;
			});
		});
	});
})(jQuery);



/**
 * slide
 */
var glide1 = new Glide('#mv-slider', {
	type: 'carousel',
	autoplay: 5000,
	gap: 0,
	animationDuration: 1500,
	hoverpause: true
});

var glide2 = new Glide('#banner-slider', {
	type: 'carousel',
	focusAt: 'center',
	autoplay: 8000,
	animationDuration: 1500,
	hoverpause: true
});

var wr = function() {
	var wb = window.innerWidth;
	if (wb < 550) {
		glide2.update({
			perView: 1,
			gap: 20
		});
	} else if (wb < 768) {
		glide2.update({
			perView: 2,
			before: 50,
			after: 50,
			gap: 20
		});
	} else {
		glide2.update({
			perView: 3,
			gap: 30
		});
	}
};
wr();
window.addEventListener('resize', wr);
glide1.mount();
glide2.mount();

//入場券ボタンの表示
if ($(window).width() < 768) {
	  $(window).scroll(function(){
		var body = window.document.body;
		var html = window.document.documentElement;
		var pageLength = html.scrollHeight - html.clientHeight;
		var footerHeight = $("#global-footer").height();
		var outPoint = pageLength - footerHeight - 100;
		var topBtn = $('#ticket-bnr');
		//var sc = $(this).scrollTop();
		//console.log(sc);
		//console.log(pageLength);
		if($(this).scrollTop() > 120){
			$('#ticket-bnr').addClass('moveUp');		
		}
		if($(this).scrollTop() >= outPoint){
			$('#ticket-bnr').removeClass('moveUp');		
		}
		if($(this).scrollTop() <= outPoint){
			$('#ticket-bnr').addClass('moveUp');		
		}
		if($(this).scrollTop() < 120){
			$('#ticket-bnr').removeClass('moveUp');
		}
	});
	}else{
    }

