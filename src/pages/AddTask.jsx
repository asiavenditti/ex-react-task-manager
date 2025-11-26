import React, { useContext, useRef, useState, useMemo } from 'react'
import { GlobalContext } from '../context/GlobalContext'

export default function AddTask() {

    const { addTask } = useContext(GlobalContext)

    const [taskTitle, setTaskTitle] = useState('')
    const descriptionRef = useRef(null)
    const statusRef = useRef(null)

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`

    // validazione con useMemo
    const errorTitle = useMemo(() => {
        if (taskTitle.trim() === '') return 'Inserire il nome per proseguire'

        for (let char of taskTitle) {
            if (symbols.includes(char)) {
                return 'Non sono consentiti caratteri speciali'
            }
        }
        return null
    }, [taskTitle])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // blocco il submit se c'è errore
        if (errorTitle) return

        const description = descriptionRef.current.value
        const status = statusRef.current.value

        const newTask = {
            title: taskTitle,
            description,
            status
        }

        try {
            await addTask(newTask)
            alert('Task creata con successo')
            setTaskTitle('')
            descriptionRef.current.value = ''
            statusRef.current.value = 'To do'
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="container mt-5 mb-2">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="my-1 text-center">
                                <i className="bi bi-plus-circle me-2"></i>
                                Aggiungi Nuovo Task
                            </h2>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>

                                {/* nome */}
                                <div className="mb-3">
                                    <label htmlFor="taskName" className="form-label fw-bold">
                                        Nome Task
                                    </label>
                                    <input
                                        type="text"
                                        id="taskName"
                                        className={`form-control ${errorTitle ? 'is-invalid' : ''}`}
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        placeholder="Inserisci il nome del nuovo task"
                                    />

                                    {/* Messaggio validazione */}
                                    {errorTitle && (
                                        <div className="invalid-feedback d-block">
                                            {errorTitle}
                                        </div>
                                    )}
                                </div>

                                {/* descrizione */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">
                                        Descrizione
                                    </label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        ref={descriptionRef}
                                        placeholder="Inserisci una descrizione..."
                                        rows="4"
                                    />
                                </div>

                                {/* status */}
                                <div className="mb-4">
                                    <label htmlFor="status" className="form-label fw-bold">
                                        Stato
                                    </label>
                                    <select
                                        id="status"
                                        className="form-select"
                                        ref={statusRef}
                                        defaultValue="To do"
                                    >
                                        <option value="To do">To do</option>
                                        <option value="Doing">Doing</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>

                                {/* submit */}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                    >
                                        <i className="bi bi-plus-lg me-2"></i>
                                        Aggiungi Task
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
