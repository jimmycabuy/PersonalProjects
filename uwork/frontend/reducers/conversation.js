export default function(conversationId = "", action){
    if (action.type === "addconversationId"){
        return action.conversationId;
    } else {
        return conversationId;
    }
}