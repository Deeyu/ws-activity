let sa_env = (window.location.origin == 'https://m.wsecar.com' || window.location.origin == 'https://carmobile.wsecar.com') ? 'production' : 'default';
(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
      return false;
  }
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset','UTF-8');
    w[n].para = para;
    y.parentNode.insertBefore(x, y);
  }
})({
  sdk_url: 'https://wsjc-web.oss-cn-shenzhen.aliyuncs.com/carMobile/html/js/sensorsdata.min.js',
  heatmap_url: 'https://wsjc-web.oss-cn-shenzhen.aliyuncs.com/carMobile/html/js/heatmap.min.js',
  name: 'sensors',
  server_url:'https://sensors-datasink.wsecar.com/sa?project=' + sa_env, // 数据接收地址
  show_log: sa_env == 'default',// 设置 true 后会在网页控制台打 logger，会显示发送的数据,设置 false 表示不显示。默认 true。
  heatmap:{
    clickmap:'not_collect',
    //是否开启触达注意力图，默认 not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启
    // scroll_notice_map:'default',
    scroll_notice_map:'not_collect',
  }
});
try {
  let { userId } = JSON.parse(localStorage.getItem('wsUser')) || {}
  let saCurrentLocation = localStorage.getItem("saCurrentLocation")
  let { city = '定位失败' }  = JSON.parse(saCurrentLocation || '{}')
  sensors.registerPage({
    platform_type: 'H5', // 平台类型
    app_name: '万顺叫车H5端', // 应用名称
    address: city,
    is_login: Boolean(userId), // 是否登录
  })
  // 设置用户属性
  // sensors.setOnceProfile({
  //   user_mode:'乘客',
  // })
} catch (error) {
  console.log(error);
}

sensors.quick('autoTrack');