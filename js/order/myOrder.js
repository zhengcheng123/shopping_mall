//我的订单js
$(document).ready(function(){
	//nav的tab切换
	$('nav ul li').on('click',function(){
		var index = $(this).index()
		$(this).children('span').attr('class','active').parent().siblings('li').children('span').removeAttr('class')
		$('section').eq(index).css('display','block').siblings('section').css('display','none')
	})
	//切换css
	$('nav ul').find('li').each(function(){
		if($(this).children('span').hasClass('active')) {
			var index = $(this).index()
			$('section').eq(index).css('display','block')
		}
	})
	
	//屏幕滚动nav位置置顶
	$(window).scroll(function() {
		console.log($(this).scrollTop())
		if($(this).scrollTop() > 44) {
			$('nav').css({'position':'fixed','top':'0','max-width':'640px'})
		} else if($(this).scrollTop() < 50){
			$('nav').removeAttr('style')
		}
	})
	
})
