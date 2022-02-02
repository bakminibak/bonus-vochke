import React, {useRef, useState}  from 'react';
import Lottie from 'lottie-web';
import animationData from '../mobile-animations/continue_game.json';

export const ContinueGameMobile   = ({sessionState, isLoading, updateLevel}) => {
    

    
    
    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win v2.mp3");
    const audioWelcome = new Audio("./sfx/welcome/Slot Game Win v2.mp3");

    const animationContainer = React.createRef();
    const msg_EndSession = 'Žao nam je, blaga više nema. Prošlo je 2 sata od početka tvoje ekspedicije. Pirati su stigli pre tebe i uzeli sve. \n  Vrati se nazad na svoj Xtip nalog i oprobaj sreću u nekoj drugoj avanturi.'
    const msg_RepeatLanding = 'Žao nam je, već si jednom bio na ovoj  ekspediciji i pokupio sva blaga. \n Vrati se nazad na svoj Xtip nalog i oprobaj sreću u nekoj drugoj avanturi.'
    const msg_ContinuePlay = 'Dobro je da si se vratio, skriveno blago te i dalje čeka! \n Do sada si osvojio {000%} bonusa. Nastavi tamo gde si stao.'
    

    const [showMessage, setShowMessage] = useState('hide-msg');
    const [currentMsg, setCurrentMsg] = useState(msg_ContinuePlay);

    const restartGame = () => {
      console.log('restartGame', sessionState.gameState.level);
      
      updateLevel(sessionState.gameState.level+1);
      audioBtn.play();
    }

    const separateNewMessage = (msg) => {
      let newMsg = msg.split ('\n').map ((item, i) => <p key={i}>{item}</p>);
      return newMsg;
    }
    React.useEffect(() => {
        
        console.log("CONTINUE");
        audioWelcome.play();
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: animationData,
          autoplay: true,
          loop: true
        });

        isLoading(false);  
        let newMsgPoints = String(msg_ContinuePlay.replace("{000%}", sessionState.gameState.totalPoints +"%"));
        newMsgPoints = separateNewMessage(newMsgPoints);
        setCurrentMsg(newMsgPoints);

        setShowMessage('show-msg');
      }, []);

    return (
        <div className="continue-game" ref={animationContainer}>
          <div className={'continueSession-msg ' + showMessage}>  {currentMsg} </div>            
          
          <div className='btn continue_btn'> <img src='./images/btns/NASTAVI.png'  onClick={restartGame} /></div>
        </div>
    )
}