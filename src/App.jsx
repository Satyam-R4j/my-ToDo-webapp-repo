import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
    }
    setTodos(todos)

  }, [])

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()



  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()


  }




  const handleChange = (e) => {
    setTodo(e.target.value)


  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLS()


  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLS()


  }

  return (
    <>
      <Navbar />
      <div className=" container mx-auto bg-slate-400 p-5 my-3 rounded-xl min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl '>my-ToDo - Manage your todos at one place</h1>
        <div className="addTodo  my-5 gap-4 flex flex-col">
          
          <h2 className='text-lg font-bold'>Add a To-Do</h2>
          <input type="text" onChange={handleChange} className='w-full px-5 py-1 rounded-lg' />
          <button className='bg-blue-500 hover:bg-blue-700 disabled:bg-violet-500 text-sm font-bold rounded-md p-3 py-1  text-white w-full ' disabled={todo.length <= 3} value={todo} onClick={handleAdd}>+Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your ToDos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5 text-red-600 font-bold'> No Todos to display !!</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo my-3 flex w-1/3 justify-between'>
              <div className="flex gap-5">

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button className="bg-green-500 hover:bg-green-700 text-sm font-bold rounded-md p-3 py-1 mx-1 text-white" onClick={(e) => { handleEdit(e, item.id) }}><FaEdit /></button>
                <button className="bg-red-500 hover:bg-red-700 text-sm font-bold rounded-md p-3 py-1 mx-1 text-white" onClick={(e) => { handleDelete(e, item.id) }}><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
