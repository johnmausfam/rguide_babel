import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import "../css/App.css"
const App2 = () => (
  <div>
  	<div>
  		<h1>App2</h1>
  		<h2>A22SS2</h2>
  	</div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
