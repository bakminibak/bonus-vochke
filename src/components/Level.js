import React, { useState, useRef } from 'react'
import Lottie from 'lottie-web';
import animation1 from '../animations/nivo1_bg.json';
import animation2 from '../animations/nivo2_bg.json';
import animation3 from '../animations/nivo3_bg.json';
import ChestClass from './kochezi/ChestClass';
//import { Chest } from './kochezi/Chest';


export const Level = ({currentSession, bonusMasterOpen, bonusMasterTransfer, currentLevel, updatePoints , handleNextLevel, levelPrizes}) => {
    const animationContainer = React.createRef()
    const [isChestOpen, setIsChestOpen] = useState(false);
    const [numOfOpenedChest, setNumberOfOpenedChests] = useState(0);
    const [bonusPoints, setBonusPoints] = useState(0);
    const [openedChests, setOpenedChests] = useState(0);
    let  currentAnimation=null;

    //const updateLevelBG = () => {   
      console.log('updateLevelBG', currentLevel); 
      let audioUrl = './sfx/level_1/Fishing_Boat_at_Sea_128.mp3';

      switch(currentLevel) {
        case 1:
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/Fishing_Boat_at_Sea_128.mp3"
          break;
        case 2:
          currentAnimation = animation2;
          audioUrl = "./sfx/level_2/sea-waves_128.mp3"
          break;
        case 3:
          currentAnimation = animation3;
          audioUrl = "./sfx/level_3/Jungle_Sounds_128.mp3"
          break;       
        default:     
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/Fishing_Boat_at_Sea_128.mp3"
      }
      
    //levelAudio.current = new Audio(audioUrl);
    
    const [levelAudio, setLevelAudio] = useState(new Audio(audioUrl));
    const [nextAudio, setNextAudio] = useState(new Audio("./sfx/nextLevel/Positive Game Win.mp3"));
    const [ myAnimationData, setMyAnimationData ]= useState(currentAnimation);

    // console.log('levelPrizes:', levelPrizes );

    React.useEffect(() => {
      //const anim = updateLevelBG();
      // console.log("useeffect level");
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
          // console.log('componentWillUnmount');
          //levelAudio.stop();
          //levelAudio.release();
        };
      }, [])

      React.useEffect(() => {
        if (openedChests > 0) {
          setNumberOfOpenedChests(numOfOpenedChest+1);
          setIsChestOpen(true);
        }
      }, [openedChests])

      const handleBtnClick = (e) => {
        e.preventDefault();
        nextAudio.play();
        handleNextLevel();
      }
      const chestClicked = async () => {
        try {
          const sessionData = await bonusMasterOpen({
            session: currentSession.id,
            level: currentLevel,
          });
          const _points = (typeof(sessionData) == 'object') ? Number(sessionData.gameState.points) : 0;
          console.log("sessionData:",sessionData);
          // updatePoints(_points, _totalPoints);
          console.log("updatedPoints:",_points);
          setBonusPoints(_points);
          setOpenedChests(openedChests+1);

          return sessionData;
        } catch (e) {
          console.log(e);
        }
      }
      // const transferBonus = async () => {
      //   console.log('transferBonus activated')
      //   nextAudio.play();
      //   try {
      //     const sessionData = await bonusMasterTransfer({
      //       session: currentSession.id,
      //     });
      //     console.log("sessionData:",sessionData);
      //     handleNextLevel();
      //     return sessionData;
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
      const getNumberOfOpenedChest = () => {
        return 
      }
    return (        
        <div className="level-animation-container" ref={animationContainer}>
          <div className='chests'>            
            <div className='chests-container'>
              <ChestClass key='1dsa' customClass="k1" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest} onClickEl={async () => { chestClicked()}} />
              <ChestClass key='1dsad' customClass="k2" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  onClickEl={async () => { chestClicked()}} />
              <ChestClass key='1dsac' customClass="k3" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  onClickEl={async () => { chestClicked()}} />  
            </div>
          </div>
          {isChestOpen && currentLevel<3  &&  <button className='btn button_next' onClick={handleBtnClick}><img src="./images/btns/sledeci_nivo.png" /> </button>}           
          {isChestOpen && currentLevel === 3  &&  <button className='btn button_getbonus' onClick={handleBtnClick}><img src="./images/btns/PREBACI_BONUS.png" /> </button>}           
        </div>
    )
}
