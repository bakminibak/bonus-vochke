import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import infoAnimationData from '../../animations/infoScr.json';

export const IntroAnimation = ({updateLevel}) => {
    

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win.mp3");
    const animContainer = React.createRef();


    const handleBtnClick = () => {
        audioBtn.play();
        updateLevel(1);
    }

    useEffect(() => {
        const mainAnim = Lottie.loadAnimation({
            container: animContainer.current,
            animationData: infoAnimationData,
            autoplay: true,
            loop: true
          }); 
    }, []);
     
    return (
        <div>
            <div className='c-container' ref={animContainer}>            
            </div>
            
            <button className='btn button_start' onClick={handleBtnClick}><img src='../../images/btns/IGRAJ.png' /></button> 
            
        </div>
    )
}
