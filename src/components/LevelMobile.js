import React, { useState, useRef } from 'react'
import Lottie from 'lottie-web';
import animation1 from '../mobile-animations/level1.json';
import animation2 from '../mobile-animations/level2.json';
import animation3 from '../mobile-animations/level3.json';
import aniamtionBtn from '../animations/zavrsi_igru.json';
import aniamtionBtnNext from '../animations/sledeci_nivo.json';
import ChestClass from './kochezi/ChestClass';
//import { Chest } from './kochezi/Chest';


export const LevelMobile = ({currentSession, bonusMasterOpen, bonusMasterTransfer, currentLevel, updatePoints , handleNextLevel, levelPrizes, isLoading}) => {
    const animationContainer = React.createRef();
    const endGame_btn = React.createRef();
    const nextLevel_btn = React.createRef();
    const [isChestOpen, setIsChestOpen] = useState(false);
    const [numOfOpenedChest, setNumberOfOpenedChests] = useState(0);
    const [bonusPoints1, setBonusPoints1] = useState(null);
    const [bonusPoints2, setBonusPoints2] = useState(null);
    const [bonusPoints3, setBonusPoints3] = useState(null);
    const [openedChests, setOpenedChests] = useState(0);
    const [playChestAnimation, setPlayChestAnimation] = useState(false);
    let  currentAnimation=null;

    //const updateLevelBG = () => {   
      let audioUrl = './sfx/level_1/Fishing_Boat_at_Sea_v4.mp3';

      switch(currentLevel) {
        case 1:
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/Fishing_Boat_at_Sea_v4.mp3"
          break;
        case 2:
          currentAnimation = animation2;
          audioUrl = "./sfx/level_2/sea-waves v4.mp3"
          break;
        case 3:
          currentAnimation = animation3;
          audioUrl = "./sfx/level_3/Jungle Sounds v4.mp3"
          break;       
        default:     
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/Fishing_Boat_at_Sea_v4.mp3"
      }
      
    //levelAudio.current = new Audio(audioUrl);
    
    const [levelAudio, setLevelAudio] = useState(new Audio(audioUrl));
    const [nextAudio, setNextAudio] = useState(new Audio("./sfx/nextLevel/Positive Game Win v2.mp3"));
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

        if (currentSession.gameState !== null && currentSession.gameState.opened.length > 0) {
          // const chestsOpenedPerLevel = 3 - currentSession.gameState.opened.length / currentLevel;
          const chestsOpenedPerLevel = 3 - ((currentLevel * 3) - currentSession.gameState.opened.length);
          if (chestsOpenedPerLevel > 0) {
            for (let i=1; i < chestsOpenedPerLevel+1; i++) {
              console.log("openedChests", (currentLevel-1) * 3 + i - 1);
              switch (i) {
                case 1:
                  setBonusPoints1(currentSession.gameState.opened[(currentLevel-1) * 3 + i - 1]);
                  break;
                case 2:
                  setBonusPoints2(currentSession.gameState.opened[(currentLevel-1) * 3 + i - 1]);
                  break;
                case 3:
                  setBonusPoints3(currentSession.gameState.opened[(currentLevel-1) * 3 + i - 1]);
                  break;
                default:
              }
              setOpenedChests(chestsOpenedPerLevel);
            }
          }
        }

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


      React.useEffect(() => {
        const endGameAnimbtn = Lottie.loadAnimation({
          container: endGame_btn.current,
          animationData: aniamtionBtn,
          loop: true
        });
      }, [isChestOpen])

      React.useEffect(() => {
        const nextBtn = Lottie.loadAnimation({
          container: nextLevel_btn.current,
          animationData: aniamtionBtnNext,
          loop: true
        });
      }, [isChestOpen])

      React.useEffect(() => {          
        isLoading(false);
      });
      
      const handleBtnClick = (e) => {
        e.preventDefault();
        nextAudio.play();
        if (currentLevel === 3) {
          bonusMasterTransfer();
        }
        handleNextLevel();
        
        
      }
      const chestClicked = async (chestID) => {
        try {
          const sessionData = await bonusMasterOpen({
            session: currentSession.id,
            level: currentLevel,
          });
          const _points = (typeof(sessionData) == 'object') ? Number(sessionData.gameState.points) : 0;
          //console.log("sessionData:",sessionData);
          // updatePoints(_points, _totalPoints);
          //console.log("updatedPoints:" ,_points);
          //setPlayChestAnimation(true);
          let _numOfOpenedChest = numOfOpenedChest;
          switch (chestID) {
            case "k1":
              setBonusPoints1(_points);
              break;
            case "k2":
              setBonusPoints2(_points);
              break;
            case "k3":
              setBonusPoints3(_points);
              break;
            default:
          }

          
          setOpenedChests(openedChests+1);
          
          return sessionData;
        } catch (e) {
          console.log(e);
        }
      }
      const getNumberOfOpenedChest = () => {
        return 
      }
    return (        
        <div className="level-animation-container" ref={animationContainer}>
          <div className='chests'>            
            <div className='chests-container'>
              <ChestClass key='1dsa'  playChest={playChestAnimation} customClass="k1" bonusPoints={bonusPoints1} onClickEl={ (e) => { chestClicked(e)}} />
              <ChestClass key='1dsad' playChest={playChestAnimation} customClass="k2" bonusPoints={bonusPoints2}  onClickEl={ (e) => { chestClicked(e)}} />
              <ChestClass key='1dsac' playChest={playChestAnimation} customClass="k3" bonusPoints={bonusPoints3}  onClickEl={ (e) => { chestClicked(e)}} />  
            </div>
          </div>
          {isChestOpen && currentLevel < 3  &&  <button className='btn button_next' onClick={handleBtnClick} ><div className='next_btn' ref={nextLevel_btn}></div></button>}           
          {isChestOpen && currentLevel === 3  &&  <button className='btn button_getbonus_container' onClick={handleBtnClick} ref={endGame_btn} ></button>}           
        </div>
    )
}
