let myJdEle = document.querySelector('.myjd div') //我的京东二级导航
let purchaseEles = document.querySelector('.coll>ol') //企业采购二级导航
let customerService = document.querySelector('.cutt div') //客户服务二级导航
let WebsiteNavigation = document.querySelector('.online div') //网站导航二级导航
let userEle = document.querySelector('.user>div') //用户
let addressEle = document.querySelector('.db div') //地址二级导航
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
// userEle.style.display = 'none'

let loginUser = document.querySelector('.login-username')
console.log(loginUser);

/* tab切换 */
// 获取元素
var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var items = document.querySelectorAll('.item');
// for循环绑定点击事件
for (var i = 0; i < lis.length; i++) {
    // 开始给5个小li 设置索引号 
    lis[i].setAttribute('index', i);
    lis[i].onclick = function () {
        // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式

        // 干掉所有人 其余的li清除 class 这个类
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        // 留下我自己 
        this.className = 'current';
        // 2. 下面的显示内容模块
        var index = this.getAttribute('index');
        console.log(index);
        // 干掉所有人 让其余的item 这些div 隐藏
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
        }
        // 留下我自己 让对应的item 显示出来
        items[index].style.display = 'block';
    }
}

/* 获取商品ID */
function getProductId() {
    let url = location.href //获取带有ID的url地址 http://127.0.0.1:5500/src/pages/details.html?id=102251122
    let index = url.indexOf('?') //获取？的索引号 通过这个索引号操作得到后面的ID值
    //44
    let subUrl = url.substring(index + 1) //字符串截取 从？+1 开始截取到后面  返回一个字符串
    //details.js:6 id=102251122
    let id = subUrl.split('=')[1] //通过split "=分割" 得到一个新数组 再获取id值
    //102251122
    // console.log(id);
    return id
}


/* 商品详情数据 */
function loadProduct() {
    let id = getProductId()
    axios.get({
        url: 'http://www.xiongmaoyouxuan.com/api/detail',
        data: {
            id
        }
    }).then(result => {
        // console.log(result)
        if (result.code == 200) {
            let detail = result.data.detail
            showDetail(detail)
            let cmdDetails = detail.descContentList
            cmdDetail(cmdDetails)
            addCart(detail)
            showBox(detail)
        }
    })
}
/* 显示放大镜图片区域 */
function showBox(detail) {
    let showBoxImg = `
    <img src="${detail.image}"  alt="显示图片">
    `
    let imgDiv = document.createElement('div')
    imgDiv.innerHTML = showBoxImg
    let showBox = document.querySelector('.show-box')
    showBox.appendChild(imgDiv)

    let showRightImg = `
    <img src="${detail.image}"  alt="显示图片">
    `

    let imgDiv1 = document.createElement('div')
    imgDiv1.innerHTML = showRightImg
    let glr = document.querySelector('#glassone .right')

    glr.appendChild(imgDiv1)

    //获取放大镜小图
    let photo = detail.photo
    let num = 0
    let showBoxLiImg = photo.map(item => {
        return `
                <li class="active" data-index="${++num}"><img src="${item.url}" alt=""></li>

        `
    })
    let showBoxLiImgStr = showBoxLiImg.join('')
    let showSmall = document.querySelector('.show-small')
    showSmall.innerHTML = showBoxLiImgStr
    let glass1 = new GlassZoom('#glassone')
    glass1.moveGlass()
    glass1.onTabGlass()

}
let a = document.querySelector('#glassone')
class GlassZoom {
    constructor(id) {
        this.root = document.querySelector(id)
        // console.log(this.root);
        this.mask = this.root.querySelector('.mask') //遮罩层mask
        // console.log(this.mask);
        this.showBox = this.root.querySelector('.show-box') //显示图片showBox
        // console.log(this.showBox);
        this.bigGlass = this.root.querySelector('.right') //放大镜bigGlass
        // console.log(this.bigGlass);
        this.bigPicBox = this.root.querySelector('.right img') //背景图bigpicBox
        // console.log(this.bigPicBox);
        this.lisEle = this.root.querySelectorAll('ul>li') //获取所有tab切换小图
        // console.log(this.lisEle);
        this.showImg = this.root.querySelector('.show-box img') //显示图片
        // console.log(this.showImg);
    }
    setScale() {
        this.bigPicBox.style.width =
            (this.bigGlass.offsetWidth * this.showBox.offsetWidth) /
            this.mask.offsetWidth +
            'px'
        this.bigPicBox.style.height =
            (this.bigGlass.offsetHeight * this.showBox.offsetHeight) /
            this.mask.offsetHeight +
            'px'
    }

