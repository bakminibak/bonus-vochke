import React, { useState, useRef } from 'react'
import Lottie from 'lottie-web';
import animation1 from '../animations/nivo1_bg.json';
import animation2 from '../animations/nivo2_bg.json';
import animation3 from '../animations/nivo3_bg.json';
import ChestClass from './kochezi/ChestClass';
//import { Chest } from './kochezi/Chest';


export const Level = ({currentLevel, updatePoints , handleNextLevel, levelPrizes}) => {
    const animationContainer = React.createRef()
    const [isChestOpen, setIsChestOpen] = useState(false);
    const [numOfOpenedChest, setNumberOfOpenedChests] = useState(0)
    let  currentAnimation=null;

    //const updateLevelBG = () => {   
      console.log('updateLevelBG', currentLevel); 
      let audioUrl = './sfx/level_1/26951076_fishing-boat-at-sea_by_mattpear_preview.mp3';
      switch(currentLevel) {
        case 1:
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/26951076_fishing-boat-at-sea_by_mattpear_preview.mp3"
          break;
        case 2:
          currentAnimation = animation2;
          audioUrl = "./sfx/level_2/21406950_sea-waves-sound_by_as-mediagroup_preview.mp3"
          break;
        case 3:
          currentAnimation = animation3;
          audioUrl = "./sfx/level_3/34152785_jungle-sounds_by_promission_preview.mp3"
          break;       
        default:     
          currentAnimation = animation1;
          audioUrl = "./sfx/level_1/26951076_fishing-boat-at-sea_by_mattpear_preview.mp3"
      }
      
    //levelAudio.current = new Audio(audioUrl);
    
    const [levelAudio, setLevelAudio] = useState(new Audio(audioUrl));

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

        console.log("handleBtnClick", currentLevel);
        handleNextLevel();
      }
      const chestClicked = () => {
        const _points = Number(levelPrizes[currentLevel-1, numOfOpenedChest]);
        console.log("setIsChestOpen:", isChestOpen, _points);
        setNumberOfOpenedChests(numOfOpenedChest+1);
        setIsChestOpen(true);
        updatePoints(_points);
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
            <ChestClass key='1dsac' customClass="k3" bonusPoints={levelPrizes} numOpenedChest={numOfOpenedChest}  onClickEl={() => { chestClicked()}} />  
          </div>      
          {isChestOpen && currentLevel<4  &&  <button className='button_next' onClick={handleBtnClick}>Next Level </button>}           
        </div>
    )
}
