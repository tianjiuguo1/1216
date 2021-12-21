const tableEle = document.querySelector('table')
const totalEle = document.querySelector('#totalPrice')
let stateAll = false

/* 显示购物车列表 */
function showCartList() {
    // 1. 从localstorage中获取购物车商品数据
    let cartListStr = localStorage.getItem('CARTLIST')
    let carts = JSON.parse(cartListStr)


    let str = `<tr>
            <td><input type="checkbox" class="checkbox-all" ${
              stateAll ? 'checked' : ''
            }></td>
            <td>序号</td>
            <th>商品图片</th>
            <th>商品信息</th>
            <th>单价</th>
            <th>数量</th>
            <th>总价</th>
            <th>操作</th>
        </tr>
        `
    carts.forEach((item, index) => {
        let itemStr = `
                <tr>
                    <td><input type="checkbox" class="checkbox-one" ${item.state ? 'checked' : ''}></td>
                    <td class="itemId">${item.id}</td>
                    <td><img src="${ item.image }" alt="shop03" width="50" height=""></td>
                    <td>${item.title}</td>
                    <td class="price">￥${item.price}</td>
                    <td class="y-inputnumber"><input type="button" class="minus" name="minus" value="-" ${item.num == 1 ? 'disabled' : ''} >
                    <input type="text" name="amount"  value="${item.num}"><input type="button" class="add" name="plus" value="+"></td>
                    <td class="singleprice" width="100px">￥${item.singlePrice}</td>
                    <td><a href="#">移入收藏</a><br><a class="delete-btn" href="#">删除</a></td>
                </tr>
            `
        str += itemStr
    })

    tableEle.innerHTML = str
}

/* 商品列表界面 */
function toProductList() {
    const productListBtn = document.querySelector('#product-list')
    productListBtn.onclick = function () {
        location.href = '../productList.html'
    }
}

showCartList()
toProductList()

class Cart {
    constructor() {
        /* 调用全选方法 */
        this.checkAll()

        // 给tbody绑定点击事件
        this._$('.commodityList tbody').addEventListener('click', this.clickBubbleFn.bind(this))
        //  console.log(this._$('.commodityList tbody'));
    }

    /**
     * @判断点击的节点
     * **/
    clickBubbleFn(e) {
        let tar = e.target
        //  console.log(tar);
        // 1 判断是否为check-one 
        tar.classList.contains('checkbox-one') && this.oneCheckFn(tar)
        // 2 判断点击的是否为加号按钮
        tar.classList.contains('add') && this.addClickFn(tar);
        // console.log(tar);
        // 3判断点击的是否为删除
        tar.classList.contains('delete-btn') && this.delClickFn(tar)

        // 4 判断点击的是否为减号按钮
        tar.classList.contains('minus') && this.minusFn(tar)
        
    }


    /**
     * @全选
     * **/
    checkAll() {
        //1 给全选按钮绑定事件
        let allEles = this.$$('.checkbox-all')
        //   console.log(allEles);
        // 2 给全选按钮绑定事件,事件回调函数的this指向节点对象,使用bind
        allEles[0].addEventListener('click', this.allClickFn.bind(this, 1))
        allEles[1].addEventListener('click', this.allClickFn.bind(this, 0))
    }
    // 使用bind和event时,bind传递的参数在前
    allClickFn(index, e) {
        //获取点击的全选按钮状态
        let status = e.target.checked
        // 设置另一个全选的状态
        this.$$('.checkbox-all')[index].checked = status
        this.oneChecked(status)

        // 统计数量和价格传递全选的状态
        this.subTotal(status)
    }

    /*****单个商品选中****/
    oneChecked(status) {
        this.$$('.checkbox-one').forEach(item => {
            item.checked = status
        })
    }
    /****商品单选框回调函数***/
    oneCheckFn(tar) {
        this.subTotal()
        if (!tar.checked) {
            this.$$('.checkbox-all')[0].checked = false
            this.$$('.checkbox-all')[1].checked = false
            return
        }
        /********判断选中的商品数量*******/
        let count = 0
        this.$$('.checkbox-one').forEach(item => {
            item.checked && count++
        })
        // 选中的数量,等于购物车商品数量,则全选选中
        if (count == this.$$('.checkbox-one').length) {
            this.$$('.checkbox-all')[0].checked = true
            this.$$('.checkbox-all')[1].checked = true
        }

    }


