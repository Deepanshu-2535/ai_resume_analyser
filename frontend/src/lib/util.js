export function formatDate(date){
    return date.toLocaleDateString("en-US",{
        month : "short",
        day : "numeric",
        year : "numeric"
    })
}
export function badge(score){
    if(score>=85){
        return "Excellent";
    }
    else if(score>=60){
        return "Great";
    }
    else if(score>=45){
        return "Good";
    }
    else{
        return "Needs Improvement";
    }
}