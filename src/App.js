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
import {ContinueGame} from './components/ContinueGame';
import {ContinueGameMobile} from './components/ContinueGameMobile';
import { WelcomeDeskMobile } from './components/WelcomeDesk_Mobile';
import { IntroAnimationMobile } from './components/introMobile/IntroAnimationMobile';



function App() {
  //const animationContainer = useRef(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentlevel] = useState(-2); //default -1 - Welcome Scr
  const [currentSession, setCurrentSession] = useState({});
  const [numChestOpened, setNumChestOpened] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const [showInfoScr, setShowInfoScr] = useState(false);
  
  const orientation = isMobile ? "mobile" : "";
  
    

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [levelPrizes, setLevelPrizes] = useState([]);

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
      console.log("currentDATA", data)
      if (!data.finished && !data.didWin && data.gameState !== null && data.gameState.opened.length > 0) {
        setTotalPoints(data.gameState.totalPoints);
        setCurrentlevel(-3);
      } else {
        setCurrentlevel(-1);
      }
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
    const bonusMasterTransfer = () => async () => {
      // console.log(params);
      // setIsLoaded(false);
      const http = getAxiosInstance();
      try {
        
        const { data } = await http.post(
          "/merkurbet/bonusMaster/transfer",
          {},
          {
            params: {session: currentSession.id}
          }
        );
        //loadNextLevel();
        // setIsLoaded(true);
        // return data;
      } catch (e) {
        // setIsLoaded(true);
        setError(e);
        //loadNextLevel();
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

  //Preload animation images
  useEffect(() => {
    let  levelBgImgs;
    if (isMobile) {
      levelBgImgs = [
        './images/mobile/level1/img_13.jpg',
        './images/mobile/level2/img_21.jpg',
        './images/mobile/level3/img_21.jpg',
        './images/mobile/welcome/img_15.png',
        './images/mobile/welcome/img_1.png',
        './images/kovcheg_prazen/img_5.png',
        './images/kovcheg_prazen/img_1.png',
        './images/kovcheg_prazen/img_6.png',
        './images/kovcheg_zlato/img_6.png',
        './images/kovcheg_zlato/img_7.png',
        './images/kovcheg_zlato/img_9.png',
        './images/kovcheg_zlato/img_2.png',
        './images/kovcheg_zlato/img_1.png'
      ]

    } else {
      levelBgImgs = [
        './images/nivo1/img_13.jpg',
        './images/nivo2/img_21.jpg',
        './images/nivo3/img_19.jpg',
        './images/welcome_desk/img_15.png',
        './images/welcome_desk/img_1.png',
        './images/kovcheg_prazen/img_5.png',
        './images/kovcheg_prazen/img_1.png',
        './images/kovcheg_prazen/img_6.png',
        './images/kovcheg_zlato/img_6.png',
        './images/kovcheg_zlato/img_7.png',
        './images/kovcheg_zlato/img_9.png',
        './images/kovcheg_zlato/img_2.png',
        './images/kovcheg_zlato/img_1.png'
      ]

    }
    
    cacheImages(levelBgImgs);
    
    //setIsLoading(false);
    return () => {
      //second;
    };
  }, []);
  const cacheImages = async (levelBgImgs) => {
    const promises = await levelBgImgs.map((src) => {
        return new Promise(function (resolve, reject) {
          const img= new Image();
          img.src = src;
          img.onload = resolve();
          img.onerror = reject();
          console.log("img src: ", src);
        })
    })
    await Promise.all(promises);
    //setIsLoading(false);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
        //setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);

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
    setIsLoading(true);
    setNumChestOpened(0);
    (currentLevel < 3) ? setCurrentlevel(currentLevel+1) : setCurrentlevel(4);
  }
  return (
    <div className={`App ${orientation}`}>
      <header className="App-header">
      </header>
      <main>
        {isLoading && currentLevel < 4 && <div className='loaderIcon'><img src='./images/loader.gif' /></div>}
        <MobileView className='mobile-view'>
          {!isSessionActive &&  <SessionEndMobile /> }
          {currentLevel === -3 && <ContinueGameMobile className='restartScr' updateLevel={updateLevel} sessionState={currentSession} isLoading={() => {setIsLoading()}} bonusMasterTransfer={bonusMasterTransfer()} />}
          {currentLevel === -2 && <Login updateLevel={updateLevel} login={login()} register={register()} createSession={createSession()} /> }
          {currentLevel === -1 && <WelcomeDeskMobile isLoading={() => {setIsLoading()}}  updateLevel={updateLevel} /> }
          {currentLevel === 0 && <IntroAnimationMobile  isLoading={() => {setIsLoading()}} updateLevel={updateLevel} currentLevel={currentLevel} currentSession={currentSession} /> }
          {currentLevel === 1 && <LevelMobile  isLoading={() => {setIsLoading()}} updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}} /> }
          {currentLevel === 2 && <LevelMobile  isLoading={() => {setIsLoading()}} updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel === 3 && <LevelMobile  isLoading={() => {setIsLoading()}} updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          {currentLevel > 3 && <EndScrMobile totalPoints={totalPoints} currentSession={currentSession} handleNextLevel={() => { loadNextLevel()}} bonusMasterTransfer={bonusMasterTransfer()} />}               
        </MobileView>
        <BrowserView className='desktop-view'>
          {!isSessionActive &&  <SessionEnd /> }
          {currentLevel === -3 && <ContinueGame className='restartScr' updateLevel={updateLevel}  sessionState={currentSession} isLoading={() => {setIsLoading()}} bonusMasterTransfer={bonusMasterTransfer()} />}
          {currentLevel === -2 && <Login updateLevel={updateLevel} login={login()} register={register()} createSession={createSession()} /> }
          {currentLevel === -1 && <WelcomeDesk isLoading={() => {setIsLoading()}} updateLevel={updateLevel} /> }
          {currentLevel === 0 && <IntroAnimation isLoading={() => {setIsLoading()}} updateLevel={updateLevel} currentLevel={currentLevel} currentSession={currentSession} /> }        
          {currentLevel === 1 && <Level  isLoading={() => {setIsLoading()}} updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}} /> }
          {currentLevel === 2 && <Level  isLoading={() => {setIsLoading()}} updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel === 3 && <Level  isLoading={() => {setIsLoading()}} updatePoints={() => {updateTotalPoints()}} levelPrizes={levelPrizes[currentLevel-1]} currentLevel={currentLevel} currentSession={currentSession} bonusMasterOpen={bonusMasterOpen()} bonusMasterTransfer={bonusMasterTransfer()} handleNextLevel={() => { loadNextLevel()}}  /> }
          {currentLevel > 0 && currentLevel < 4 && <LevelPoints totalPoints={totalPoints} />  }      
          {currentLevel > 3 && <EndScr totalPoints={totalPoints} currentSession={currentSession} handleNextLevel={() => { loadNextLevel()}} bonusMasterTransfer={bonusMasterTransfer()} />} 
        </BrowserView>
      </main>
    </div>
  );
}

export default App;
