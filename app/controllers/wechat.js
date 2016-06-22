const express = require('express');
const mongoose = require('mongoose');
const wechat = require('wechat');
const Article = mongoose.model('Article');

const router = express.Router();
const jssdk = require('../libs/jssdk');

module.exports = function (app) {
    app.use('/wechat', router);
};

router.get('/hello', function (req, res, next) {
    jssdk.getSignPackage(`http://120.27.106.168${req.url}`, function (err, signPackage) {
        if (err) {
            return next(err);
        }

        // Jade Template
        res.render('index', {
            title: 'Hello Wechat from Aliyun ECS --> Express',
            signPackage: signPackage,
            pretty: true,
        });
    });
});

const config = {
    token: 'f9ZDwSilaZxjdGx0TQ4u',
    appid: 'wx3866dd6ba4392c5d',
};

const handleWechatRequest = wechat(config, function (req, res, next) {
    const message = req.weixin;
    console.log(message, req.query);

    res.reply('hello');
});

router.get('/conversation', handleWechatRequest);
router.post('/conversation', handleWechatRequest);

