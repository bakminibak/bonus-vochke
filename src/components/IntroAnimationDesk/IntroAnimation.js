import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import infoAnimationData from '../../animations/infoScr.json';

export const IntroAnimation = ({updateLevel}) => {
    

    const animContainer = React.createRef();


    const handleBtnClick = () => {
        
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
            
            <button className='button_start' onClick={handleBtnClick}>Start Level </button> 
        </div>
    )
}