    /**
     * 放大镜功能
     */
    moveGlass() {
        //移入显示遮罩层
        this.showBox.onmouseover = () => {
            this.mask.style.display = 'block'
            this.bigGlass.style.display = 'block'
            this.setScale()

        }
        //移出隐藏遮罩层
        this.showBox.onmouseout = () => {
            this.mask.style.display = 'none'
            this.bigGlass.style.display = 'none'
        }
        //移动遮罩层
        this.showBox.onmousemove = (e) => {
            e = e || window.event //事件对象

            let x = e.offsetX - this.mask.offsetWidth / 2
            let y = e.offsetY - this.mask.offsetHeight / 2

            if (x < 0) x = 0
            if (x > this.showBox.offsetWidth - this.mask.offsetWidth)
                x = this.showBox.offsetWidth - this.mask.offsetWidth
            if (y < 0) y = 0
            if (y > this.showBox.offsetHeight - this.mask.offsetHeight)
                y = this.showBox.offsetHeight - this.mask.offsetHeight

            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'

            /**
             遮罩层移动距离        遮罩层
             ------------   =  ------------
             背景图片移动距离      放大镜
    
              背景图片移动距离 =  遮罩层移动距离*放大镜/遮罩层
           **/
            let moveX = (x * this.bigGlass.offsetWidth) / this.mask.offsetWidth
            let moveY = (y * this.bigGlass.offsetHeight) / this.mask.offsetHeight

            this.bigPicBox.style.left = -moveX + 'px'
            this.bigPicBox.style.top = -moveY + 'px'
        }
    }

    /**
     * 切换放大镜图片
     *  功能:  选中小图，显示图片和背景图片切换为小图对应图片
     *        1. 给小图片绑定事件
     *            1.1 循环遍历每个小图，设置事件
     *            1.2 事件委托，给它父元素设置事件
     *        2. 选中小图设置选中样式active
     *            设置之前先清掉所有小图选中样式active
     */
    onTabGlass() {
        let _this = this
        let id = getProductId()
        axios.get({
            url: 'http://www.xiongmaoyouxuan.com/api/detail',
            data: {
                id
            }
        }).then(result => {
            if (result.code == 200) {
                let content = result.data.detail.photo
                for (let i = 0; i < _this.lisEle.length; i++) {
                    _this.lisEle[i].onmouseover = function () {
                        //清掉所有小图选中样式
                        _this.onClear()
                        _this.lisEle[i].classList.add('active')
                        _this.showImg.setAttribute('src', `${content[i].url}`)
                        _this.bigPicBox.setAttribute('src', `${content[i].url}`)
                    }
                }
            }
        })



    }
    onClear() {
        for (let i = 0; i < this.lisEle.length; i++) {
            this.lisEle[i].classList.remove('active')
        }
    }


}




/* 商品渲染 */
function showDetail(detail) {
    let cmdpricestr = `
                    <h1>${detail.title}</h1>
                    <div class="cmd-price">
                        <p>${detail.tbOriginPrice}</p>
                        <div class="last-price">
                            <div><span>券后价</span>
                                <span class="price">￥${detail.price}</span>
                                <span class="coupon-info">${detail.couponValue}</span></div>
                            <span class="sale-num">${detail.saleNum}人已买</span>
                        </div>
                    </div>
    `
    let purchaseContent = document.querySelector('.purchaseContent')
    let placeAnOrder = document.querySelector('.placeAnOrder')
    let newDiv = document.createElement('div')
    newDiv.innerHTML = cmdpricestr
    purchaseContent.insertBefore(newDiv, placeAnOrder)

    /* 卖家店铺信息 */
    let shopinfo = `
    <div class="shop-info-content">
                    <span class="line"></span>
                    <span class="text">卖家信息</span>
                    <span class="line"></span>
                </div>
   <!-- 卖家店铺头像 -->
   <img src="${detail.shop.coverUrl}" alt="">
   <!-- 店铺名 -->
   <p>${detail.shop.title}</p>
   <!-- 店铺分数 -->
   <div class="shop-score">
       <ul class="character">
           <li>描述</li>
           <li>服务</li>
           <li>物流</li>
       </ul>
       <ul class="score">
           <li>${detail.shop.deliveryScore}</li>
           <li>${detail.shop.itemScore}</li>
           <li>${detail.shop.serviceScore}</li>
       </ul>
   </div>
   `
    let shop_info = document.querySelector('.shop-info')
    shop_info.innerHTML = shopinfo
}


/* 商品详情展示 */
function cmdDetail(cmdDetails) {
    let newcmdDetails = cmdDetails.map(item => {
        return `
        <img src="${item.photo.url}" alt="">
        `
    })
    let imgss = document.querySelector('.imgs')
    imgss.innerHTML = newcmdDetails


}

/* 点击加入购物车保存信息到本地存储 */
function addCart(detail) {
    let addToCartBtn = document.querySelector('.addToCart-btn')
    console.log(addToCartBtn);
    addToCartBtn.onclick = function () {
        console.log(11);
        let id = getProductId()
        //1. 构造添加到购物车的商品数据
        product = {
            id, //选中商品
            num: 1, //数量
            price: detail.price, //单价
            singlePrice: detail.price, //单个商品总价
            title: detail.title, //名称
            image: detail.image,
            state: false // 选中状态
        }
        //  2.1. 从localstorage取出商品数据,如果是第一次，没有返回 空数组
        let productStr = localStorage.getItem('CARTLIST')
        let carts = JSON.parse(productStr) || []
        // 3.遍历购物车商品数组， 判断添加的商品，在商品数组中是否已经存在，
        let newProduct = carts.find((item) => item.id == product.id)
        if (newProduct) {
            // 3.1如果已经存在，改变商品数量
            newProduct.num++
        } else {
            //3.2如果不存在，添加一项商品
            carts.push(product)
        }
        //  4. 已经添加数据的数组重新写回localstorage
        localStorage.setItem('CARTLIST', JSON.stringify(carts))

        
    }
}

loadProduct()