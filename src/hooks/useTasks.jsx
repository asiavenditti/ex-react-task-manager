
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


    const addTask = async (newTask) => {
        try {
            const response = await fetch(`${url}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });

            const { success, message, task } = await response.json();

            if (!success) throw new Error(message);

            setTasks((prevTasks) => [...prevTasks, task]);
            console.log("Aggiunto elemento:", task);
        } catch (error) {
            console.error("Errore nell'aggiunta della task:", error.message);
        }
    };



    const removeTask = (taskId) => {
        console.log('Rimosso task:', taskId);

    }

    const updateTask = (updatedTask) => {
        console.log('Aggiornato task:', updatedTask)
    }

    return { tasks, addTask, removeTask, updateTask }

}
