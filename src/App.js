import React,{ useState, useEffect} from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import logo from './logo.svg';
import './App.css';

import { Level } from './components/Level';
import { LevelMobile } from './components/LevelMobile';
import { LevelPoints } from './components/LevelPoints';
import { WelcomeDesk } from './components/WelcomeDesk';
import { IntroAnimation } from './components/IntroAnimationDesk/IntroAnimation';
import {EndScr} from './components/EndScr';
import {EndScrMobile} from './components/EndScrMobile';


import { WelcomeDeskMobile } from './components/WelcomeDesk_Mobile';
import { IntroAnimationMobile } from './components/introMobile/IntroAnimationMobile';


function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentlevel] = useState(-1); //default -1 - Welcome Scr
  const [numChestOpened, setNumChestOpened] = useState(0);
  // const [showInfoScr, setShowInfoScr] = useState(false);
  
  const orentation = isMobile;
  
    

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const levelPrizes = [
                        [500, -200, -50],
                        [100, 100, -500],
                        [-100, 2500, 500]];

  const getChestReward = (level) => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const animatePoints = (_points) => {
    let _toPoints = totalPoints + _points;
  }
  const updateTotalPoints = () => {
    let _points = Number(levelPrizes[currentLevel-1][numChestOpened]);
    
    setNumChestOpened(numChestOpened+1);
    //animatePoints(_points);
    setTotalPoints(totalPoints + _points);
  }
  const updateLevel = (level) => {
    setCurrentlevel(level);
  }
  const loadNextLevel = () => {
    setNumChestOpened(0);
    (currentLevel < 4) ? setCurrentlevel(currentLevel+1) : setCurrentlevel(-1);
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <MobileView className='mobile-view'>
          {currentLevel === -1 && <WelcomeDeskMobile updateLevel={updateLevel} /> }
          {currentLevel === 0 && <IntroAnimationMobile  updateLevel={updateLevel}  /> }        
          {currentLevel === 1 && <LevelMobile updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} handleNextLevel={() => { loadNextLevel()}} /> }
          {currentLevel === 2 && <LevelMobile updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel === 3 && <LevelMobile updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          {currentLevel > 3 && <EndScrMobile totalPoints={totalPoints} handleNextLevel={() => { loadNextLevel()}} />}               
        </MobileView>
        <BrowserView className='desktop-view'>
          {currentLevel === -1 && <WelcomeDesk updateLevel={updateLevel} /> }
          {currentLevel === 0 && <IntroAnimation  updateLevel={updateLevel}  /> }        
          {currentLevel === 1 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} handleNextLevel={() => { loadNextLevel()}} /> }
          {currentLevel === 2 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel === 3 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          {currentLevel > 3 && <EndScr totalPoints={totalPoints} handleNextLevel={() => { loadNextLevel()}} />} 
        </BrowserView>
      </main>
    </div>
  );
}

export default App;
