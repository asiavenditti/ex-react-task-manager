import { createContext, useState, useEffect } from "react";
const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([])

    const url = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                console.log(data)
            })
    }, [])



    return (

        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>

    )
}




