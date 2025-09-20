import React from 'react'

const Badge = ({score}) => {
    let badgeColor;
    let badgeText;
    if(score>=85){
        badgeColor = 'badge-success';
        badgeText = 'Excellent'
    }
    else if(score>=60){
        badgeColor = 'badge-accent';
        badgeText = 'Great';
    }
    else if(score>=45){
        badgeColor = 'badge-warning';
        badgeText = 'Good';
    }
    else{
        badgeColor = 'badge-error';
        badgeText = 'Needs Improvement'
    }
  return (
    <span className={`badge badge-soft ${badgeColor}`} >
        {badgeText}
    </span>
  )
}

export default Badge;