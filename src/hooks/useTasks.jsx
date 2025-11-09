
import { useState, useEffect } from "react"


export default function useTasks() {

    const [tasks, setTasks] = useState([])


    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                console.log(data)
            })
            .catch(err => console.error("Errore nella fetch:", err))
    }, [])


    const addTask = (newTask) => {
        console.log('Aggiunto elemento:', newTask)
    }

    const removeTask = (taskId) => {
        console.log('Rimosso task:', taskId);

    }

    const updateTask = (updatedTask) => {
        console.log('Aggiornato task:', updatedTask)
    }

    return { tasks, addTask, removeTask, updateTask }

}
