$(document).ready(function() {
	operateInput()

	//'下一步'按钮的颜色控制
	function buttonColor() {
		if($('input#phoneNum').val() && $('.protocol label').attr('class')) {
			$('div.nextButton button').css('opacity', '1')
			return 1
		} else {
			$('div.nextButton button').css('opacity', '0.4')
			return 0
		}
	}

	//'注册'按钮的颜色控制
	function buttonColor1() {
		if($('input#verify').val() && $('input#setPassword').val()) {
			$('div.registerbutton button').css('opacity', '1')
			return 1
		} else {
			$('div.registerbutton button').css('opacity', '0.4')
			return 0
		}
	}

	//输入框逻辑
	function operateInput() {
		$('input#phoneNum').on('input', function() {
			if($(this).val()) {
				$('i.phoneNum').css('display', 'block')
			} else {
				$('i.phoneNum').css('display', 'none')
			}
			buttonColor()
		})

		$('i.phoneNum').on('click', function() {
			$(this).css('display', 'none')
			$('input#phoneNum').val('')
			buttonColor()
		})
		//'注册',input
		$('input#verify').on('input', function() {
			if($(this).val()) {
				$('i.verify').css('display', 'block')
			} else {
				$('i.verify').css('display', 'none')
			}
			buttonColor1()
		})

		$('input#setPassword').on('input', function() {
			if($(this).val()) {
				$('i.setPassword').css('display', 'block')
			} else {
				$('i.setPassword').css('display', 'none')
			}
			buttonColor1()
		})

		$('i.verify').on('click', function() {
			$(this).css('display', 'none')
			$('input#verify').val('')
			buttonColor1()
		})

		$('i.setPassword').on('click', function() {
			$(this).css('display', 'none')
			$('input#setPassword').val('')
			buttonColor1()
		})
	}

	//点击下一步
	$('div.nextButton button').unbind().on('click', function() {
		if(buttonColor()) {
			var phoneNum = $('input#phoneNum').val()
			if(phoneRule.exec(phoneNum)) {
				pointOut('验证码已发送！')
				$('.firstStep').css('display', 'none')
				$('.secondStep').css('display', 'block')
				$('div.getVerify a').trigger('click')
				$('a.tel').html(phoneNum)
			} else {
				pointOut('手机号格式不正确！')
			}
		} else {
			if($('.protocol label').attr('class')){
				pointOut('请完善信息！')
			}else{
				pointOut('请仔细阅读服务协议！')
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
		buttonColor()
	})

	//默认勾选
	$('div.protocol label').trigger('click')

	//输入手机号获取验证码
	$('div.getVerify').on('click', function(event) {
		var phoneNum = $('a.tel').val()
		if(event.target.nodeName.toLowerCase() == 'a') {
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
	})

	//注册
	$('div.registerbutton button').unbind().on('click', function() {
		if(buttonColor1()) {
			var verify = $('input#verify').val().length
			var setPassword = $('input#setPassword').val()
			console.log(verify)
			if(passwordRule.exec(setPassword) && verify === 6) {
				pointOut('注册成功！')
				window.open('../../view/shop/orderView.html')
			} else if(verify !== 6) {
				pointOut('验证码错误！')
			} else {
				pointOut('密码格式不正确！')
			}
		} else {
			pointOut('请完善信息！')
		}
	})

})