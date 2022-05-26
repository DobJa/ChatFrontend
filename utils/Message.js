class Message {
    constructor(messid, user, text) {
      this.messid = messid;
      this.user = user;
      this.text = text;
      this.timestamp = Math.floor(new Date().getTime()/1000.0)
    }
   }
export default Message;