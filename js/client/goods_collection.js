//批量删收藏商品
$(document).ready(function() {
	//全局的checkbox选中和未选中的样式
	var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
		$wholeChexbox = $('.whole_check'),
		$sonCheckBox = $('.son_check'); //每个商品的checkbox

	$('header span.edit').on('click', function() {
		if($(this).html() == '编辑') {
			$(this).html('完成')
			$('.chk').css('display', 'block')
			$('footer').css('visibility', 'visible')
		} else {
			$(this).html('编辑')
			$('.chk').css('display', 'none')
			$('footer').css('visibility', 'hidden')
		}
	})

	//所有选择
	$allCheckbox.click(function() {
		totalMoney()
		if($(this).is(':checked')) {
			$(this).next('label').addClass('mark');
		} else {
			$(this).next('label').removeClass('mark')
		}
	})

	//全选和单选
	$wholeChexbox.click(function() {
		if($(this).is(':checked')) {
			$sonCheckBox.prop("checked", true);
			$sonCheckBox.next('label').addClass('mark');
		} else {
			$sonCheckBox.prop("checked", false);
			$sonCheckBox.next('label').removeClass('mark');
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

	//勾选删除
	function totalMoney() {
		var kind = 0
		var deleteBtn = $('footer span.to_delete')
		$sonCheckBox.each(function() {
			if($(this).is(':checked')) {
				kind++
				var num = parseInt($(this).parents('li .content').children('span.goods_num').find('a').html())
			}
		});
		$('div.settle_accounts').find('a').html(kind)
		if(kind != 0) {
			if(!deleteBtn.hasClass('btn_sty')) {
				deleteBtn.addClass('btn_sty')
			}
		} else {
			if(deleteBtn.hasClass('btn_sty')) {
				deleteBtn.removeClass('btn_sty')
			}
		}
	}

});