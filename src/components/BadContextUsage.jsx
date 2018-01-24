import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'

export class FreeTabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex:0,
      theme:0
    }
    this.registeredPanels = [];
    this._registerPanelFuncBinding = this.registerPanel.bind(this);
    this._goIndexFuncBinding = this.goIndex.bind(this);
  }

  getChildContext() {
    return {
      currentIndex: this.state.currentIndex,
      registerPanel: this._registerPanelFuncBinding,
      goIndex:this._goIndexFuncBinding
    }
  }

  registerPanel(tabIndex){
    this.registeredPanels.push(tabIndex);
    this.registeredPanels.sort();
  }

  goIndex(moveValue){
    var tabIndex = this.state.currentIndex + moveValue;
    if(tabIndex >= 0 && tabIndex < this.registeredPanels.length)
      this.setState({...this.state,currentIndex:tabIndex});
  }

  render() {
    return (
      <div className="c_ftc">
        {this.props.children}
      </div>
    );
  }
}

FreeTabContainer.childContextTypes = {
  currentIndex: PropTypes.number,
  registerPanel:PropTypes.func,
  goIndex:PropTypes.func
}



export class FreeTabPanel extends React.Component {
  constructor(props) {
    super(props);
    this._renderTimes = 0;
  }
  componentDidMount(){
    this.context.registerPanel(this.props.tabIndex);
  }

  render() {
    let sty = {
      display:this.context.currentIndex === this.props.tabIndex ? "block" : "none"
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
  currentIndex: PropTypes.number,
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