import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import AlertDialog from './AlertDialog'
import Immutable from 'immutable';

export class DialogConextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.updaters = [];
    //可以使用immutablejs
    this.dialogs = Immutable.List();
    this.contextObject = {
      registerDialogManager:this._registerDialogManager.bind(this),
      addDialog:this._addDialog.bind(this),
      getDialogData:this._getDialogData.bind(this),
      closeDialogByKey:this._closeDialogByKey.bind(this),
    };

    //monkey patching 最好寫在top app
    window.alert = function(msg) {
      this._addDialog(AlertDialog,{title:"Alert window",message:msg});
    }.bind(this);
  }

  getChildContext() {
    return {
      DialogConext: this.contextObject
    }
  }

  //省略解構、反註冊以及其他需要的程式

  _registerDialogManager(updater){
    this.updaters.push(updater);
    console.log("_registerDialogManager",this.updaters);
  }

  _addDialog(dialog,data){
    this.dialogs = this.dialogs.push({dialogClass:dialog,data:data,dialogID:(Math.random()*100000).toFixed(0)});
    console.log(this.dialogs);
    this.triggerUpdaters();
  }

  _closeDialogByKey(dialogKey){
    var index = this.dialogs.findIndex(d=>d.dialogID == dialogKey);
    if(index != -1){
      this.dialogs = this.dialogs.splice(index,1);
      this.triggerUpdaters();  
    }
  }

  _getDialogData(){
    return this.dialogs;
  }

  triggerUpdaters(){
    this.updaters.forEach(updater=>{
      console.log("triggerUpdaters!");
      updater();
    });
  }

  render(){
    return this.props.children
  }
}

DialogConextProvider.childContextTypes = {
  DialogConext: PropTypes.object
}

export class DialogManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogs:null
    };

    this._onDialogDataChangeBinded = this._onDialogDataChange.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext){
    //... do something
  }

  shouldComponentUpdate(nextProps, nextState, nextContext){
    //用immutablejs可簡易比對
    return nextState.dialogs !== this.state.dialogs;
  }

  //省略解構
  componentDidMount(){
    this.context.DialogConext.registerDialogManager(this._onDialogDataChangeBinded);
  }

  _onDialogDataChange(){
    this.setState({...this.state,dialogs:this.context.DialogConext.getDialogData()});
  }

  render() {
    return (
      <div className={Classnames('c_dlgmgr',this.props.className)}>
      	{this.state.dialogs !== null && this.state.dialogs.map(dlgData=>{
          return <dlgData.dialogClass key={dlgData.dialogID} dialogID={dlgData.dialogID} {...dlgData.data} />
        })}
      </div>
    );
  }
}

DialogManager.contextTypes = {
  DialogConext: PropTypes.object
}
