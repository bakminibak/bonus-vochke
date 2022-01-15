import React, { useEffect, useRef, Component, useState} from 'react';
import Lottie from 'lottie-web';
import { Finger } from './Finger';
import fullChestAnim from '../../animations/kovceg_zlato.json';
import emptyChestAnim from '../../animations/kovceg_prazen.json';




export default class ChestClass extends Component {
  constructor(props) {
    super(props);
    this.audioBtn = new Audio("./sfx/chest_full/Game Win 2.mp3")
    this.audioChestEmpty = new Audio("./sfx/chest_empty/Game Win.mp3")
    this.animationContainer = React.createRef();
    this.animationContainerEmpty = React.createRef();
    this.chestAnim = null;
    this.chestAnimEmpty = emptyChestAnim;
    this.state = {
      myclassname: 'points hide',
      isChestOpen: false,
      displayFinger: "HIDE",
      isChestClicked: false,
      isChestFull: false
    }  
    this.points = this.props.bonusPoints[this.props.numOpenedChest];
    this.chestAnimation = fullChestAnim;
  }

  componentDidMount() {
    console.log("MOUNT", this.state.isChestClicked);
    
    const mainAnimEmpty = Lottie.loadAnimation({
      container: this.animationContainerEmpty.current,
      animationData: emptyChestAnim,
      autoplay: false,
      loop: false
    }); 
    const mainAnim = Lottie.loadAnimation({
      container: this.animationContainer.current,
      animationData:  fullChestAnim,
      autoplay: false,
      loop: false
    }); 
    this.chestAnim = mainAnim;   
    this.chestAnimEmpty = mainAnimEmpty;   
    //mainAnim = anim;
  }
  componentWillUnmount() {
    console.log("Bye");
  }
  openChest() {
    //setMyClassName("points show");
    //(Number(this.props.bonusPoints) > 0) ? this.audioBtn.play() : this.audioChestEmpty.play();

    this.setState({
      myclassname: 'points show',
      isChestOpen: true,
      displayFinger: 'hide',
      showFullChest: true
    });
  }
  handleClick(e) {
    e.preventDefault();
    console.log('handleClick', this.state.isChestOpen);
    if (!this.state.isChestOpen) {
        this.points = this.props.bonusPoints[this.props.numOpenedChest];
        console.log("playAnim Chest", this.points);     
        //this.setState({displayFinger: "hide"});
        this.openChest();
        //hideFinger("hide");
        //this.chestAnim.play();
        
        if (this.points>0){
          this.chestAnim.play();
          this.setState({showFullChest: true});
          this.audioBtn.play();
        } else {
          this.setState({showFullChest: false});
          this.chestAnimEmpty.play();
          this.audioChestEmpty.play();
        }
        //mainAnim.play();
        
        this.props.onClickEl();
        
    } else  {
      console.log("SKIP playAnim Chest");
    }
  }
  render() {
    return (
      <div className='chest-wrapper'>
        <div className={"chest "+this.props.customClass} onClick={this.handleClick.bind(this)}>
            <div  id={this.props.customClass} className={'kovcheg-anim_full '+!!this.state.showFullChest} ref={this.animationContainer}></div>
            <div  id={'e-'+this.props.customClass} className={'kovcheg-anim_full '+!this.state.showFullChest} ref={this.animationContainerEmpty}></div>
            <div className={this.state.myclassname}>{this.points}%<br/><span className="small-text"> BONUS</span></div>   
            <div className={this.state.displayFinger}>
              <Finger />
            </div>
        </div>
      </div>
    );
  }
}
