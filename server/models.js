const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI = "mongodb+srv://goblin:<password>@cluster0.kpvr3.mongodb.net/MultiCommunicado?retryWrites=true&w=majority"


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'MultiCommunicado'
})
    .then(()=> console.log('Connected to Mongo DB'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const sentMessageSchema = new Schema({
    senderID: {type: String, required: true},
    senderLang: {type: String, required: true},
    recieverID: {type: String, required: true},
    recieverLang: {type: String, required: true},
    input: {type: String, required: true}
});
const SentMess = mongoose.model('sent_messages', sentMessageSchema);


const transMessageSchema = new Schema({
    senderID: {type: String, required: true},
    recieverID: {type: String, required: true},
    input: {type: String, required: true}
});
const TransMess = mongoose.model('trans_messages', transMessageSchema);

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  });
  
  const User = mongoose.model('User', userSchema);

  const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 30, default: Date.now }
  });
  
  const Session = mongoose.model('Session', sessionSchema);

model.exports = {
    SentMess,
    TransMess,
    User,
    Session
};




