import React, { useState } from 'react'
import Lottie from 'lottie-web';
import animation from '../animations/welcome.json';

export const WelcomeDesk = ({updateLevel, isLoading}) => {
    const animationContainer = React.createRef();

    const [startBtnVisibility, setStartBtnVisibility] = useState('hide');

    const audioWelcome = new Audio("./sfx/welcome/Slot Game Win v2.mp3")
    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win v2.mp3");

    React.useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: animation,
          autoplay: true,
          loop: false
        });
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!');
            setStartBtnVisibility('show');
            audioWelcome.play();
          }, 1000);
          
          return () => {
              clearTimeout(timer);
          }
          
      }, [])
    
      React.useEffect(() => {          
        isLoading(false);
      });


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
