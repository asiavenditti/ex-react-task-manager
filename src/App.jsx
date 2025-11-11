import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import AddTask from './pages/AddTask'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import Navbar from './components/Navbar'
import GlobalProvider from './context/GlobalContext'


function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
