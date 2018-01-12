import React from 'react'
import ReactDOM from 'react-dom'
const myComponent= ({label, defaultValue, onSubmit}) => (
  <div>
    <span>{label}</span><input type="text" defaultValue={defaultValue} /><button onClick={onSubmit}>Submit</button>
  </div>
);
export default myComponent
