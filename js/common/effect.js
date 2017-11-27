/*存放各种特效的函数*/

//文字提示
function pointOut(message) {
	if($('div.pointOut').length){
		return null
	}else{
		$('body').append('<div class="pointOut">ERROR!</div>')
	}
//	switch(key) {
//		case 'success':
//			$('div.pointOut').html('成功');
//			break;
//
//		case 'fail':
//			$('div.pointOut').html('失败');
//			break;
//			
//		case 'LoginFail':
//			$('div.pointOut').html('登录失败');
//			break;
//	}

	$('div.pointOut').html(message);
	
	$('div.pointOut').stop().animate({
		opacity: 1
	}, 500, function() {
		setTimeout(function() {
			$('div.pointOut').stop().animate({
				opacity: 0
			}, 100)
			$('body div.pointOut').remove()
		}, 2000)
		
	})
}