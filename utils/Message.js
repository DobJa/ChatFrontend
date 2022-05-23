class Message {
    constructor(MessId, UserId, text) {
      this.MessId = MessId;
      this.UserId = UserId;
      this.text = text;
      this.timestamp = Math.floor(new Date().getTime()/1000.0)
    }
   }
export default Message;