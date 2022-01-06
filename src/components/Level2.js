import React from 'react'
import Lottie from 'lottie-web';
import animation from '../animations/nivo2_bg.json';
import { Chest } from './kochezi/Chest';
import { LevelPoints } from './LevelPoints';


export const Level2 = ({totalPoints}) => {
    const animationContainer = React.createRef()

    React.useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: animation
        });
        
        anim.setSpeed(1);
        console.log(anim);
      }, [])

      const handleBtnClick = () => {
        console.log("handleBtnClick");
      }

    return (        
        <div className="level-animation-container" ref={animationContainer}>
          <div className="intro-heading">
            <div className='intro-heading-totalbonus'>Trenutni Bonus: {totalPoints}</div>
            <div className='intro-heading-title'>U kom kovčegu se krije dobitni bonus?</div>
            <div className='intro-heading-logo'><img src='./logo192.png' /></div>
          </div>   
          <div className='chests'>            
            <Chest customClass="k1" bonusPoints="-100" />
            <Chest customClass="k2" bonusPoints="+1000" />
            <Chest customClass="k3" bonusPoints="-250" />  
          </div>       
          <button className='button_next'  onClick={handleBtnClick}>Next Level </button>
          
        </div>
    )
}
