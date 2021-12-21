//表单输入框
let userNameEle = document.querySelector('#registerName')
let passwordEle = document.querySelector('#password')
let password_rEle = document.querySelector('#password-r')
let emailEle = document.querySelector('#email')

//提示信息
let input_tipS = document.querySelectorAll('.input-tip')

//注册按钮
let registerBtn = document.querySelector('.register-btn')

//用户名非空验证
let checkNullUserName = () => {
    if (userNameEle.value == '') {
        input_tipS[0].innerHTML = '请设置用户名'
        return false
    } else {
        input_tipS[0].innerHTML = ''
        return true
    }
}

//密码非空验证
let checkNullPassword = () => {
    if (passwordEle.value == '') {
        input_tipS[1].innerHTML = '请设置密码'
        return false
    } else {
        input_tipS[1].innerHTML = ''
        return true
    }
}

//确认密码验证
let checkNullPassword_r = () => {
    if (password_rEle.value != passwordEle.value) {
        input_tipS[2].innerHTML = '您两次输入的密码不同，请重试'
    } else {
        input_tipS[2].innerHTML = ''
    }
}

//邮箱非空验证
let checkNullEmail = () => {
    if (emailEle.value == '') {
        input_tipS[3].innerHTML = '请设置邮箱'
        return false
    } else {
        input_tipS[3].innerHTML = ''
        return true
    }
}

//密码强度验证
let checkPassword = () => {
    //2.密码强度
    // 密码必须是大写字母开头,是字母和数字组合，至少8位
    let reg = /[A-Z][a-zA-Z0-9]{7,}/
    if (!reg.test(passwordEle.value)) {
        input_tipS[1].innerHTML = '密码必须是大写字母开头,是字母和数字组合，至少8位'
        return false
    } else {
        input_tipS[1].innerHTML = ''
        return true
    }
}

//5. 邮箱格式验证
const checkEmail = () => {
    /*
     规则: 有@符
                @左边至有一个字符, 字符是 _、大小写字母、数字
                @右边.com结束,.com前面至少有两个字符,字符是 _、大小写字母、数字
    */
    let emailReg = /[_a-zA-Z0-9]+@[_a-zA-Z0-9]{2,}\.com$/ //正则表达式
    if (!emailReg.test(emailEle.value)) {
        input_tipS[3].innerHTML = '邮箱格式不正确!'
        return false
    } else {
        input_tipS[3].innerHTML = ''
        return true
    }
}

//用户名
userNameEle.onblur = function () {
    checkNullUserName()
}

//密码
passwordEle.onblur = function () {
    let isCheckNullPassword = checkNullPassword()
    //非空验证没通过，不执行后面密码强度验证
    if (!isCheckNullPassword) {
        return
    }
    //调用密码强度验证
    checkPassword()
    //确认密码
    password_rEle.onblur = function () {
        checkNullPassword_r()
    }
}



//邮箱
emailEle.onblur = function () {
    let isCheckNullPassword = checkNullPassword()
    //非空验证没通过，不执行后面邮箱格式验证
    if (!isCheckNullPassword) {
        return
    }
    //调用邮箱非空验证
    checkNullEmail()
    //调用邮箱格式验证
    checkEmail()
}

let userInformation = {}
//注册
registerBtn.onclick = function () {
    //1.非空验证
    let isCheckNullUserName = checkNullUserName()
    let isCheckNullPassword = checkNullPassword()
    let isCheckNullEmail = checkNullEmail()
    if (!isCheckNullUserName || !isCheckNullPassword || !isCheckNullEmail) {
        return
    }

    //2.密码强度
    let isCheckPassword = checkPassword()
    let isCheckEmail = checkEmail()
    if (!isCheckPassword || !isCheckEmail) {
        return
    }

    //3本地存储
    let userInformation = localStorage.getItem('userInformation')
    console.log(userInformation);
    if (!userInformation) {
        let userInformation = {}
        userInformation[userNameEle.value] = [passwordEle.value, emailEle.value]
        localStorage.setItem('userInformation', JSON.stringify(userInformation))
    } else {
        userInformation = JSON.parse(userInformation)
        userInformation[userNameEle.value] = [passwordEle.value, emailEle.value]
        localStorage.setItem('userInformation', JSON.stringify(userInformation))
    }


    //4.注册成功
    alert('注册成功')
    window.location = '../login.html'

}