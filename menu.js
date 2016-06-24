const request = require('request');
const schedule = require('node-schedule');
const jssdk = require('./app/libs/jssdk');

request.debug = true;

const menuItems = {
    "button":[
        {
            "type": "click",
            "name": "问答历史",
            "key": "conversation-history"
        },
        {
            "type": "view",
            "name": "随机问答",
            "url": "http://120.27.106.168/wechat/random"
        }
    ]
};

    doMenuSync();
// schedule.scheduleJob({ second: 0, minute: 0 }, function(){
//     console.log('about to sync menu items');
//     doMenuSync();
// });
//
// setInterval(function () {
//     console.log(new Date());
// }, 2000);

function doMenuSync () {
    jssdk.getAccessToken(function (err, token) {
        if (err || !token) {
            return console.error('获取 access_token 失败');
        }

        console.log({ token });

        request.get(`https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${token}`, function (e, response, body) {
            if (e) {
                return console.error('菜单删除失败', e);
            }

            console.log('菜单删除成功', body);

            request.post({ url: `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`, json: menuItems }, function (_e, _response, _body) {
                if (_e) {
                    return console.error('菜单创建失败', _e);
                }

                console.log('菜单创建成功', body);
            });
        });
    });
};

