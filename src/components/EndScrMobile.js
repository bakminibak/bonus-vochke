import React, { useEffect } from 'react'

import Lottie from 'lottie-web';
import endAnimationData from '../mobile-animations/endScr.json';

export const EndScrMobile = ({ totalPoints, handleNextLevel, bonusMasterTransfer, currentSession }) => {
    const animContainer = React.createRef();

    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win v2.mp3");
    const audioWelcome = new Audio("./sfx/welcome/Slot Game Win v2.mp3");
    const handleBtnClick = () => {
        //updateLevel(-1);
        audioBtn.play();
        handleNextLevel();
    }

    const transferBonus = async (e) => {
        console.log('transferBonus activated')
        e.preventDefault();
        audioBtn.play();
        try {
            const sessionData = await bonusMasterTransfer({
                session: currentSession.id,
            });
            console.log("sessionData:", sessionData);
            // window.location.reload();
            return sessionData;
        } catch (e) {
            console.log(e);
            // window.location.reload();
        }
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
                <div className="finalPoints">{totalPoints}% BONUSA</div>
            </div>
            <div className='btn endScr-msg'><div>Vasa igra je zavrsena, mozete iskljuciti prozor u gornjem desnom uglom</div></div>
        </div>
    )
}
