import { createContext, useState, useEffect } from "react";
import useTasks from "../hooks/useTasks";
export const GlobalContext = createContext()




export default function GlobalProvider({ children }) {
    const taskData = useTasks()


    return (


        <GlobalContext.Provider value={taskData}>
            {children}
        </GlobalContext.Provider>

    )
}




