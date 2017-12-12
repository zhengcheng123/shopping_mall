//提交的订单js

$(document).ready(function () {
	$('div.address').on('click',function () {
		$('div.address_list').addClass('active')
		$('body').css('overflow','hidden')
	})
	
	$('ul li span.check').on('click',function () {
		console.log(1)
		$(this).addClass('active').parent('li').siblings('li').find('span.check').removeClass('active')
	})
})

//选择收货地址
