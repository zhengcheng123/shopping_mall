$(document).ready(function(){
	$('.classify_nav').on('click',function(){
		$('body').css('overflow','hidden')
		$('nav').attr('class','active')
		setTimeout(function(){
			$('nav #nav_main').attr('class','active')
			$('nav i.iconfont').css('display','block')
			setTimeout(function(){
				
				$('nav i.iconfont').addClass('active')
			},600)
		},300)
	})
	
	$('nav').on('click',function(event){
		if(event.target.nodeName == 'NAV' || event.target.nodeName == 'I') {
			$('body').css('overflow','auto')
			$('nav #nav_main').removeAttr('class')
			setTimeout(function(){
				$('nav').removeAttr('class')
				setTimeout(function(){
					$('nav i.iconfont').removeClass('active')
					$('nav i.iconfont').css('display','none')
				},300)
			},300)
		}
	})
	
	$('.classify_guide h5').on('click',function(){
		$(this).siblings('ul').stop().slideToggle(function(){
			if($(this).is(":visible")){
	            $(this).siblings('h5').find('i.icon-right').css('transform','rotate(90deg)')
	        }else{
	           $(this).siblings('h5').find('i.icon-right').css('transform','rotate(0deg)')
	        }
		}).parents('.classify_guide').siblings('.classify_guide').find('ul').slideUp(function(){
			$(this).siblings('h5').find('i.icon-right').css('transform','rotate(0deg)')
		})
		
	})
	
	$('nav #nav_main div').find('.classify_guide').each(function(){
		$(this).children('ul').slideUp()
	})
})
