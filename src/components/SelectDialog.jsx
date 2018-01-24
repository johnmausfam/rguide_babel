import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import ConfirmDialog from './ConfirmDialog'

class SelectDialog extends React.Component {
  render() {
    return (
      <ConfirmDialog className={Classnames('c_dlg_sele',this.props.className)} title={this.props.title} message={this.props.message}>
        <select>
        	{this.props.options && 
            this.props.options.map(item=>{
              return <option key={item.key} value={item.value}>{item.text}</option>
            })
          }
        </select>
      </ConfirmDialog>
    );
  }
}

export default SelectDialog