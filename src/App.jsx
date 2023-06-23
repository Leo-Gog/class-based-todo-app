import "./App.css";
import { Component } from "react";
import Form from "./components/toDoForm";
import List from "./components/toDoList";

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
  }

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
    const arr = doneTasks.filter((el)=> el.id !== e.target.parentElement.id)
    this.setState({
      doneTasks: arr,
    })
  }

  moveTodo = (e) => {
    e.preventDefault()
    let id = e.target.parentElement.id
    let status = e.target.parentElement.getAttribute('data-status')
    
    function moveTask(arr, id){
      let done = arr.find((value) => value.id === id)
      done.status = !done.status
      const tasks = arr.filter((x)=>x !== done)
      return [tasks, done]
    }

    if(status ==='true'){
      const [tasks, done] = moveTask(this.state.tasksInProgress,id)
      this.setState({
      tasksInProgress: tasks,
      doneTasks: [...this.state.doneTasks, done]
      })
    }else{
      const [newDoneTasks, returnedTask] = moveTask(this.state.doneTasks,id)
      this.setState({
      tasksInProgress: [...this.state.tasksInProgress, returnedTask],
      doneTasks: newDoneTasks
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