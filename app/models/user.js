var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    openid: { type: String, required: '`openid`是必填参数' },
    createdAt: { type: Date, required: '`createdAt`是必填参数' },
    conversationCount: { type: Number, default: 0 },
});

mongoose.model('User', UserSchema);

