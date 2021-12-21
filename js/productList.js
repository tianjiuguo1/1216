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

let seeMore = document.querySelector('.seeMore') //获取更多按钮

/**
 * @商品列表tab切换
 * **/
//获取元素
let tabLis = document.querySelectorAll('.productTltle li')
let choiceUls = document.querySelectorAll('.choice .choiceTemp')
//遍历绑定点击事件
for (let i = 0; i < tabLis.length; i++) {
    //     //给所有li设置自定义属性索引号
    tabLis[i].setAttribute('index', i)
    tabLis[i].onclick = function () {
        //         //模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
        //        // 干掉所有人 其余的li清除 class 这个类
        for (let i = 0; i < choiceUls.length; i++) {
            tabLis[i].classList.remove('current')
        }
        //        // 留下我自己
        this.className = 'current'
        //        // 2. 下面的显示内容模块
        let index = this.getAttribute('index')

        // console.log(index);
        //干掉所有人 让其余的item 这些div 隐藏
        for (let i = 0; i < choiceUls.length; i++) {
            choiceUls[i].style.display = 'none'
            choiceUls[i].setAttribute('newindex', index)
        }
        listOne.forEach(item=>{
            item.innerHTML = ''
        })
        choiceUls[index].style.display = 'block'
        seeMore.setAttribute('infoid', this.getAttribute('index'))
        loadMainData(parseInt(index))
    }
}

/* 
  进入首页
      调用首页接口获取数据
      渲染数据到响应区域
*/
/* 调用首页接口获取数据 */
function loadMainData(index = 0,pageNo) {
    index = index + 1
    if (index == '3') {
        index = 5
    }
    axios.get({
        url: `http://www.xiongmaoyouxuan.com/api/tab/${index}`,
        data: {
            start: pageNo * 20 //开始序号
        },
    }).then(result => {
        let productList = result.data.items.list
        // productList=productList.filter((item,index)=>{
        //     return index<8;
        // })
        showProductList(productList, index)
    })
}

let listOne = document.querySelectorAll('.choice ul')
// console.log(listOne);
/* 渲染商品列表效果 */
function showProductList(productList, index) {
    // console.log('传递',index);
    //1定义模板。在html页面中创建
    //2设置数据
    let data = {
        productList

    }
    let htmlStr = template('product-list-temp', data)
    //3渲染模板数据--html代码
    //4html代码设置给相应元素显示
    if (index == '1') listOne[0].innerHTML += htmlStr
    if (index == '2') listOne[1].innerHTML += htmlStr
    if (index == '5') listOne[2].innerHTML += htmlStr
    if (index == '4') listOne[3].innerHTML += htmlStr
    if (index == '5') listOne[4].innerHTML += htmlStr
    if (index == '6') listOne[5].innerHTML += htmlStr
}

/* 懒加载商品列表数据 专门的商品列表数据接口 上面的是主页接口 */
function loadProductList(pageNo, index) {
    ++index
    if (index == '3') {
        index = 5
    }
    axios.get({
        url: `http://www.xiongmaoyouxuan.com/api/tab/${index}/feeds`,
        data: {
            start: pageNo * 20 //开始序号
        }
    }).then(result => {
        let productList = result.data.list
        productList=productList.filter((item,index)=>{
            return index<8;
        })
        showProductList(productList, index)
    })
}

/* 加载更多 */
function loadMore() {
    let pageNo = 0
    /* 绑定加载更多事件 */
    seeMore.onclick = function () {
        let index = this.getAttribute('infoid')
        //1调用商品列表接口 获取商品列表数据
        loadProductList(++pageNo, index)
    }
}
loadMainData()
loadMore()


/* 商品详情 
   1.跳转到商品详情页
   2.点击商品的ID传入详情页
*/
function onProductDetail(id) {
    location.href = '../detail.html?id=' + id
}