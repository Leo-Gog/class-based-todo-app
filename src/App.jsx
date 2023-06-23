import "./App.css";
import { Component } from "react";

import Form from "./components/toDoForm";
import List from "./components/toDoList";
function removItem(arr, value){
  const index = arr.findIndex(
    (el)=> el.id === value.id
  )
  arr.splice(index, 1)
}
export default class App extends Component {
  
  state = {
    tasksInProgress: [
      {
        id:crypto.randomUUID(),
        todo: 'test todo',
        status: true
      }
    ],
    doneTasks: []
  };

  addTodo = (e) => {
    e.preventDefault()
    const newTodo = {
      todo: document.querySelector('#todo-input').value,
      id: crypto.randomUUID(),
      status: true
    }
    this.setState({
      tasksInProgress: [...this.state.tasksInProgress, newTodo],
    })
  }

  removeTodo = (e) => {
    e.preventDefault()
    const {doneTasks} = this.state
    const arr = [...doneTasks]
    removItem(arr, e.target.parentElement)
    this.setState({
      doneTasks: arr,
    })
  }

  moveTodo = (e) => {
    e.preventDefault()
    let id = e.target.parentElement.id
    let status = e.target.parentElement.getAttribute('data-status')
    console.log(id)
    
    if(status ==='true'){
      console.log('working')
      const currentTodos = this.state.tasksInProgress
      let index = currentTodos.findIndex((value) => value.id === id)
      const done = currentTodos[index]
      done.status = false
      const newTodos = [...currentTodos]
      newTodos.splice(index,1)
      this.setState({
      tasksInProgress: newTodos,
      doneTasks: [...this.state.doneTasks, done]
      })
    }else{
      const doneTodos = this.state.doneTasks
      let index = doneTodos.findIndex((value) => value.id === id)
      const returnedTask = doneTodos[index]
      returnedTask.status = true
      const newTodos = [...doneTodos]
      newTodos.splice(index,1)
      this.setState({
      doneTasks: newTodos,
      tasksInProgress: [...this.state.tasksInProgress, returnedTask]
      })
    }

  }
  render() {
    const remove = <button className="remove-btn" onClick={this.removeTodo}>წაშლა</button>
    return (
      <>
        <Form func={this.addTodo} />
        <div className="tasksbox">
          <List arr={this.state.tasksInProgress} func={this.moveTodo} />
          <List arr={this.state.doneTasks} removeBtn={remove} func={this.moveTodo} name="შესრულებული:"/>
        </div>
        
      </>
    ) 
  }
}
