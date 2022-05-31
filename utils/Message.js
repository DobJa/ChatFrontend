class Message {
    constructor(messid, user, text, image, mid) {
      this.messid = messid;
      this.user = user;
      this.text = text;
      this.image = image;
      this.mid = mid;
      this.timestamp = Math.floor(new Date().getTime()/1000.0)
    }
   }
export default Message;