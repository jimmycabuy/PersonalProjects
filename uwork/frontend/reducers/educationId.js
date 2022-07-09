export default function(educationId = "", action){
    if (action.type === "addEducationId"){
        return action.educationId;
    } else {
        return educationId;
    }
}