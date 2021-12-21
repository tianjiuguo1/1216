/*
url  
data
dataType

*/
class axios {
  static get (param = {}) {
    // console.log(param);
    param.method = 'get'
    return axios.http(param)
  }
  static post (param = {}) {
    param.method = 'post'
    return axios.http(param)
  }
  static http (param) {
    // console.log(param);
    let { method, url, data, dataType = 'json' } = param;
    //1 判断url是否为空
    if (!url) {
      throw new Error('判断不能为空')
    }
    // 2 处理data
    let tmPparam = null;
    if (data) {
      // console.log(data);
      tmPparam = [];
      for (let attr in data) {
        // console.log(attr);
        // 以key=val的形式添加到数组中
        tmPparam.push(`${attr}=${data[attr]}`)

      }

      // 3 以&分割为字符串
      tmPparam = tmPparam.join('&');
      // console.log(tmPparam);
      // 4 get 请求则拼接参数到url上
      if (method == 'get') {
        url = url + '?' + tmPparam;
        tmPparam = null;
      }
    }
    return new Promise((resolve, reject) => {
      // ajax的实现
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send(tmPparam);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let res = xhr.response;
            if (dataType == 'json') {
              res = JSON.parse(res)

            }
            // 成功
            resolve(res)
          } else {
            reject(xhr.status)
          }
        }
      }
    })
  }
}
