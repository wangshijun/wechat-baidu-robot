var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConversationSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: '`user`是必填字段' },
    question: { type: String, required: '`question`是必填参数' },
    answer: { type: String, default: '' },
    createdAt: { type: Date, required: '`createdAt`是必填参数' },
});

mongoose.model('Conversation', ConversationSchema);


