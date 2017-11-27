$(document).ready(function() {
	tabs() //tab切换
	clearInput() //输入框清楚按钮

	//tab切换
	function tabs() {
		$('.tabs ul li').on('click', function() {
			if($(this).children('span').attr('class') == 'active') {
				return null
			} else {
				$('input').val('')
				buttonColor()
				buttonColor1()
				$(this).children('span').attr('class', 'active').parent().siblings().children('span').removeAttr('class')
				$('body').css('opacity', '0')
				$('body').stop().animate({
					opacity: 1
				}, 300)
			}
			var index = $(this).index() + 1
			if(index == 1) {
				$('div.direct').show().siblings('div.shortcut').hide()
			} else {
				$('div.shortcut').show().siblings('div.direct').hide()
			}
		})
	}

	//输入框动态
	function clearInput() {
		$('input#phoneNum').on('input', function() {
			if($(this).val()) {
				$('i.phoneNum').css('display', 'block')
			} else {
				$('i.phoneNum').css('display', 'none')
			}
			buttonColor()
		})

		$('input#password').on('input', function() {
			if($(this).val()) {
				$('i.password').css('display', 'block')
			} else {
				$('i.password').css('display', 'none')
			}
			buttonColor()
		})

		$('i.phoneNum').on('click', function() {
			$(this).css('display', 'none')
			$('input#phoneNum').val('')
			buttonColor()
		})

		$('i.password').on('click', function() {
			$(this).css('display', 'none')
			$('input#password').val('')
			buttonColor()
		})

		$('input#phoneShortcut').on('input', function() {
			buttonColor1()
		})

		$('input#verify').on('input', function() {
			buttonColor1()
		})
	}

	//登录按钮的颜色控制
	function buttonColor() {
		if($('input#phoneNum').val() && $('input#password').val()) {
			$('div.loginButton button').css('opacity', '1')
			return 1
		} else {
			$('div.loginButton button').css('opacity', '0.4')
			return 0
		}
	}

	//登录按钮的颜色控制1
	function buttonColor1() {
		if($('input#phoneShortcut').val() && $('input#verify').val() && $('.protocol label').attr('class')) {
			$('div.loginButtonShortcut button').css('opacity', '1')
			return 1
		} else {
			$('div.loginButtonShortcut button').css('opacity', '0.4')
			return 0
		}
	}

	//登录
	$('div.loginButton button').unbind().on('click', function() {
		console.log(buttonColor())
		if(buttonColor()) {
			pointOut('登录成功！')
		} else {
			pointOut('请完善信息！')
		}

	})

	//登录1
	$('div.loginButtonShortcut button').unbind().on('click', function() {
		console.log(buttonColor())
		if(buttonColor1()) {
			pointOut('登录成功！')
		} else {
			if($('.protocol label').attr('class')){
				pointOut('请完善信息！')
			}else{
				pointOut('请仔细阅读服务协议！')
			}
			
		}
	})

	//输入手机号获取验证码
	$('div.getVerify').on('click', function(event) {
		var regEX = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
		var phoneNum = $('input#phoneShortcut').val()
		if(event.target.nodeName.toLowerCase() == 'a') {
			if(phoneNum) {
				if(!regEX.exec(phoneNum)) {
					pointOut('请填写正确的手机号！')
				} else {
					pointOut('验证码发送成功！')
					$(this).find('a').remove()
					$(this).html('60s')
					var t = 60
					var time = setInterval(function() {
						t -= 1
						$('div.getVerify').html(t + 's')
						if(t == 0) {
							$('div.getVerify').html('')
							$('div.getVerify').append('<a>重新获取</a>')
							clearInterval(time)
						}
					}, 1000)
				}
			} else {
				pointOut('请输入手机号！')
			}
		}
	})

	//勾选协议
	$('div.protocol label').on('click', function() {
		if($(this).attr('class')) {
			$(this).removeAttr('class')
		} else {
			$(this).attr('class', 'checked')
		}
		buttonColor1()
	})

	//默认勾选
	$('div.protocol label').trigger('click')
})