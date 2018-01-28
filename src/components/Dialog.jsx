import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import "../css/Dialog.scss"

class Dialog extends React.Component {
  render() {
    return (
      <div className={Classnames('c_dlg',this.props.className)}>
      	<div className="c_dlg_header">{this.props.title}</div>
      	<div className="c_dlg_body">
      		{this.props.children}
      	</div>
      	<div className="c_dlg_footer">
      		{this.props.footer}
      	</div>
      </div>
    );
  }
}

export default Dialog