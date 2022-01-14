import React,{ useState} from 'react';
import logo from './logo.svg';
import './App.css';

//import { Level1 } from './components/Level1';
//import { Level2 } from './components/Level2';
//import { Level3 } from './components/Level3';
import { Level } from './components/Level';
import { LevelPoints } from './components/LevelPoints';
import { WelcomeDesk } from './components/WelcomeDesk';
import { IntroAnimation } from './components/IntroAnimationDesk/IntroAnimation';
import {EndScr} from './components/EndScr';

function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentlevel] = useState(-1); //default -1
  const [numChestOpened, setNumChestOpened] = useState(0);
  const [showInfoScr, setShowInfoScr] = useState(false);

  const levelPrizes = [
                        [500, -200, -50],
                        [100, 100, -500],
                        [-100, 2500, 500]];
  


  const introLevelChecked = () => {
    console.log("introLevelChecked");
  }

  const chestOpened = (chestClicked) => {
    console.log("Chest Opened!", numChestOpened, chestClicked);

  }
  const animatePoints = (_points) => {
    let _toPoints = totalPoints + _points;
  }
  const updateTotalPoints = () => {
    let _points = Number(levelPrizes[currentLevel-1][numChestOpened]);
    
    setNumChestOpened(numChestOpened+1);
    animatePoints(_points);
    setTotalPoints(totalPoints + _points);
    
    
    console.log("updateTotalPoints: ", _points, totalPoints);
  }
  const updateLevel = (level) => {
    console.log("updateLevel");
    setCurrentlevel(level);
  }

  const chestClicked = () => {
    console.log("setIsChestOpen:");
    
    setNumChestOpened(numChestOpened+1);
    //setIsChestOpen(true);
  }
  const handleClick = () => {
    console.log('app');
    loadNextLevel();
  }
  const loadNextLevel = () => {
    console.log("loadNesxtLEvel: ", currentLevel);    
    setNumChestOpened(0);
    (currentLevel < 4) ? setCurrentlevel(currentLevel+1) : setCurrentlevel(-1);
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        { currentLevel === -1 && <WelcomeDesk updateLevel={updateLevel} /> }
        { currentLevel === 0 && <IntroAnimation  updateLevel={updateLevel}  /> }        
        { currentLevel === 1 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} handleNextLevel={() => { loadNextLevel()}} /> }
        { currentLevel === 2 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
        { currentLevel === 3 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
        { currentLevel > 0 && currentLevel < 4 &&<LevelPoints totalPoints={totalPoints} />  }      
        { currentLevel > 3 && <EndScr totalPoints={totalPoints} handleNextLevel={() => { loadNextLevel()}} />}       
        
      </main>
    </div>
  );
}

export default App;
