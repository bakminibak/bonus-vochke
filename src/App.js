import React,{ useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import { Level } from './components/Level';
import { LevelPoints } from './components/LevelPoints';
import { WelcomeDesk } from './components/WelcomeDesk';
import { IntroAnimation } from './components/IntroAnimationDesk/IntroAnimation';
import {EndScr} from './components/EndScr';


import { WelcomeDeskMobile } from './components/WelcomeDesk_Mobile';
import { IntroAnimationMobile } from './components/introMobile/IntroAnimationMobile';

function useWindowSize() {
  //const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  const [deviceOrientation, setDeviceOrientation] = useState(0); /* 0/1 landscape/portrait */

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerHeight, window.innerWidth);
      //setSize([[window.innerHeight, window.innerWidth]])

      if (window.innerHeight > window.innerWidth) setDeviceOrientation(1)
      else setDeviceOrientation(0)
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])
  return deviceOrientation;
}

function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentlevel] = useState(-1); //default -1 - Welcome Scr
  const [numChestOpened, setNumChestOpened] = useState(0);
  // const [showInfoScr, setShowInfoScr] = useState(false);
  
  const orentation = useWindowSize();
  
    

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
        <div className='portrait'>
          { orentation && currentLevel === -1 && <WelcomeDeskMobile updateLevel={updateLevel} /> }
          { orentation && currentLevel === 0 && <IntroAnimationMobile  updateLevel={updateLevel}  /> }        
          { orentation && currentLevel === 1 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} handleNextLevel={() => { loadNextLevel()}} /> }
          { orentation && currentLevel === 2 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          { orentation && currentLevel === 3 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          { orentation && currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          { orentation && currentLevel > 3 && <EndScr totalPoints={totalPoints} handleNextLevel={() => { loadNextLevel()}} />}               
        </div>
        <div className='landscape'>
          { !orentation && currentLevel === -1 && <WelcomeDesk updateLevel={updateLevel} /> }
          { !orentation && currentLevel === 0 && <IntroAnimation  updateLevel={updateLevel}  /> }        
          { !orentation && currentLevel === 1 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} handleNextLevel={() => { loadNextLevel()}} /> }
          { !orentation && currentLevel === 2 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          { !orentation && currentLevel === 3 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
          { !orentation && currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          { !orentation && currentLevel > 3 && <EndScr totalPoints={totalPoints} handleNextLevel={() => { loadNextLevel()}} />} 
        </div>
      </main>
    </div>
  );
}

export default App;
