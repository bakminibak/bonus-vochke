import React, {useEffect} from 'react'

import Lottie from 'lottie-web';
import endAnimationData from '../mobile-animations/endScr.json';

export const EndScrMobile = ({totalPoints, handleNextLevel}) => {
    const animContainer = React.createRef();

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win.mp3");
    const audioWelcome = new Audio("./sfx/welcome/Slot Game Win.mp3");
    const handleBtnClick = () => {        
        //updateLevel(-1);
        audioBtn.play();
        handleNextLevel();
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
        <div>
            <div className='c-container' ref={animContainer}>                 
                <div className="finalPoints">Osvoji li ste {totalPoints}</div>       
            </div>        
            <button className='btn button_check_account' onClick={handleBtnClick}><img src="./images/btns/PREBACI_BONUS.png" />  </button>             
        </div>
    )
}
