import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'

export class FreeTabContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.currentIndex = 0;
    this.registeredPanels = [];
    this._getCurrentIndexFuncBinding = this.getCurrentIndex.bind(this);
    this._registerPanelFuncBinding = this.registerPanel.bind(this);
    this._goIndexFuncBinding = this.goIndex.bind(this);
  }

  getChildContext() {
    return {
      getCurrentIndex: this._getCurrentIndexFuncBinding,
      registerPanel: this._registerPanelFuncBinding,
      goIndex:this._goIndexFuncBinding
    }
  }

  getCurrentIndex(){
    return this.currentIndex;
  }

  registerPanel(tabIndex,updater){
    this.registeredPanels.push({
      index:tabIndex,
      updater:updater
    });
    this.registeredPanels.sort((a,b)=>b-a);
  }

  goIndex(moveValue){
    var oriIndex = this.currentIndex;
    var tabIndex = this.currentIndex + moveValue;
    if(tabIndex >= 0 && tabIndex < this.registeredPanels.length){
      this.currentIndex = tabIndex;
      this.registeredPanels[oriIndex].updater();
      this.registeredPanels[tabIndex].updater();
    }
  }

  render() {
    return <FreeTabContainer {...this.props}>{this.props.children}</FreeTabContainer>;
  }
}


FreeTabContextProvider.childContextTypes = {
  getCurrentIndex: PropTypes.func,
  registerPanel:PropTypes.func,
  goIndex:PropTypes.func
}


export class FreeTabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme:0
    }
  }
 

  render() {
    return (
      <div className="c_ftc">
        {this.props.children}
      </div>
    );
  }
}



export class FreeTabPanel extends React.Component {
  constructor(props) {
    super(props);
    this._renderTimes = 0;
  }
  componentDidMount(){
    this.context.registerPanel(this.props.tabIndex,this.forceUpdate.bind(this));
  }

  render() {
    let sty = {
      display:this.context.getCurrentIndex() === this.props.tabIndex ? "block" : "none"
    };
    return (
      <div style={sty} className={Classnames('c_ftp',this.props.className)}>
        <div>render times:{++this._renderTimes}</div>
      	{this.props.children}
      </div>
    );
  }
}

FreeTabPanel.contextTypes = {
  getCurrentIndex: PropTypes.func,
  registerPanel:PropTypes.func
}



export const FreeTabNav = ({children}, context) =>
  <div className="c_ftn">
    <button onClick={()=>context.goIndex(-1)}>Prev</button>
    <button onClick={()=>context.goIndex(1)}>Next</button>
  </div>;


FreeTabNav.contextTypes = {
  goIndex: PropTypes.func
}