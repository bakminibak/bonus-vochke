import React, {useRef, useState}  from 'react';
import Lottie from 'lottie-web';
import animationData from '../mobile-animations/continue_game.json';

export const ContinueGameMobile   = ({sessionState, isLoading}) => {
    

    
    
    const audioBtn = new Audio("./sfx/nextLevel/Positive Game Win v2.mp3");
    const audioWelcome = new Audio("./sfx/welcome/Slot Game Win v2.mp3");

    const animationContainer = React.createRef();
    const msg_EndSession = 'Žao nam je, blaga više nema. Prošlo je 2 sata od početka tvoje ekspedicije. Pirati su stigli pre tebe i uzeli sve. \n  Vrati se nazad na svoj Xtip nalog i oprobaj sreću u nekoj drugoj avanturi.'
    const msg_RepeatLanding = 'Žao nam je, već si jednom bio na ovoj  ekspediciji i pokupio sva blaga. \n Vrati se nazad na svoj Xtip nalog i oprobaj sreću u nekoj drugoj avanturi.'
    const msg_ContinuePlay = 'Dobro je da si se vratio, skriveno blago te i dalje čeka! \n Do sada si osvojio {000%} bonusa. Nastavi tamo gde si stao.'
    


    
    // let newText = msg_EndSession.split('\n').map(i => {
    //     itemId++;
    //     return <p key={itemId}>{i}</p>
    // });

    

    const [showMessage, setShowMessage] = useState('hide-msg');
    const [currentMsg, setCurrentMsg] = useState(msg_EndSession);

    const restartGame = () => {
      console.log('restartGame');
      
      audioBtn.play();
    }

    const separateNewMessage = (msg) => {
      let itemId=1;
      let newMsg = msg_EndSession.split('\n').map(i => {
        itemId++;
        return <p key={itemId}>{i}</p>
      });
      return newMsg
    }


    React.useEffect(() => {
      console.log("ContinueGame sessionState: ", sessionState);
      
      if (Object.keys(sessionState).length > 0 ) {
        isLoading(false);
        console.log("ContinueGame finished: ", sessionState.finished);
        if (sessionState.finished === false) {
          console.log("sessionState.gameState: ", sessionState.gameState);
          if (sessionState.gameState !== null && sessionState.gameState.totalPoints) {              
              console.log("msg_ContinuePlay: ",sessionState.gameState.totalPoints);
              let newMsgPoints = msg_ContinuePlay.replace("{000%}", sessionState.gameState.totalPoints +"%");

              setCurrentMsg(separateNewMessage(newMsgPoints));
              console.log("points msg: ", newMsgPoints);

          }

        } 
        else  { //msg_RepeatLanding
          console.log("msg_RepeatLanding");
          setCurrentMsg(separateNewMessage(msg_RepeatLanding));
        }

        setShowMessage('show-msg');
      }      

    }, [sessionState]);

    React.useEffect(() => {
        
        console.log("CONTINUE");
        audioWelcome.play();
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: animationData,
          autoplay: true,
          loop: true
        });
      }, []);

    return (
        <div className="continue-game" ref={animationContainer}>
          <div className={'continueSession-msg ' + showMessage}>  {currentMsg} </div>            
          
          <div className='btn continue_btn'> <img src='./images/btns/NASTAVI.png'  onClick={restartGame} /></div>
        </div>
    )
}