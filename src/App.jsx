import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import AddTask from './pages/AddTask'
import TaskList from './pages/TaskList'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
