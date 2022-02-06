import React, { useEffect, useRef, Component, useState} from 'react';
import Lottie from 'lottie-web';
import { Finger } from './Finger';
import fullChestAnim from '../../animations/kovceg_zlato.json';
import emptyChestAnim from '../../animations/kovceg_prazen.json';




export default class ChestClass extends Component {
  constructor(props) {
    super(props);
    this.points = 0;
    this.audioBtn = new Audio("./sfx/chest_full/Game Win 2 v2.mp3")
    this.audioChestEmpty = new Audio("./sfx/chest_empty/Game Win v2.mp3")
    this.animationContainer = React.createRef();
    this.animationContainerEmpty = React.createRef();
    this.chestAnim = null;
    this.chestAnimEmpty = emptyChestAnim;
    this.state = {
      myclassname: 'points hide',
      isChestOpen: false,
      currentActive: '',
      displayFinger: "HIDE",
      isChestClicked: false,
      isChestFull: false
    }  
    //this.points = this.props.bonusPoints[this.props.numOpenedChest];
    this.chestAnimation = fullChestAnim;
  }

  componentDidMount() {
    // console.log("MOUNT", this.state.isChestClicked);
    
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
  
  componentDidUpdate(prevProps, prevState) {
    //console.log("componentDidUpdate: ", JSON.stringify(this.props.bonusPoints));
    // console.log("prevProps: ", prevProps.bonusPoints);
    // console.log("prevState: ", prevState);
    //console.log("prevState.currentActive", prevProps, prevState, this.props.playChest);
    if (this.props.bonusPoints !== prevProps.bonusPoints) {
      this.points = this.props.bonusPoints; //[this.props.numOpenedChest];
      this.updateAndPlayChest();
    }
    // if (prevState.currentActive === this.props.customClass && JSON.stringify(prevProps.bonusPoints) !== JSON.stringify(this.props.bonusPoints)) {
    //   console.log("comp update ", JSON.stringify(this.props.bonusPoints));
    //   //console.log("comp update ", this.props.bonusPoints[this.props.numOpenedChest]);
    //   //this.points = this.props.bonusPoints[this.props.numOpenedChest];
    //   this.updateAndPlayChest();
    //   this.setState({
    //     currentActive: ''
    //   });
    // }
  }

  // componentWillUpdate(prevProps, prevState) {
  //   console.log("prevProps & State: ", prevProps)
  //   console.log("prevProps & State: ", prevState);
  //   // this.points = this.props.bonusPoints[this.props.numOpenedChest];
  // }

  openChest() {
    //setMyClassName("points show");
    //(Number(this.props.bonusPoints) > 0) ? this.audioBtn.play() : this.audioChestEmpty.play();

    this.setState({
      myclassname: 'points show',
      isChestOpen: true,
      currentActive: this.props.customClass,
      displayFinger: 'hide',
      showFullChest: true
    });
  }

  updateAndPlayChest() {
    this.openChest();
    // console.log("updateAndPlayChest", this.points);
    if (this.points>0){
      this.chestAnim.play();
      this.setState({showFullChest: true});
      this.audioBtn.play();
      // this.state.myclassname = 'points show ';
      this.setState({myclassname: 'points show'});
    } else {
      this.setState({showFullChest: false});
      this.chestAnimEmpty.play();
      this.audioChestEmpty.play();
      this.setState({myclassname: 'points show negative'});
    }
  }
  async getSessionchestPoints() {
    // console.log("getSessionchestPoints");
    const getSessin = await this.props.onClickEl();
    // console.log("getSessin Chest", getSessin, this.points); 
    return getSessin
  }
  handleClick(e) {
    e.preventDefault();
    // console.log('handleClick', this.state.isChestOpen);
    if (!this.state.isChestOpen) {
        // this.getSessionchestPoints().then(console.log("TESTING")) 
        this.props.onClickEl(this.props.customClass);
        //this.setState({displayFinger: "hide"});
        //this.openChest();
        //hideFinger("hide");
        //this.chestAnim.play();
        //mainAnim.play();
        
    }
  }
  render() {
    return (
      <div className='chest-wrapper'>
          <div className={"chest "+this.props.customClass}>
              <div className='hitTarget'  onClick={this.handleClick.bind(this)}></div>
              <div  id={this.props.customClass} className={'kovcheg-anim_full '+!!this.state.showFullChest} ref={this.animationContainer}></div>
              <div  id={'e-'+this.props.customClass} className={'kovcheg-anim_full '+!this.state.showFullChest} ref={this.animationContainerEmpty}></div>
              <div className={this.state.myclassname}>{this.points}<span className='percent'>%</span> <br/><span className="small-text"> BONUS</span></div>   
              <div className={this.state.displayFinger}>
                <Finger />
              </div>
          </div>
      </div>
    );
  }
}
