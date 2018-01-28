import React from 'react'
import Book,{BOOK_DATA} from './Book'
import TemperatureApp from './TemperatureApp'
import FragmentTest from './FragmentTest'
import Dialog from './Dialog'
import ConfirmDialog from './ConfirmDialog'
import SelectDialog from './SelectDialog'
import * as BadContext from './BadContextUsage'
import * as BetterContext from './BetterContextUsage'
import * as ContextDialog from './ContextDialog'
import * as HOC from './HOC'
import "../css/App2.scss"
/*const App2 = () => (
  <div className="c_app2">
  	<Book data={BOOK_DATA.React} />
  </div>
)*/

/*const App2 = () => (
  <div className="c_app2">
  	<TemperatureApp />
  </div>
)*/
/*
const selectOptions = [
	{key:"0",value:"0",text:"選項1"},
	{key:"1",value:"1",text:"選項2"}
];

const App2 = () => (
  <div className="c_app2">
  	<SelectDialog title="test dialog" message="test selection" options={selectOptions} />
  </div>
)
*/
/*
const App2 = () => (
  <div className="c_app2">
    <HOC.ListAWithDataAPI />
    <hr />
    <HOC.ListAndInputWithDataAPI />
  </div>
)
*/

let count = 0;
const Rcount = ()=>{
  count++;
  return <h1>RenderTimes:{count}</h1>
}
/*
const App2 = () => (
  <div className="c_app2">
    <BadContext.FreeTabContainer>
        <Rcount />
        <hr />
        <BadContext.FreeTabPanel tabIndex={0}>
          <h1>Tab 1</h1>
        </BadContext.FreeTabPanel>
        <BadContext.FreeTabPanel tabIndex={1}>
          <h1>Tab 2</h1>
        </BadContext.FreeTabPanel>
        <div className="specialEffect">
          <BadContext.FreeTabPanel tabIndex={2}>
            <h1>Tab 3</h1>
          </BadContext.FreeTabPanel>
        </div>
        <div className="footer">
          <BadContext.FreeTabNav />
        </div>
    </BadContext.FreeTabContainer>
  </div>
)*/
/*
const App2 = () => (
  <div className="c_app2">
    <BetterContext.FreeTabContextProvider>
        <Rcount />
        <hr />
        <BetterContext.FreeTabPanel tabIndex={0}>
          <h1>Tab 1</h1>
        </BetterContext.FreeTabPanel>
        <BetterContext.FreeTabPanel tabIndex={1}>
          <h1>Tab 2</h1>
        </BetterContext.FreeTabPanel>
        <div className="specialEffect">
          <BetterContext.FreeTabPanel tabIndex={2}>
            <h1>Tab 3</h1>
          </BetterContext.FreeTabPanel>
        </div>
        <div className="footer">
          <BetterContext.FreeTabNav />
        </div>
    </BetterContext.FreeTabContextProvider>
  </div>
)*/

let testAlertCount = 0;
const testAlert = ()=>{
  alert("testAlertCount:" + (++testAlertCount));
};

const App2 = () => (
  <div className="c_app2">
    <ContextDialog.DialogConextProvider>
      <h1>text dialog</h1>
      <hr />
      <button onClick={testAlert}>Test Alert!</button>
      <ContextDialog.DialogManager />
    </ContextDialog.DialogConextProvider>
  </div>
)
export default App2
