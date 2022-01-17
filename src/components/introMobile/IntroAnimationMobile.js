import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-web';
import infoAnimationData1 from '../../mobile-animations/info_scr1.json';
import infoAnimationData2 from '../../mobile-animations/info_scr2.json';

export const IntroAnimationMobile = ({updateLevel}) => {
    

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win.mp3");
    const animContainerScr1 = React.createRef();
    const animContainerScr2 = React.createRef();
    const [introAnimation, setIntroAniamtion] = useState(infoAnimationData1);
    const [currentScr, setCurrentScr] = useState(1);


    const handleBtnClick = () => {
        audioBtn.play();
        
        console.log("currentScr1: ", currentScr);
        if (currentScr === 1) {
            
            setCurrentScr(2);
            setIntroAniamtion(infoAnimationData2);

            const mainAnim2 = Lottie.loadAnimation({
                container: animContainerScr1.current,
                animationData: infoAnimationData2,
                autoplay: true,
                loop: false
            }); 
            } 
        else updateLevel(1);
        //currentScr = 2;
        setCurrentScr(2);
        console.log("currentScr2: ", currentScr);
        //setIntroAniamtion(infoAnimationData2)
        
    }

    useEffect(() => {
        const mainAnim = Lottie.loadAnimation({
            container: animContainerScr1.current,
            animationData: infoAnimationData1,
            autoplay: true,
            loop: false
          }); 
    }, []);
     
    return (
        <div>
            {currentScr === 1 && <div className='c-container' ref={animContainerScr1} onClick={handleBtnClick}></div> }
            {currentScr === 2 && <div className='c-container' ref={animContainerScr2}></div> }
            
            {currentScr === 2 && <button className='btn button_start' onClick={handleBtnClick}><img src='../../images/btns/IGRAJ.png' /></button> }
            
        </div>
    )
}
