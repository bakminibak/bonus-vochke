import React, { useState } from 'react'
import Lottie from 'lottie-web';
import animation1 from '../animations/nivo1_bg.json';
import animation2 from '../animations/nivo2_bg.json';
import animation3 from '../animations/nivo3_bg.json';
import ChestClass from './kochezi/ChestClass';
//import { Chest } from './kochezi/Chest';


export const Level = ({currentLevel, totalPoints, handleNextLevel, levelPrizes}) => {
    const animationContainer = React.createRef()
    const [isChestOpen, setIsChestOpen] = useState(false);
    const [numOfOpenedChest, setNumberOfOpenedChests] = useState(0)
    let  currentAnimation=null;

    //const updateLevelBG = () => {   
      console.log('updateLevelBG', currentLevel);   
      switch(currentLevel) {
        case 1:
          currentAnimation = animation1;
          break;
        case 2:
          currentAnimation = animation2;
          break;
        case 3:
          currentAnimation = animation3;
          break;       
        default:     
          currentAnimation = animation1;
      }
      //return myAnimationData
    //}
    
    const [ myAnimationData, setMyAnimationData ]= useState(currentAnimation);

    console.log('levelPrizes:', levelPrizes );

    React.useEffect(() => {
      //const anim = updateLevelBG();
      console.log("useeffect level");
        const bgAnim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: myAnimationData
        });
        
        bgAnim.setSpeed(1);
        console.log(bgAnim);
      }, [])


      const handleBtnClick = (e) => {
        e.preventDefault();

        console.log("handleBtnClick", currentLevel);
        handleNextLevel();
      }
      const chestClicked = () => {
        console.log("setIsChestOpen:", isChestOpen);
        setNumberOfOpenedChests(numOfOpenedChest+1);
        setIsChestOpen(true);
        console.log("numOfOpenedChest: ", numOfOpenedChest);
      }
      const getNumberOfOpenedChest = () => {
        return 
      }
    return (        
        <div className="level-animation-container" ref={animationContainer}>
          <div className='chests'>            
            <ChestClass key='1dsa' customClass="k1" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest} onClickEl={() => { chestClicked()}} />
            <ChestClass key='1dsad' customClass="k2" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  onClickEl={() => { chestClicked()}} />
            <ChestClass key='1dsac' customClass="k3" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  playAnimation={false} onClickEl={() => { chestClicked()}} />  
          </div>      
          {isChestOpen &&  <button className='button_next' onClick={handleBtnClick}>Next Level </button>}           
        </div>
    )
}
