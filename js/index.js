//获取节点 
let myJdEle = document.querySelector('.myjd div') //我的京东二级导航
let purchaseEles = document.querySelector('.coll>ol') //企业采购二级导航
let customerService = document.querySelector('.cutt div') //客户服务二级导航
let WebsiteNavigation = document.querySelector('.online div') //网站导航二级导航
let userEle = document.querySelector('.user>div') //用户
let addressEle = document.querySelector('.db div') //地址二级导航
let fixedEle = document.querySelector('.fix1') //固定栏
let header = document.querySelector('header') //头部搜索区

let myJd = document.querySelector('.myjd') //我的京东
let purchase = document.querySelector('.coll') //企业采购
let address = document.querySelector('.db') //地址

let titles = document.querySelectorAll('.title')


myJdEle.style.display = 'none'
purchaseEles.style.display = 'none'
customerService.style.display = 'none'
WebsiteNavigation.style.display = 'none'
addressEle.style.display = 'none'
fixedEle.style.display = 'none'


//头部移入显示
header.addEventListener('mouseover', function (e) {
	let target = e.target
	// console.log(target);
	if (target == myJd) {
		myJdEle.style.display = 'block'
	}
	if (target == address) {
		addressEle.style.display = 'block'
	}

})

header.addEventListener('mouseout', function (e) {
	let target = e.target
	// console.log(target);
	if (target == myJd) {
		myJdEle.style.display = 'none'
	}
	if (target == address) {
		addressEle.style.display = 'none'
	}

})



//固定栏吸顶
window.onscroll = function () {
	if (document.documentElement.scrollTop >= 500) {
		fixedEle.style.display = 'block'
	} else {
		fixedEle.style.display = 'none'
	}
}



/**
 * @侧边栏二级菜单
 * **/
//title默认为none
function setTab() {
	titles.forEach(item => {
		item.style.display = 'none'
	})
}
setTab()
//获取对应的li
let bannerLis = document.querySelectorAll('.asd>li')
//遍历li绑定移入移出事件，移入时获取自定义属性值作为titles的下标，display为block
bannerLis.forEach(function (item) {
	item.onmouseover = function () {
		setTab()
		let index = this.getAttribute('data-index')
		titles[index].style.display = 'block'
	}
	item.onmouseout = function () {
		setTab()
	}

})

/**
 * 
 * @span小图标
 * **/
//获取所有span 设置背景属性
let spanEles = document.querySelectorAll('.information .one span')
for (let i = 0; i < spanEles.length; i++) {
	spanEles[i].style.background = `url("images/index/${i}.png") center center / 24px 24px`
}


/**
 * @轮播一
 * **/
function swiperOne() {
	var container = document.getElementById("swiper1");
	console.log(container);
	var list = document.getElementById("swiper1-list");
	var buttons = document.getElementById("swiper1-buttons").getElementsByTagName("li");
	// var desc = document.getElementById("desc");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	// 动画状态存放，防止在动画切换过程中时点击按钮还在切换，所以要保证动画切换完成了，才可以手动切换下一张
	var animated = false;
	var timer;

	// 显示小圆点
	// function showButton() {
	// 	for (var i = 0; i < buttons.length; i++) {
	// 		if (buttons[i].className == "on") {
	// 			buttons[i].className = "";
	// 			break;
	// 		}
	// 	}
	// 	buttons[index - 1].className = "on";
	// }

	// 切换图片
	function cutPage(offset) {
		animated = true;
		var newLeft = parseInt(list.style.left) + offset;

		// 平缓滑动切换的动画效果
		var time = 300; // 位移总时间
		var interval = 10; // 位移时间间隔
		var speed = offset / (time / interval); //每次位移量
		function go() {
			if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go, interval);
			} else {
				animated = false;

				list.style.left = newLeft + "px";
				// 无限滚动
				if (newLeft > -589) {
					list.style.left = -5890 + "px";
				}
				if (newLeft < -5890) {
					list.style.left = -589 + "px";
				}
			}
		}
		go();
	}

	// 切换文本
	/* function cutText() {
		var imgs = list.children;
		for (var i = 0; i < imgs.length; i++) {
			var alt = imgs[i].getAttribute("alt");
			if (alt == index) {
				var text = imgs[parseInt(alt)].getAttribute("title");
				desc.firstChild.nodeValue = text;
				break;
			}

		}
	} */

	// 箭头切换图片
	next.onclick = function () {
		console.log(111);
		if (index == 8) {
			index = 1;
		} else {
			index += 1;
		}
		// showButton();
		// cutText();
		if (!animated) {
			cutPage(-589);
		}
	}
	prev.onclick = function () {
		console.log(2222);
		if (index == 1) {
			index = 8;
		} else {
			index -= 1;
		}
		// showButton();
		// cutText();
		if (!animated) {
			cutPage(589);
		}
	}

	// 点击圆点切换图片
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function () {
			if (this.className == "on") {
				return;
			}
			var myindex = parseInt(this.getAttribute("index"));
			var offset = -589 * (myindex - index);
			cutPage(offset);
			index = myindex;
			// showButton();
		}
	}

	// 自动切换
	function play() {
		timer = setInterval(function () {
			next.onclick();
		}, 3000)
	}

	function stop() {
		clearInterval(timer);
	}

	container.onmouseout = play;
	container.onmouseover = stop;
	play();
}
swiperOne()