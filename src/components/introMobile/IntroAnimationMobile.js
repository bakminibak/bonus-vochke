import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-web';
import infoAnimationData1 from '../../mobile-animations/info_scr1.json';
import infoAnimationData2 from '../../mobile-animations/info_scr2.json';

export const IntroAnimationMobile = ({updateLevel}) => {
    

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win.mp3");
    const animContainerScr1 = React.createRef();
    const animContainerScr2 = React.createRef();
    const [currentScrState, setCurrentScr] = useState(1);


    const handleBtnClick = () => {
        console.log("currentScr1: ", currentScrState);
        if (currentScrState === 1) {
            //setIntroAniamtion(infoAnimationData2);

            
            } 
        else updateLevel(1);
        //currentScr = 2;
        //setCurrentScr(currentScrState + 1);
        setCurrentScr(currentScrState => currentScrState + 1)
        console.log("currentScr2: ", currentScrState);
        
        audioBtn.play();
        
        //setIntroAniamtion(infoAnimationData2)
        
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
        mainAnim2.play();
    }, []);
     
    return (
        <div>
            {currentScrState === 1 && <div className='c-container' ref={animContainerScr1} onClick={handleBtnClick}></div> }
            {currentScrState === 2 && <div className='c-container' ref={animContainerScr2}></div> }
            
            {currentScrState === 2 && <button className='btn button_start' onClick={handleBtnClick}><img src='../../images/btns/IGRAJ.png' /></button> }
            
        </div>
    )
}
