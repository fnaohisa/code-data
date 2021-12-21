/**
 * Theme Name: Kawasaki Keiba
 * Description: grade 用 js
 */

(function($) {
	/**
	 * document tab
	 #latest-information
	 */
	$(function() {
		var tab_s = 'notable-horses';
		var tab = $('#js-document-tab > li');
		var tabs = [];
		var tab_o = location.hash.substr(1);
		var box = $('#js-document-block > .entry-box');
		tab.removeClass('active');
    
    /*add settings*/
    var get_role_a = $('#js-document-tab li:nth-child(n+1)');
    var get_role_b = $('#js-document-tab li:nth-child(n+2)');
    var get_role_c = $('#js-document-tab li:nth-child(n+3)');
    var get_role_d = $('#js-document-tab li:nth-child(n+4)');
    
    var gr_a = get_role_a.attr('data-role');
    var gr_b = get_role_b.attr('data-role');
    var gr_c = get_role_c.attr('data-role');
    var gr_d = get_role_d.attr('data-role');
    
    if( gr_c !== 'no-data'){
      tab_o = 'race-report';
    }else if( gr_b !== 'no-data'){
      tab_o = 'latest-information';
    }else if( gr_a !== 'no-data'){
      tab_o = 'notable-horses';
    }else if( gr_d !== 'no-data'){
      tab_o = 'winning-horses';
    }else{
      tab_o = location.hash.substr(1);
    }
    /*add settings*/
    
    
		tab.each(function() {
			tabs.push($(this).data('role'));
		});
		if (tabs.indexOf(tab_o) === -1) {
			tab_o = tab_s;
		}
        if (box.parent().find('[data-role="' + tab_o + '"]').length) {
            box.parent().find('[data-role="' + tab_o + '"]').addClass('active');
            tab.parent().find('[data-role="' + tab_o + '"]').addClass('active');
        } else if (box.attr('data-role')) {
            var dr = box.attr('data-role');
            box.parent().find('[data-role="' + dr + '"]').addClass('active');
            tab.parent().find('[data-role="' + dr + '"]').addClass('active');
        }
		tab.on('click', function(e) {
			if ($(this).data('role') == 'no-data') {
				e.preventDefault();
				return;
			}
			tab.removeClass('active');
			$(this).addClass('active');
			var tab_n = $(this).data('role');
			if (tab_o === tab_n) return;
			box.hide().each(function() {
				if ($(this).data('role') == tab_n) {
					$(this).fadeIn(300);
				}
				e.preventDefault();
				tab_o = tab_n;
			});
		});
	});
})(jQuery);



//入場券ボタンの表示
if ($(window).width() < 768) {
    $(window).scroll(function(){
    var body = window.document.body;
    var html = window.document.documentElement;
    var pageLength = html.scrollHeight - html.clientHeight;
    var footerHeight = $("#global-footer").height();
    var outPoint = pageLength - footerHeight - 100;
    var topBtn = $('#ticket-bnr01');
    //var sc = $(this).scrollTop();
    //console.log(sc);
    //console.log(pageLength);
    if($(this).scrollTop() > 120){
      $('#ticket-bnr01').addClass('moveUp');    
    }
    if($(this).scrollTop() >= outPoint){
      $('#ticket-bnr01').removeClass('moveUp');   
    }
    if($(this).scrollTop() <= outPoint){
      $('#ticket-bnr01').addClass('moveUp');    
    }
    if($(this).scrollTop() < 120){
      $('#ticket-bnr01').removeClass('moveUp');
    }
  });
  }else{
    }


