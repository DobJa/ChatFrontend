class Message {
    constructor(MessId, User, text) {
      this.MessId = MessId;
      this.User = User;
      this.text = text;
      this.timestamp = Math.floor(new Date().getTime()/1000.0)
    }
   }
export default Message;