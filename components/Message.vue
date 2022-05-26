<template>
 <div>
   <div class="msg-wrapper">
     <div class="msg">
       <div class="msg__information">
         <!-- <span class="msg__name">{{ User }}</span>
         <span class="msg_ID">{{MessId}}</span>
         <span class="msg__date">{{ time }}</span> -->
       </div>
       <p class="msg__text"> [{{User}}] {{ text }} {{timestamp}}  {{MessID}}</p>
       <!-- <p class="msg__date">{{ timestamp }}</p>
       <p class="msg_ID">{{MessId}}</p>
       <p class="msg__name">{{ User }}</p> -->
     </div>
   </div>
 </div>
</template>

<script>
import Message from '../utils/Message'
export default {
 props: {
   MessId: String,
   User: String,
   timestamp: Number,
   text: String
 }
};
</script>