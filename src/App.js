import React,{ useState, useEffect } from 'react';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import './App.css';

import { Level } from './components/Level';
import { LevelMobile } from './components/LevelMobile';
import { LevelPoints } from './components/LevelPoints';
import { WelcomeDesk } from './components/WelcomeDesk';
import { IntroAnimation } from './components/IntroAnimationDesk/IntroAnimation';
import {EndScr} from './components/EndScr';
import {EndScrMobile} from './components/EndScrMobile';
import { Login } from './components/Login';
import getAxiosInstance from "./config/http";
import {SessionEnd} from './components/SessionEnd';
import {SessionEndMobile} from './components/SessionEnd_Mobile';

import { WelcomeDeskMobile } from './components/WelcomeDesk_Mobile';
import { IntroAnimationMobile } from './components/introMobile/IntroAnimationMobile';



function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentlevel] = useState(-2); //default -1 - Welcome Scr
  const [currentSession, setCurrentSession] = useState({});
  const [numChestOpened, setNumChestOpened] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);
  // const [showInfoScr, setShowInfoScr] = useState(false);
  
  const orientation = isMobile ? "mobile" : "";
  
    

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [levelPrizes, setLevelPrizes] = useState([
                                                  [500, -200, -50],
                                                  [100, 100, -500],
                                                  [-100, 2500, 500]]);

  // Adding login, register and createSession logic based on strapi request.
  const login = () => async (userData) => {
    const http = getAxiosInstance();
    // console.warn(http.request.data);
    try {
      const { data } = await http.post("/auth/local-simple", userData);
      http.defaults.headers.common["Authorization"] = `bearer ${data.jwt}`;
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const register = () => async (userData) => {
    const http = getAxiosInstance();
    try {
      const { data } = await http.post("/auth/local-simple/register", userData);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const createSession = () => async (requestData) => {
    const http = getAxiosInstance();
    try {
      const { data } = await http.post("/game-sessions", requestData);
      setCurrentSession(data);
      setCurrentlevel(-1);
      return data;
    } catch (e) {
      throw e;
    }
  };

  // End of adding login, register and createSession.

  // Adding open chest logic based on strapi request.
  const bonusMasterOpen = (params) => async (params) => {
    // console.log(params);
    setIsLoaded(false);
    const http = getAxiosInstance();
    let _levelPrizes = [];
    try {
      const { data } = await http.post(
        "/merkurbet/bonusMaster/open",
        {},
        { params }
      );
      console.log("bonusMasterOpen:",data);
      updateTotalPoints(data.gameState.points, data.gameState.totalPoints);
      for (let i=0; i < 3; i++) {
        _levelPrizes.push([data.gameState.points, data.gameState.points, data.gameState.points]);
      }
      setLevelPrizes(_levelPrizes);
      setIsLoaded(true);
      return data;
    } catch (e) {
      setIsLoaded(true);
      setError(e);
      // throw e;
    }
  };
  // End of adding open chest logic.

    // Adding open chest logic based on strapi request.
    const bonusMasterTransfer = (params) => async (params) => {
      // console.log(params);
      setIsLoaded(false);
      const http = getAxiosInstance();
      try {
        const { data } = await http.post(
          "/merkurbet/bonusMaster/transfer",
          {},
          { params }
        );
        console.log("bonusMasterTransfer:",data);
        loadNextLevel();
        setIsLoaded(true);
        return data;
      } catch (e) {
        setIsLoaded(true);
        setError(e);
        loadNextLevel();
        // throw e;
      }
    };
    // End of adding open chest logic.

  React.useEffect(() => {
    if (currentSession.finished) {
      if (currentSession.didWin) {
        setTotalPoints(currentSession.gameState.totalPoints);
        setCurrentlevel(4);
      } else {
        setIsSessionActive(false);
      }
    } else {
      setIsSessionActive(true);
    }
  }, [currentSession, isSessionActive])

  useEffect(() => {
    const levelBgImgs = [
      'images/nivo1/img_13.png',
      'images/nivo2/img_21.png',
      'images/nivo3/img_19.png'
    ]
  
    return () => {
      //second;
    };
  }, []);
  


  const animatePoints = (_points) => {
    let _toPoints = totalPoints + _points;
  }
  // const updateTotalPoints = () => {
  //   let _points = Number(levelPrizes[currentLevel-1][numChestOpened]);
    
  //   setNumChestOpened(numChestOpened+1);
  //   //animatePoints(_points);
  //   setTotalPoints(Number(totalPoints + _points));
  //   console.log("updateTotalPoints:", _points, totalPoints + _points);
  // }

  const updateTotalPoints = (points, totalPoints) => {
    let _points = Number(points);
    
    setNumChestOpened(numChestOpened+1);
    //animatePoints(_points);
    setTotalPoints(Number(totalPoints));
  }
  const updateLevel = (level) => {
    setCurrentlevel(level);
  }
  const loadNextLevel = () => {
    setNumChestOpened(0);
    (currentLevel < 4) ? setCurrentlevel(currentLevel+1) : setCurrentlevel(-2);
  }
  return (
    <div className={`App ${orientation}`}>
      <header className="App-header">
      </header>
      <main>
        <MobileView className='mobile-view'>
          {!isSessionActive &&  <SessionEndMobile /> }
          {currentLevel === -2 && <Login updateLevel={updateLevel} login={login()} register={register()} createSession={createSession()} /> }
          {currentLevel === -1 && <WelcomeDeskMobile updateLevel={updateLevel} /> }
          {currentLevel === 0 && <IntroAnimationMobile  updateLevel={updateLevel}  /> }
          {currentLevel === 1 && <LevelMobile updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}} /> }
          {currentLevel === 2 && <LevelMobile updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel === 3 && <LevelMobile updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          {currentLevel > 3 && <EndScrMobile totalPoints={totalPoints} currentSession={currentSession} handleNextLevel={() => { loadNextLevel()}} bonusMasterTransfer={bonusMasterTransfer()} />}               
        </MobileView>
        <BrowserView className='desktop-view'>
          {!isSessionActive &&  <SessionEnd /> }
          {currentLevel === -2 && <Login updateLevel={updateLevel} login={login()} register={register()} createSession={createSession()} /> }
          {currentLevel === -1 && <WelcomeDesk updateLevel={updateLevel} /> }
          {currentLevel === 0 && <IntroAnimation  updateLevel={updateLevel}  /> }        
          {currentLevel === 1 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}} /> }
          {currentLevel === 2 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel === 3 && <Level updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          {currentLevel > 3 && <EndScr totalPoints={totalPoints} currentSession={currentSession} handleNextLevel={() => { loadNextLevel()}} bonusMasterTransfer={bonusMasterTransfer()} />} 
        </BrowserView>
      </main>
    </div>
  );
}

export default App;
