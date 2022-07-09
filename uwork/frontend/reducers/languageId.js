export default function(languageId = "", action){
    if (action.type === "addLanguageId"){
        return action.languageId;
    } else {
        return languageId;
    }
}