$(document).ready(function() {
	var submitCode = 0
	var collectCode = 0
	$('.chose_type').on('click', function() {
		$('#specification').fadeIn()
		submitCode = 1
	})

	$('.put').on('click', function() {
		$('#specification').fadeIn()
		submitCode = 1
	})

	$('.buy').on('click', function() {
		$('#specification').fadeIn()
		submitCode = 1
	})

	$('#specification').on('click', function() {
		if(event.target.id === 'specification') {
			$('#specification').fadeOut()
			$('.chose ul li').removeAttr('class')
			$('#goods_Num').val(1)
		}
	})

	$('#specification i.close').on('click', function() {
		$('#specification').fadeOut()
		$('.chose ul li').removeAttr('class')
		$('#goods_Num').val(1)
	})

	$('.chose ul li').on('click', function() {
		$(this).attr('class', 'active').siblings().removeAttr('class')
	})

	$('p.num span.reduce').on('click', function() {
		var num = $('#goods_Num').val()
		num--
		numJudge(num)
	})

	$('p.num span.plus').on('click', function() {
		var num = $('#goods_Num').val()
		num++
		numJudge(num)
	})

	$('#goods_Num').on('input', function() {
		var inputNum = $(this).val()
		if(!inputNum) {
			pointOut('请输入数量！')
		} else if(!intRule.exec(inputNum)) {
			pointOut('您数量输入错了呢！')
			setTimeout(function() {
				$('#goods_Num').val(1)
			}, 1500)
		} else {
			return 1
		}
	})

	$('.sure button').on('click', function(event) {
		var model = $('.chose ul li.active').html()
		var num = $('#goods_Num').val()
		numJudge(num)
		if(submitCode && model && intRule.exec(num)) {
			submitCode = 0
			var cloneImg = $("img.buy_img").clone().css({
				width: 50,
				height: 50,
				borderRadius: 50,
			});
			cloneImg.css('z-index', '99999')
			var left = ($(window).width() - $('body').width())/2
//			console.log(left)
			cloneImg.fly({
				start: {
					top: $("#specification .main").position().top,
					left: left
				},
				end: {
					top: $("header i.icon-gouwuchekong").position().top,
					left: $("header i.icon-gouwuchekong").position().left + left,

					width: 0,
					height: 0
				},
				autoPlay: true,
				onEnd: function() {
					cloneImg.remove();
				}
			})
			$('#specification').fadeOut()
		} else {
			$('#goods_Num').trigger('input')
		}
	})
	
	//	收藏
	$('footer ul li:nth-of-type(3)').on('click', function() {
		if(!collectCode) {
			$('.icon-shoucang').show()
			$('.icon-aixin').hide()
			collectCode = 1
		} else {
			$('.icon-shoucang').hide()
			$('.icon-aixin').show()
			collectCode = 0
		}
	})
	
	//数量判断
	function numJudge(num) {
		var maxNum = parseInt($('a.stock').html())
		if(num < 1) {
			num = 1
			pointOut("客官至少买一件吧！")
		} else if(num > maxNum) {
			num = maxNum
			pointOut("库存不够！")
		}
		$('p.num input').val(num)
	}
	
	//收藏
	function collect(collectCode) {
		if(!collectCode) {
			$('.icon-shoucang').hide()
			$('.icon-aixin').show()
		} else {
			$('.icon-shoucang').show()
			$('.icon-aixin').hide()
		}
	}
	collect(collectCode)
})