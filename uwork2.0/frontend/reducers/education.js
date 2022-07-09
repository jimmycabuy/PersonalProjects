export default function(positionEducation = "", action){
    if (action.type === "addPositionEducation"){
        return action.positionEducation;
    } else {
        return positionEducation;
    }
}