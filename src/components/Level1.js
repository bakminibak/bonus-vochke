import React, { useState } from 'react'
import Lottie from 'lottie-web';
import animation from '../animations/nivo1_bg.json';
import ChestClass from './kochezi/ChestClass';
//import { Chest } from './kochezi/Chest';


export const Level1 = ({totalPoints, handleNextLevel}) => {
    const animationContainer = React.createRef()
    const [isChestOpen, setIsChestOpen] = useState(false);

    React.useEffect(() => {
      console.log("useeffect level");
        const bgAnim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: animation
        });
        
        bgAnim.setSpeed(1);
        console.log(bgAnim);
      }, [])

      const handleBtnClick = (e) => {
        e.preventDefault();

        console.log("handleBtnClick");
        handleNextLevel();
      }
      const chestClicked = () => {
        console.log("setIsChestOpen:", isChestOpen);
        setIsChestOpen(true);
      }
    return (        
        <div className="level-animation-container" ref={animationContainer}>
          <div className='chests'>            
            <ChestClass key='1dsa' customClass="k1" bonusPoints="-100" onClickEl={() => { chestClicked()}} />
            <ChestClass key='1dsad' customClass="k2" bonusPoints="+1000" onClickEl={() => { chestClicked()}} />
            <ChestClass key='1dsac' customClass="k3" bonusPoints="-250" playAnimation={false} onClickEl={() => { chestClicked()}} />  
          </div>      
          {isChestOpen &&  <button className='button_next' onClick={handleBtnClick}>Next Level </button>} 
          
        </div>
    )
}
