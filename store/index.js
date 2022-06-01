export const state = () => ({
    messages: []
   })
   
   export const mutations = {
    newMessage(state, msg) {
      state.messages = [...state.messages, msg];
    },
    clearData(state) {
      state.messages = [];
    },
    MessusDeletus(state, id){
      const index = state.messages.findIndex(object => {
        return object.mid === id;
      });
      state.messages[index].text = "<this message has been deleted>";
      state.messages[index].image = null;

    }
   }