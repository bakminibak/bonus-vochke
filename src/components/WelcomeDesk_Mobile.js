import React, { useState } from 'react'
import Lottie from 'lottie-web';
import animation from '../mobile-animations/welcome.json';

export const WelcomeDeskMobile = ({updateLevel}) => {
    const animationContainer = React.createRef();

    const [startBtnVisibility, setStartBtnVisibility] = useState('hide');

    const audioWelcome = new Audio("./sfx/welcome/24248607_slot-game-win_by_gamechestaudio_preview.mp3")
    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win.mp3");

    React.useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: animation,
          loop: false
        });
        
        
        //anim.setSpeed(1);
        console.log(anim);
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!');
            setStartBtnVisibility('show');
            audioWelcome.play();
          }, 1000);
          return () => clearTimeout(timer);

      }, [])


    const startGame = () => {
        console.log("startGame");
        audioBtn.play();
        updateLevel(0);
    }
    return (
        <div className="welcome-scr-animation-container">
            <div className="welcome-scr-animation" ref={animationContainer}>
            </div>
            
            <div className='btn '>
                <img className={'start_btn '+startBtnVisibility} src='./images/btns/kreni_u_pohod.png'  onClick={startGame} />
            </div>
        </div>
    )
}
