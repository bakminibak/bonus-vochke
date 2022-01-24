import React, {useEffect} from 'react'

import Lottie from 'lottie-web';
import endAnimationData from '../mobile-animations/endsession.json';

export const SessionEndMobile = () => {
    const animContainer = React.createRef();

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win.mp3");
    const audioWelcome = new Audio("./sfx/welcome/Slot Game Win.mp3");

    const handleBtnClick = () => {        
        //updateLevel(-1);
        audioBtn.play();
        //handleNextLevel();
    }

    useEffect(() => {
        //console.log("useEffect EndScr", animContainer);
        const mainAnim = Lottie.loadAnimation({
            container: animContainer.current,
            animationData: endAnimationData,
            autoplay: true,
            loop: false
        }); 
        
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!');
            audioWelcome.play();
          }, 1000);
          return () => clearTimeout(timer);
    });

    return (
        <div className="session-end">
            <div className='c-container' ref={animContainer}>                       
            </div>                   
        </div>
    )
}
