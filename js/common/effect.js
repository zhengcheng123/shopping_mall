/*存放各种特效的函数和全局变量*/

//手机号验证规则
var phoneRule = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
//密码验证正则
var passwordRule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/

//文字提示
function pointOut(message) {
	if($('span.pointOut').length){
		return null
	}else{
		$('body').append('<span class="pointOut">ERROR!</span>')
	}

	$('span.pointOut').html(message);
	
	$('span.pointOut').stop().animate({
		opacity: 1
	}, 500, function() {
		setTimeout(function() {
			$('span.pointOut').stop().animate({
				opacity: 0
			}, 100)
			$('body span.pointOut').remove()
		}, 2000)
	})
}