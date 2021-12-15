class Goods {
  constructor() {
    // 获取节点
    this.cont = document.querySelector('#cont')
    // 调用方法
    this.getGoods();

  }
  async getGoods () {
    // 发送请求,回去json数据
    let data = await axios.get({ url: './js/goods.json', data: '' });
    // console.log(data);

    // 遍历追加到页面中
    let html = '';
    data.forEach(goods => {
      html += `<div class="box"><img src="${goods.src}" alt=""><p>${goods.name}</p><span class="goods_item_price" data-price-id="100004222715" style="">¥${goods.price}</span><a href="#none" id="InitCartUrl" class="btn-special1 btn-lg" onclick="Goods.addCart(${goods.id},1)">加入购物车</a></div>`;
    });

    // console.log(html);
    this.cont.innerHTML = html;
  }
  // 加入购物车的方法
  static addCart (id, num) {
    // console.log(id, num);
    // 1 取出local中的值
    let cartGoods = localStorage.getItem('cart');
    // 2 判断是否有值
    if (cartGoods) { // 3-1 有值
      // 3-2 解析数据
      cartGoods = JSON.parse(cartGoods);
      // 3-3 判断商品是否购买,当前添加的id,是否已经存在于购物车中
      for (let attr in cartGoods) { // attr 表示商品id
        // console.log(cartGoods, attr);
        // if (attr == id) {
        // 3-4 存在则修改数量
        attr == id && (num = num + cartGoods[attr]);
        // }

      }
      // console.log(id, num);
      // 3-5 存在则修改数量,不存在则添加
      cartGoods[id] = num;
      localStorage.setItem('cart', JSON.stringify(cartGoods))
    } else { // 4-1 没有数据
      // cartGoods = { goodsId: id, goodsNum: num };
      // [{},{},{}]
      // localStorage.setItem('cart', JSON.stringify([cartGoods]))

      // 4-2 以id为key,数量为val
      cartGoods = { [id]: num };
      localStorage.setItem('cart', JSON.stringify(cartGoods))
    }

  }
}

new Goods;