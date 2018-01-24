import React from 'react'
import PropTypes from 'prop-types'


class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}

const FragmentTest = ()=>{
	return (
		<div>
			<div><Columns /></div>
			<hr />
			<table><Columns /></table>
		</div>
	)
}

export default FragmentTest