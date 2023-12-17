import versionUtil from './utils/version-util';
App({
  onLaunch() {
    wx.cloud.init({
      // env:'cloud1-4gcm0e4ob80a6fb5',//这里输入云开发id
      traceUser: true
    }),
    // 检查更新
    versionUtil.checkUpdate();
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录，文档参考：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // code	（string）	用户登录凭证（有效期五分钟）。开发者需要在【开发者服务器后台】调用 auth.code2Session，然后使用 code 换取 openid、unionid、session_key 等信息
        // 调用 wx.login() 获取 临时登录凭证code ，并回传到开发者服务器。
        // 调用 auth.code2Session 接口，换取 用户唯一标识 OpenID 、 用户在微信开放平台帐号下的唯一标识UnionID（若当前小程序已绑定到微信开放平台帐号） 和 会话密钥 session_key。
        console.log("------->",res)
        if (!res.code) {//去掉!!!!
          //发起网络请求，将res.code发送到后端服务器（使用云函数操作），然后才能返回openid等重要信息。
          wx.request({
            url: 'https://example.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
  })

    
  },
  globalData: {
    userInfo: null
  }
});
