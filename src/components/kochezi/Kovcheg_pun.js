import React, { useEffect, useRef, useState} from 'react';
import Lottie from 'lottie-web';
import fullChestAnim from '../../animations/kovceg_zlato.json';
import emptyChestAnim from '../../animations/kovceg_prazen.json';

export const Kovcheg_pun = ({customClass, bonusPoints}) => {    
    const animationContainer = React.createRef();
    let mainAnim = useRef(null);
    const [myclassname, setMyClassName] = useState(['points hide'])

    let chestAnimation = (Number(bonusPoints) > 0) ? fullChestAnim : emptyChestAnim;
    const openChest = () => {
      setMyClassName("points show")
    }

    React.useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: chestAnimation,
          autoplay: false,
          loop: false
        });
        mainAnim = anim;
        console.log(anim);
      }, [])
      
    const handleClick = () => {
      console.log('openChest', mainAnim);
      mainAnim.play();
      openChest();
    }

    return (
      <div className='kovcheg-wrapper'>
        <div className={customClass} onClick={handleClick}>
            <div className="kovcheg-anim_full" ref={animationContainer}></div>
            <div className={myclassname}>{bonusPoints}</div>            
        </div>
      </div>
    )
}
