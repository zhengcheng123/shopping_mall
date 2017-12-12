//个人信息js

$(document).ready(function() {
	//	点击打开编辑并填充昵称
	$('section div.name').on('click', function() {
		$('div.name_edit').addClass('active').find('input').val($('div.name a').html())
	})
	//	保存昵称修改
	$('div.name_edit').find('div.save').on('click', function() {
		$('div.name a').html($('div.name_edit').removeClass('active').find('input').val())
	})
})