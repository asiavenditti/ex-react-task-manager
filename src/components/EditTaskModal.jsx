

import { useState, useRef, useEffect } from "react";
import Modal from "./Modal"


export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const editFormRef = useRef()




    const handleSubmit = (e) => {
        e.preventDefault()
        const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`
        if (!title.trim()) {
            alert('Il titolo non può essere lasciato vuoto')
            return
        }

        for (let char of title) {
            if (symbols.includes(char)) {
                alert('Non sono consentiti caratteri speciali')
                return
            }
        }

        onSave({ ...task, title, description, status })
    }

    return (
        <>
            <Modal
                show={show}
                title="Modifica task"
                onClose={onClose}
                confirmText='Salva'
                // requestSubmit per attivare il submit del form
                onConfirm={() => editFormRef.current.requestSubmit()}
                content={

                    <form ref={editFormRef} onSubmit={handleSubmit} className="p-2">
                        <div className="mb-3">
                            <label className="form-label">Titolo</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descrizione</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stato</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </form>


                }
            >

            </Modal >
        </>
    )

}
