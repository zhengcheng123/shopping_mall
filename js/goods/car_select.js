//购物车勾选
$(document).ready(function() {
	//全局的checkbox选中和未选中的样式
	var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
		$wholeChexbox = $('.whole_check'),
		$shop = $('.shop'), //每个商铺盒子
		$shopCheckbox = $('.shop_choice'), //每个商铺的checkbox
		$sonCheckBox = $('.son_check'); //每个商铺下的商品的checkbox

	$allCheckbox.click(function() {
		if($(this).is(':checked')) {
			$(this).next('label').addClass('mark');
		} else {
			$(this).next('label').removeClass('mark')
		}
	})
	//全局全选与单个商品的关系
	$wholeChexbox.click(function() {
		var $checkboxs = $shop.find('input[type="checkbox"]');
		if($(this).is(':checked')) {
			$checkboxs.prop("checked", true);
			$checkboxs.next('label').addClass('mark');
		} else {
			$checkboxs.prop("checked", false);
			$checkboxs.next('label').removeClass('mark');
		}
		totalMoney();
	})

	$sonCheckBox.each(function() {
		$(this).click(function() {
			if($(this).is(':checked')) {
				//判断：所有单个商品是否勾选
				var len = $sonCheckBox.length;
				var num = 0;
				$sonCheckBox.each(function() {
					if($(this).is(':checked')) {
						num++;
					}
				});
				if(num == len) {
					$wholeChexbox.prop("checked", true);
					$wholeChexbox.next('label').addClass('mark');
				}
			} else {
				//单个商品取消勾选，全局全选取消勾选
				$wholeChexbox.prop("checked", false);
				$wholeChexbox.next('label').removeClass('mark');
			}
		})
	})

	//每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化

	//店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
	$shopCheckbox.each(function() {
		$(this).click(function() {
			if($(this).is(':checked')) {
				//判断：店铺全选中，则全局全选按钮打对勾。
				var len = $shopCheckbox.length;
				var num = 0;
				$shopCheckbox.each(function() {
					if($(this).is(':checked')) {
						num++;
					}
				});
				if(num == len) {
					$wholeChexbox.prop("checked", true);
					$wholeChexbox.next('label').addClass('mark');
				}

				//店铺下的checkbox选中状态
				$(this).parents('.shop').find('.son_check').prop("checked", true);
				$(this).parents('.shop').find('.son_check').next('label').addClass('mark');
			} else {
				//否则，全局全选按钮取消对勾
				$wholeChexbox.prop("checked", false);
				$wholeChexbox.next('label').removeClass('mark');

				//店铺下的checkbox选中状态
				$(this).parents('.shop').find('.son_check').prop("checked", false);
				$(this).parents('.shop').find('.son_check').next('label').removeClass('mark');
			}
			totalMoney();
		})
	})

	//每个店铺checkbox与其下商品的checkbox的关系

	//店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
	$shop.each(function() {
		var $this = $(this)
		var $sonChecks = $this.find('.son_check')
		$sonChecks.each(function() {
			$(this).click(function() {
				if($(this).is(':checked')) {
					//判断：如果所有的$sonChecks都选中则店铺全选打对勾！
					var len = $sonChecks.length
					var num = 0
					$sonChecks.each(function() {
						if($(this).is(':checked')) {
							num++
						}
					});
					if(num == len) {
						$(this).parents('.shop').find('.shop_choice').prop("checked", true)
						$(this).parents('.shop').find('.shop_choice').next('label').addClass('mark')
					}
				} else {
					//否则，店铺全选取消
					$(this).parents('.shop').find('.shop_choice').prop("checked", false)
					$(this).parents('.shop').find('.shop_choice').next('label').removeClass('mark')
				}
				totalMoney()
			})
		})
	})
	
	//input的数量跟标记同步
	function numChange() {
		$('section').find('div.shop').each(function(){
			$(this).children('ul').find('li').each(function(){
				$(this).find('input#goods_Num').val(parseInt($(this).find('span.goods_num a').html()))
				$(this).find('span.goods_num a').html($(this).find('input#goods_Num').val())
			})
		})
	}
	numChange()
	

	
	//数量加
	$('p.num span.plus').unbind().on('click',function(){
		var num = $(this).siblings('#goods_Num').val()
		var maxNum = parseInt($(this).parents('p.num').siblings('p.maxNum').find('a.stock').html())
		num++
		var num1 = numJudge(num,maxNum)
		$(this).siblings('#goods_Num').val(num1)
	})
	
	//数量减
	$('p.num span.reduce').unbind().on('click',function(){
		var num = $(this).siblings('#goods_Num').val()
		var maxNum = parseInt($(this).parents('p.num').siblings('p.maxNum').find('a.stock').html())
		num--
		var num1 = numJudge(num,maxNum)
		$(this).siblings('#goods_Num').val(num1)
	})
	
	//数量判断
	function numJudge(num,maxNum) {
		if(num < 1) {
			pointOut("数量已经最低了！")
			return num = 1
		} else if(num > maxNum) {
			pointOut("库存不足！")
			num = maxNum
			return num
		} else {
			return num
		}
	}
	
	//头部所有商品编辑按钮
	var editChose = 1
	$('header a.edit').on('click',function(){ 
		if(editChose == 1) {
			editChose = 2
			$(this).html('完成')
			pageShow(editChose)
		}else if(editChose == 2){
			editChose = 1
			$(this).html('编辑')
			$('div.shop div.shop_title a.edit').html('编辑')
			pageShow(editChose)
		}
	})
	
	//商铺编辑
	$('div.shop div.shop_title a.edit').on('click',function(){
		if($(this).html() == '编辑') {
			$(this).html('完成')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.content').children('div.goods_detail').css('display','none')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.content').children('span.goods_num').css('display','none')
			$(this).siblings('i.icon-right').css('display','none')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.goods_delete').css('display','block')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.content').children('div.chose_num').css('display','block')
		}else if($(this).html() == '完成'){
			$(this).html('编辑')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.content').children('div.goods_detail').css('display','block')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.content').children('span.goods_num').css('display','block')
			$(this).siblings('i.icon-right').css('display','block')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.goods_delete').css('display','none')
			$(this).parents('div.shop_title').siblings('ul').children('li').children('div.content').children('div.chose_num').css('display','none')
		}
	})
	
	// 打开型号选择
	$('p.model').on('click',function(){
		if($(this).find('i').hasClass('icon-down')) {
			$('#specification').fadeIn()
		}else{
			console.log('请点击编辑')
		}
	})
	
	//模态框点击阴影部分退出
	$('#specification').on('click',function(event){
		if(event.target.id == 'specification') {
			$(this).fadeOut()
		}
	})
	
	//点击确定 选择型号
	$('div.sure button').on('click',function(){
		$('#specification').fadeOut()
	})
	
	//型号选择对应边框颜色改变
	$('#specification div.chose ul li').on('click',function(){
		$(this).attr('class', 'active').siblings().removeAttr('class')
	})
	
	//控制编辑显示
	function pageShow(key) {
		if(key == 1) {
			$('footer div.settle_accounts').css('display','flex')
			$('section div.goods_detail').css('display','block')
			$('section span.goods_num').css('display','block')
			$('section div.shop_title a.edit').css('display','block')
			$('section div.shop_title i.icon-right').css('display','block')
			$('footer div.all_chose_delete').css('display','none')
			$('section div.chose_num').css('display','none')
			$('div.goods_delete').css('display','none')
		}else if(key == 2){
			$('footer div.settle_accounts').css('display','none')
			$('section div.goods_detail').css('display','none')
			$('section span.goods_num').css('display','none')
			$('section div.shop_title a.edit').css('display','none')
			$('section div.shop_title i.icon-right').css('display','none')
			$('div.goods_delete').css('display','none')
			$('section div.goods_detail p.model').css('display','block')
			$('footer div.all_chose_delete').css('display','block')
			$('section div.chose_num').css('display','block')
		}
	}

	//结算
	function totalMoney() {
		var total_money = 0
		var total_count = 0
		var kind = 0
		var calBtn = $('footer span.to_pay')
		var deleteBtn = $('footer span.to_delete')
		$sonCheckBox.each(function() {
			if($(this).is(':checked')) {
				kind++
				var goods = parseFloat($(this).parents('li .content').children('.goods_detail').find('.goods_price a').html()).toFixed(2)
				var num = parseInt($(this).parents('li .content').children('span.goods_num').find('a').html())
				total_money += goods * num
				total_count += num
			}
		});
		$('.settle_accounts p.total a').html(total_money.toFixed(2))
		$('span.to_pay').find('a').html(kind)

		if(total_money != 0 && total_count != 0) {
			if(!calBtn.hasClass('btn_sty')) {
				calBtn.addClass('btn_sty')
				deleteBtn.addClass('btn_sty')
			}
		} else {
			if(calBtn.hasClass('btn_sty')) {
				calBtn.removeClass('btn_sty')
				deleteBtn.removeClass('btn_sty')
			}
		}
	}

});