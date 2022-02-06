import React, { useEffect, useRef, useState} from 'react';
import Lottie from 'lottie-web';
import { Finger } from './Finger';
import fullChestAnim from '../../animations/kovceg_zlato.json';
import emptyChestAnim from '../../animations/kovceg_prazen.json';

export const Chest = ({customClass, bonusPoints, playAnimation, onClickEl}) => {    
    const animationContainer = React.createRef();
    const [myclassname, setMyClassName] = useState(['points hide']);
    const [isChestOpen, setChestOpen] = useState(false);
    const [displayFinger, hideFinger] = useState("HIDE");
    const [isChestClicked, setIsChestClicked] = useState(false);

    let chestAnim = useRef(null);

    //let chestAnimation = (Number(bonusPoints) > 0) ? fullChestAnim : emptyChestAnim;

    const openChest = () => {
      setMyClassName("points show");
      setChestOpen(true);
    }
    //const anim = Lottie;
    
    const changeChstClicked = () => {
      setIsChestClicked(true);
      // console.log("changeChstClicked: ", isChestClicked);
    }
    
    const mainAnim = Lottie;

    //mainAnim = anim;
    
    useEffect(() => {    
      mainAnim.loadAnimation({
          container: animationContainer.current,
          animationData:  (Number(bonusPoints) > 0) ? fullChestAnim : emptyChestAnim,
          autoplay: false,
          loop: false
        }); 
        //chestAnim = mainAnim;   
        if (isChestClicked) {
          // console.log("XXX",isChestClicked);
          mainAnim.play();
        }
        //mainAnim = anim;
      }
      , [])
      
    const handleClick = () => {
      // console.log('handleClick',  isChestOpen);
      changeChstClicked();

      if (!isChestOpen) {
          // console.log("playAnim Chest");       
          openChest();
          hideFinger("hide");
          //chestAnim.play();
          mainAnim.play();
          //onClickEl();
          
      }
    }

    return (
      <div className='kovcheg-wrapper'>
        <div className={"chest "+customClass}>
            <div  id={customClass} className={'kovcheg-anim_full '+ playAnimation} ref={animationContainer} onClick={handleClick} ></div>
            <div className={myclassname}>{bonusPoints}</div>   
            <div className={displayFinger}><Finger /></div>
        </div>
      </div>
    )
}
