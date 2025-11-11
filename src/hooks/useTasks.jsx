
import { useState, useEffect } from "react"

// Hook personalizzato per gestire le task

export default function useTasks() {

    // stato globale
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


    // Funzione per aggiungere una nuova task
    const addTask = async (newTask) => {
        try {
            const response = await fetch(`${url}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });

            const { success, message, task } = await response.json();

            if (!success) throw new Error(message)

            // aggiorno lo stato aggiungendo la nuova task in coda
            setTasks((prevTasks) => [...prevTasks, task])
            console.log("Aggiunto elemento:", task)
        } catch (error) {
            console.error("Errore nell'aggiunta della task:", error.message)
            throw error
        }
    }


    // Funzione per rimuovere una task

    const removeTask = async (taskId) => {
        try {
            const response = await fetch(`${url}/tasks/${taskId}`, {
                method: 'DELETE'
            })
            const { success, message } = await response.json()
            console.log('Rimosso task:', taskId);
            // aggiorno lo stato rimuovendo la task con l'id corrispondente
            setTasks(prevTasks => prevTasks.filter(task => task.id !== Number(taskId)))

            if (!success) throw new Error(message)


        } catch (error) {
            console.error("Errore nella rimozione della task", error.message)
            throw error
        }

    }



    const updateTask = (updatedTask) => {
        console.log('Aggiornato task:', updatedTask)
    }

    return { tasks, addTask, removeTask, updateTask }

}
