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

function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(99);
  const [currentLevel, setCurrentlevel] = useState(-1);
  const [numChestOpened, setChestOpened] = useState([0]);
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
  const updateTotalPoints = (points) => {
    console.log("updateTotalPoints: ", points);
    setTotalPoints(totalPoints + points);
    
    console.log("updateTotalPoints: ", points, totalPoints);
  }
  const updateLevel = (level) => {
    console.log("updateLevel");
    setCurrentlevel(level);
  }

  const chestClicked = () => {
    console.log("setIsChestOpen:");
    //setIsChestOpen(true);
  }
  const handleClick = () => {
    console.log('app');
    loadNextLevel();
  }
  const loadNextLevel = () => {
    console.log("loadNesxtLEvel: ", currentLevel);
    setCurrentlevel(currentLevel+1)
    setChestOpened(false);
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        { currentLevel === -1 && <WelcomeDesk updateLevel={updateLevel} /> }
        { currentLevel === 0 && <IntroAnimation  updateLevel={updateLevel}  /> }        
        { currentLevel === 1 && <Level levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} handleNextLevel={() => { loadNextLevel()}} /> }
        { currentLevel === 2 && <Level levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
        { currentLevel === 3 && <Level levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel}  handleNextLevel={() => { loadNextLevel()}}  /> }
        { currentLevel !== 0 && <LevelPoints totalPoints={totalPoints} />  }             
        
      </main>
    </div>
  );
}

export default App;
