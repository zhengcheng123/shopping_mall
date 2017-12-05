$(document).ready(function() {
	tabs() //tab切换
	operateInput() //输入框清楚按钮

	//tab切换
	function tabs() {
		$('.tabs ul li').on('click', function() {
			if($(this).children('span').attr('class') == 'active') {
				return null
			} else {
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
			$('i.phoneNum').trigger('click')
			$('i.password').trigger('click')
			$('i.phoneShortcut').trigger('click')
			$('i.verify').trigger('click')
		})
	}

	//输入框动态操作
	function operateInput() {
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
			if($(this).val()) {
				$('i.phoneShortcut').css('display', 'block')
			} else {
				$('i.phoneShortcut').css('display', 'none')
			}
			buttonColor1()
		})

		$('input#verify').on('input', function() {
			if($(this).val()) {
				$('i.verify').css('display', 'block')
			} else {
				$('i.verify').css('display', 'none')
			}
			buttonColor1()
		})
		
		$('i.phoneShortcut').on('click', function() {
			$(this).css('display', 'none')
			$('input#phoneShortcut').val('')
			buttonColor()
		})
		
		$('i.verify').on('click', function() {
			$(this).css('display', 'none')
			$('input#verify').val('')
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

	//快捷登录按钮的颜色控制
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
		if(buttonColor()) {
			var phoneNum = $('input#phoneNum').val() 
			var password = $('input#password').val()
			if(!phoneRule.exec(phoneNum)){
				pointOut('手机号格式不正确！')
			}else if(!passwordRule.exec(password)) {
				pointOut('密码为6-16位字母数字组合！')
			}else{
				pointOut('登录成功！')
				window.open('../../view/order/orderView.html')
			}
		} else {
			pointOut('请完善信息！')
		}
	})

	//快捷登录
	$('div.loginButtonShortcut button').unbind().on('click', function() {
		if(buttonColor1()) {
			var phoneShortcut = $('input#phoneShortcut').val() 
			var verify = $('input#verify').val().length
			if(!phoneRule.exec(phoneShortcut)){
				pointOut('手机号格式不正确！')
			}else if(verify !== 6) {
				pointOut('请输入6位验证码！')
			}else{
				pointOut('登录成功！')
				window.open('../../view/order/orderView.html')
			}
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
		var phoneNum = $('input#phoneShortcut').val()
		if(event.target.nodeName.toLowerCase() == 'a') {
			if(phoneNum) {
				if(!phoneRule.exec(phoneNum)) {
					pointOut('手机号格式不正确！')
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