    /******统计价格和数量******/
    // 全选和单个商品的input框,都要调用
    subTotal(sta = true) {
        // 1 总价和数量的变量
        let totalNum = 0,
            totalPrice = 0;
        // 2 获取所有的节点,遍历找出选中的
        sta && this.$$('.checkbox-one').forEach(item => {
            if (item.checked) {
                // 3 找到tr
                let trEle = item.parentElement.parentElement
                // 4 获取小计和数量
                totalNum += (trEle.querySelector('input[name="amount"]').value - 0)
                totalPrice += ((trEle.querySelector('.singleprice').innerHTML).substring(1) - 0)
            }
        })

        // 5 放入页面中
        this._$('.selectedTotal').innerHTML = totalNum
        this._$('#totalPrice').innerHTML = `￥${totalPrice}`
    }
    /******增加数量******/
    addClickFn(tar) {
        // console.log(tar);
        // 1 获取数量,上一个兄弟节点
        let num = tar.previousElementSibling
        num.value = (num.value - 0) + 1
        if(num.value > 1){
          tar.previousElementSibling.previousElementSibling.disabled = false
        }
        // 2 获取小计
        let sub = tar.parentElement.nextElementSibling
        // console.log(sub);
        //获取单价
        let price = ((tar.parentElement.previousElementSibling.innerHTML).substring(1)) - 0
        // console.log(typeof price,price);
        sub.innerHTML = `￥${parseInt((num.value * price)*100) / 100}`
        // 3 当input是选中时,统计价格和数量
        let tr = tar.parentElement.parentElement
        tr.querySelector('.checkbox-one').checked && this.subTotal()

        // 4 修改local的值
        // console.log(tr.querySelector('.itemId').innerHTML, num.value);
        this.modifyLocal(tr.querySelector('.itemId').innerHTML, parseInt(num.value))
    }

    /******减数量******/
    minusFn(tar){
        // console.log(1);
        let num = tar.nextElementSibling
        // console.log(num);
        num.value = num.value - 1
        if(num.value == 1){
            tar.disabled = true
        }
        // 2 获取小计
        let sub = tar.parentElement.nextElementSibling
        //获取单价
        let price = ((tar.parentElement.previousElementSibling.innerHTML).substring(1)) - 0
        sub.innerHTML = `￥${parseInt((num.value * price)*100) / 100}`
        // 3 当input是选中时,统计价格和数量
        let tr = tar.parentElement.parentElement
        tr.querySelector('.checkbox-one').checked && this.subTotal()
        // 4 修改local的值
        // console.log(tr.querySelector('.itemId').innerHTML, num.value);
        this.modifyLocal(tr.querySelector('.itemId').innerHTML, parseInt(num.value))
    }

    /******修改数量,num为0则删除****/
    modifyLocal(id, num = 0) {
        // console.log(id,typeof num)
        // 1 取出local数据
        let cartListStr = JSON.parse(localStorage.getItem('CARTLIST'))
        // console.log(cartListStr);
        if (!cartListStr) return
        //  遍历数组 找对应数据 修改商品的数量 或删除
        if (num != 0) {
            cartListStr.forEach((item, index) => {
                // console.log(item);
                if (item.id == id) {
                    item.num = num
                    localStorage.setItem('CARTLIST', JSON.stringify(cartListStr))
                }
            })
        }
        // 删除localStorage对应数据
        if (num == 0) {
            let product = cartListStr.find(item => item.id == id)
            // console.log(product);
            cartListStr.splice(cartListStr.indexOf(product), 1)
            // console.log(cartListStr);
            localStorage.setItem('CARTLIST',JSON.stringify(cartListStr))
        }
    }

    /****删除商品****/
    delClickFn(tar) {
        // console.log(12);
        let that = this
        let tr = tar.parentElement.parentElement
        layer.open({
            title: '确认删除框',
            content: '确认要删除吗?',
            btn: ['取消', '确认'],
            btn2: function (index, layero) {
                //按钮【按钮二】的回调
                //return false 开启该代码可禁止点击该按钮关闭
                // console.log(target);
                // 删除当前商品节点
                // console.log(tr.querySelector('.itemId').innerHTML);
                that.modifyLocal(tr.querySelector('.itemId').innerHTML)
                tr.remove()

                // 处于选中状态,则重新计算总价格和数量
                tr.querySelector('.checkbox-one').checked && that.subTotal()
            }
        })


    }

    //获取节点方法
    _$(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }
}

new Cart