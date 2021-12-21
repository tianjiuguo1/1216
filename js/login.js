/* 从本地存储获取用户信息 */
let userinformationSTR = localStorage.getItem('userInformation')
let user = JSON.parse(userinformationSTR)
// console.log(user)

/* 获取节点 */
let usernameInput = document.querySelector('#loginName')
let passwordInput = document.querySelector('#password')
let tipsEles = document.querySelectorAll('.clear-btn')
let loginEle = document.querySelector('.login-btn')


/* 用户名非空验证 */
let checkNullUserName = () => {
    if (usernameInput.value == '') {
        tipsEles[0].innerHTML = '请输入用户名'
        return false
    } else {
        tipsEles[0].innerHTML = ''
        return true
    }
}

//密码非空验证
let checkNullPassword = () => {
    if (passwordInput.value == '') {
        tipsEles[1].innerHTML = '请输入密码'
        return false
    } else {
        tipsEles[1].innerHTML = ''
        return true
    }
}

//用户名
usernameInput.onblur = function () {
    checkNullUserName()
    tipsEles.forEach(function (item) {
        item.innerHTML =''           
    })
}

//密码
passwordInput.onblur = function () {
    checkNullPassword()
    tipsEles.forEach(function (item) {
        item.innerHTML =''           
    })

}

 

/* 登录验证 */
loginEle.onclick = function () {
    let isOk = false
    let isRes = false
    // 非空验证 只要二者有其一为空 那么就不执行后面的代码 只提示输入信息
    // let isCheckNullUserName = checkNullUserName()
    // let isCheckNullPassword = checkNullPassword()
    // if (!isCheckNullUserName || !isCheckNullPassword) {
    //     return
    // }
    let userInformation = JSON.parse(localStorage.getItem('userInformation'))
    
    for (const key in userInformation) {
        if (usernameInput.value == key) {
            isRes = true
            if(passwordInput.value == userInformation[key][0]){
                isOk = true
            }
        }
    }

    if(isOk){
        alert('登录成功')
        localStorage.setItem('newName',usernameInput.value)
        window.location.href = './productList.html'
        
    }
    if(!isRes){
        tipsEles[0].innerHTML = '该用户名未注册'
    }
    if(!isOk){
        tipsEles.forEach(function (item) {
            item.innerHTML = '账号或密码错误'         
        })
    }



}

