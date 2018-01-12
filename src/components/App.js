import React from 'react'
import URLOpener from './URLOpener'
import FuncButton from 'FuncButton'
import "../css/App.css"
const App = () => (
  <div>
    <URLOpener className="pageField highLine" label="輸入網址:" buttonText="開啟網址" />
    <FuncButton text="BUTTON!" />
  </div>
)

export default App
