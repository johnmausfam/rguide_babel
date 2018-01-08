import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import "../css/App.css"
const App = () => (
  <div>
  	<div>
  		<h1>ABX</h1>
  		<h2>A22SS2</h2>
  		<img src="../images/flower.jpg" />
  	</div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
