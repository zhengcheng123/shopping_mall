//申请退款或者售后js
$(document).ready(function() {
	//	打开原因
	$('li.reason').on('click', function() {
		$('div.chose_reason').fadeIn(200, function() {
			$(this).children('div.reason_list').addClass('active')
		})
	})
	//	关闭原因
	$('div.chose_reason').on('click', function(event) {
		if(event.target.className == 'chose_reason' || event.target.className == 'close_list') {
			$(this).fadeOut(200, function() {
				$(this).children('div.reason_list').removeClass('active')
			})
		}
	})

	//	选择原因
	$('div.chose_reason ul li').find('span').on('click', function() {
		console.log($(this).parent('li').html().split('<')[0])
		$(this).addClass('active').parent('li').siblings('li').find('span').removeClass('active')
		$('li.reason span').html($(this).parent('li').html().split('<')[0]).css('color', '#3D4245')
		$('div.chose_reason').fadeOut(200, function() {
			$(this).children('div.reason_list').removeClass('active')
		})
	})

})

function imgChange(obj1, obj2) {
	//获取点击的文本框
	var file = document.getElementById("file");
	//存放图片的父级元素
	var imgContainer = document.getElementsByClassName(obj1)[0];
	//获取的图片文件
	var fileList = file.files;
	//文本框的父级元素
	var input = document.getElementsByClassName(obj2)[0];
	var imgArr = [];
	//遍历获取到得图片文件
	for(var i = 0; i < fileList.length; i++) {
		var imgUrl = window.URL.createObjectURL(file.files[i]);
		imgArr.push(imgUrl);
		var img = document.createElement("img");
		img.setAttribute("src", imgArr[i]);
		var imgAdd = document.createElement("div");
		imgAdd.setAttribute("class", "z_addImg");
		imgAdd.appendChild(img);
		imgContainer.appendChild(imgAdd);
	};
	imgRemove();
};

function imgRemove() {
	var imgList = document.getElementsByClassName("z_addImg");
	var mask = document.getElementsByClassName("z_mask")[0];
	var cancel = document.getElementsByClassName("z_cancel")[0];
	var sure = document.getElementsByClassName("z_sure")[0];
	for(var j = 0; j < imgList.length; j++) {
		imgList[j].index = j;
		imgList[j].onclick = function() {
			var t = this;
			mask.style.display = "block";
			cancel.onclick = function() {
				mask.style.display = "none";
			};
			sure.onclick = function() {
				mask.style.display = "none";
				t.style.display = "none";
			};

		}
	};
};