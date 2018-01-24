import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import Dialog from './Dialog'

const ConfirmButtons = [
	<button key="okbtn">OK</button>,
    <button key="cancel">Cancel</button>
];

class ConfirmDialog extends React.Component {
  render() {
    return (
      <Dialog className={Classnames('c_dlg_cfm',this.props.className)} footer={ConfirmButtons} title={this.props.title}>
      	<div className="c_dlg_cfm_txt">{this.props.message}</div>
      	<div className="c_dlg_cfm_body">{this.props.children}</div>
      </Dialog>
    );
  }
}

export default ConfirmDialog