import React, {useEffect} from 'react'

import Lottie from 'lottie-web';
import endAnimationData from '../animations/endScr.json';

export const EndScr = ({totalPoints, handleNextLevel}) => {
    const animContainer = React.createRef();

    const handleBtnClick = () => {        
        //updateLevel(-1);
        handleNextLevel();
    }

    useEffect(() => {
        console.log("useEffect EndScr", animContainer);
        const mainAnim = Lottie.loadAnimation({
            container: animContainer.current,
            animationData: endAnimationData,
            autoplay: true,
            loop: false
        }); 
    });

    return (
        <div>
            <div className='c-container' ref={animContainer}>            
            </div>        
            <div>Osvoji li ste {totalPoints}</div>
            <button className='button_start' onClick={handleBtnClick}>RestStart Level </button>             
        </div>
    )
}
