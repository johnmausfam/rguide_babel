import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import Dialog from './Dialog'

class AlertDialog extends React.Component {
	_onClickHandler(){
		this.context.DialogConext.closeDialogByKey(this.props.dialogID);
	}
	renderButton(){
		return [
			<button key="okbtn" onClick={this._onClickHandler.bind(this)}>OK</button>
		];
	}
  render() {
    return (
      <Dialog className={Classnames('c_dlg_alt',this.props.className)} footer={this.renderButton()} title={this.props.title + "("+this.props.dialogID+")"}>
      	<div className="c_dlg_alt_txt">{this.props.message}</div>
      </Dialog>
    );
  }
}

AlertDialog.contextTypes = {
  DialogConext: PropTypes.object
}


export default AlertDialog