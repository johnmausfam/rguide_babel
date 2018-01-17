import React from 'react'
import PropTypes from 'prop-types'
import URLOpener from './URLOpener'
import FuncButton from 'systemjust-test-FuncButton'
import "../css/App.css"

const FlexibleList = (props)=>(
  <props.parentElement className="FlxList">{props.listData.map((item)=>{
    return React.createElement(props.childElement, item.props, item.content);
  })}</props.parentElement>
)

FlexibleList.propTypes = {
  parentElement: PropTypes.node.isRequired,
  childElement: PropTypes.string.isRequired,
  listData: PropTypes.arrayOf(PropTypes.shape({props:PropTypes.object, content:PropTypes.node.isRequired })).isRequired
}

const colorListData = [
	{props:{key:'red', style:{color:'red'}}, content:"red"},
	{props:{key:'yellow', style:{color:'yellow'}}, content:"yellow"},
	{props:{key:'blue', style:{color:'blue'}}, content:"blue"},
	{props:{key:'green', style:{color:'green'}}, content:"green"}
]
const App = () => (
  <div>
    <URLOpener className="pageField highLine" label="輸入網址:" buttonText="開啟網址" />
    <FuncButton text="BUTTON!" />
    <FlexibleList parentElement="ul" childElement="li" listData={colorListData} />
  </div>
)

export default App
