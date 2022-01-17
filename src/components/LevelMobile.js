import React, { useState, useRef } from 'react'
import Lottie from 'lottie-web';
import animation1 from '../animations/nivo1_bg.json';
import animation2 from '../animations/nivo2_bg.json';
import animation3 from '../animations/nivo3_bg.json';
import ChestClass from './kochezi/ChestClass';
//import { Chest } from './kochezi/Chest';


export const LevelMobile = ({currentLevel, updatePoints , handleNextLevel, levelPrizes}) => {
    const animationContainer = React.createRef()
    const [isChestOpen, setIsChestOpen] = useState(false);
    const [numOfOpenedChest, setNumberOfOpenedChests] = useState(0)
    let  currentAnimation=null;

    //const updateLevelBG = () => {   
      console.log('updateLevelBG', currentLevel); 
      let audioUrl = './sfx/level_1/Fishing_Boat_at_Sea.mp3';

      switch(currentLevel) {
        case 1:
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/Fishing_Boat_at_Sea.mp3"
          break;
        case 2:
          currentAnimation = animation2;
          audioUrl = "./sfx/level_2/main.mp3"
          break;
        case 3:
          currentAnimation = animation3;
          audioUrl = "./sfx/level_3/Jungle-Sounds.mp3"
          break;       
        default:     
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/Fishing_Boat_at_Sea.mp3"
      }
      
    //levelAudio.current = new Audio(audioUrl);
    
    const [levelAudio, setLevelAudio] = useState(new Audio(audioUrl));
    const [nextAudio, setNextAudio] = useState(new Audio("./sfx/nextLevel/Positive Game Win.mp3"));
    const [ myAnimationData, setMyAnimationData ]= useState(currentAnimation);

    console.log('levelPrizes:', levelPrizes );

    React.useEffect(() => {
      //const anim = updateLevelBG();
      console.log("useeffect level");
        const bgAnim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: myAnimationData
        });
        
        // bgAnim.setSpeed(1);
        // console.log(bgAnim);
        levelAudio.loop = true;
        levelAudio.play();

        return () => { // --> componentWillUnmount
          levelAudio.pause();
          //levelAudio.release();
          console.log('componentWillUnmount');
          //levelAudio.stop();
          //levelAudio.release();
        };
      }, [])


      const handleBtnClick = (e) => {
        e.preventDefault();
        nextAudio.play();
        handleNextLevel();
      }
      const chestClicked = () => {
        const _points = Number(levelPrizes[currentLevel-1][numOfOpenedChest]);
        setNumberOfOpenedChests(numOfOpenedChest+1);
        setIsChestOpen(true);
        updatePoints(_points);
      }
      const getNumberOfOpenedChest = () => {
        return 
      }
    return (        
        <div className="level-animation-container" ref={animationContainer}>
          <div className='chests'>            
            <div className='chests-container'>
              <ChestClass key='1dsa' customClass="k1" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest} onClickEl={() => { chestClicked()}} />
              <ChestClass key='1dsad' customClass="k2" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  onClickEl={() => { chestClicked()}} />
              <ChestClass key='1dsac' customClass="k3" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  onClickEl={() => { chestClicked()}} />  
            </div>
          </div>      
          {isChestOpen && currentLevel<3  &&  <button className='btn button_next' onClick={handleBtnClick}><img src="./images/btns/sledeci_nivo.png" /> </button>}           
          {isChestOpen && currentLevel === 3  &&  <button className='btn button_getbonus' onClick={handleBtnClick}><img src="./images/btns/PREBACI_BONUS.png" /> </button>}           
        </div>
    )
}
