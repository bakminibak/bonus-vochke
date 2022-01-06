import React from 'react'


export const LevelPoints = ({totalPoints, introText}) => {
    

    return (        
          <div className="intro-heading">
            <div className='intro-heading-totalbonus'>Trenutni Bonus: {totalPoints}</div>
          </div>   
    )
}
