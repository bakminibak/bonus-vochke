import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-web';
import infoAnimationData1 from '../../mobile-animations/info_scr1.json';
import infoAnimationData2 from '../../mobile-animations/info_scr2.json';

export const IntroAnimationMobile = ({updateLevel, isLoading, currentSession, currentLevel}) => {
    

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win v2.mp3");
    const animContainerScr1 = React.createRef();
    const animContainerScr2 = React.createRef();
    const [currentScrState, setCurrentScr] = useState(1);

    const handleBtnClick = () => {
        if (currentSession.gameState !== null) {
            updateLevel(currentSession.gameState.level);
        }
        if (currentScrState === 2)  updateLevel(1);
        setCurrentScr(currentScrState + 1);        
        audioBtn.play();
    }

    useEffect(() => {
        const mainAnim = Lottie.loadAnimation({
            container: animContainerScr1.current,
            animationData: infoAnimationData1,
            autoplay: true,
            loop: false
          }); 
    
          const mainAnim2 = Lottie.loadAnimation({
            container: animContainerScr2.current,
            animationData: infoAnimationData2,
            autoplay: false,
            loop: false
        }); 
        if (currentScrState === 2) {
            //setIntroAniamtion(infoAnimationData2);
                      
            mainAnim2.play();
            
            } 
    }, [currentScrState]);
     
    useEffect(() => {
        isLoading(false);
    }, []);

    return (
        <div>
            {currentScrState === 1 && <div className='c-container' ref={animContainerScr1}></div> }
            {currentScrState === 2 && <div className='c-container' ref={animContainerScr2}></div> }
            
            {currentScrState === 1 && <button className='btn button_start' onClick={handleBtnClick}><img src='../../images/btns/OSVOJI_BONUS.png' /></button> }
            {currentScrState === 2 && <button className='btn button_start' onClick={handleBtnClick}><img src='../../images/btns/IGRAJ.png' /></button> }
            
        </div>
    )
}
