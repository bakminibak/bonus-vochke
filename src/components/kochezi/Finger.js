import React, {useRef, useState} from 'react'
import Lottie from 'lottie-web'
import fingerAnim from '../../animations/finger.json'

export const Finger = () => {
    
    const animationContainer = React.createRef();
    const [myclassname, changeFingerClass] = useState(['hide'])

    React.useEffect(() => {
        const anim = Lottie.loadAnimation({
          container: animationContainer.current,
          animationData: fingerAnim,
          autoplay: true,
          loop: true
        });
        console.log(anim);
      }, [])
    return (
        <div className="finger-container" ref={animationContainer}>
            
        </div>
    )
}
