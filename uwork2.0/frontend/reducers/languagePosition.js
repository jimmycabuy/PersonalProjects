export default function(positionLanguage = "", action){
    if (action.type === "addPositionLanguage"){
        return action.positionLanguage;
    } else {
        return positionLanguage;
    }
}