import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import infoAnimationData from '../../animations/infoScr.json';

export const IntroAnimation = ({updateLevel, isLoading, currentSession, currentLevel}) => {
    

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win v2.mp3");
    const animContainer = React.createRef();


    const handleBtnClick = () => {
        audioBtn.play();
        if (currentSession.gameState !== null) {
            // updateChests(currentSession.gameState.opened.length);
            updateLevel(currentSession.gameState.level);
        } else {
            updateLevel(1);
        }
    }

    useEffect(() => {
        const mainAnim = Lottie.loadAnimation({
            container: animContainer.current,
            animationData: infoAnimationData,
            autoplay: true,
            loop: true
          }); 
        isLoading(false);
    }, []);

    return (
        <div>
            <div className='c-container' ref={animContainer}>            
            </div>
            
            <button className='btn button_start' onClick={handleBtnClick}><img src='../../images/btns/IGRAJ.png' /></button> 
            
        </div>
    )
}
