import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import EditTaskModal from '../components/EditTaskModal'


export default function TaskDetail() {
    // recuperiamo l'id dalla url e i task dal context
    const { id } = useParams()
    const { tasks } = useContext(GlobalContext)
    const { removeTask } = useContext(GlobalContext)
    const { updateTask } = useContext(GlobalContext)
    const navigate = useNavigate()

    // stato della modale "elimina task"
    const [showModal, setShowModal] = useState(false)

    // stato della modale "modifica task"

    const [showEditModal, setShowEditModal] = useState(false)



    // trovo il task corretto
    const task = tasks.find(t => t.id === parseInt(id))

    // aggiornamento dinamico del titolo della pagina
    useEffect(() => {
        if (task) {
            document.title = task.title
        } else {
            document.title = 'Task non trovato'
        }

        // Cleanup
        return () => {
            document.title = 'Task Manager'
        }
    }, [task])

    // se non c'è il task mostro messaggio
    if (!task) return <p className="text-center mt-5">Task non trovato</p>


    // funzione per gestire elimina al click
    const handleConfirmDelete = async () => {

        try {
            await removeTask(task.id)
            // alert di successo
            alert("Task eliminata con successo")
            // reinderizzamento
            navigate("/")
        } catch (error) {
            // alert con l'errore
            alert(error.message)
        } finally {
            setShowModal(false)
        }
    }


    const handleSaveEdit = async (updatedTask) => {

        try {
            await updateTask(updatedTask)
            alert('Task modificata con successo')
            setShowEditModal(false)
        }
        catch (error) {
            console.error(error.message)
            alert('Si è verificato un errore nel tentativo di modifica', error.message)
        }
    }



    const statusStyle = (status) => {
        if (status === 'To do') return { backgroundColor: 'red', color: 'white' }
        if (status === 'Doing') return { backgroundColor: 'yellow', color: 'black' }
        if (status === 'Done') return { backgroundColor: 'green', color: 'white' }
    }

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Torna alla lista
            </button>

            <div className="card shadow-sm">
                <div className="card-header">
                    <h2 className="card-title">{task.title}</h2>
                </div>
                <div className="card-body">
                    <p><strong>Descrizione:</strong> {task.description}</p>
                    <p>
                        <strong>Stato:</strong>{' '}
                        <span className="px-2 py-1 rounded" style={statusStyle(task.status)}>
                            {task.status}
                        </span>
                    </p>
                    <p>
                        <strong>Data di creazione:</strong>{' '}
                        {new Date(task.createdAt).toLocaleString()}
                    </p>
                </div>


                <div className="card-footer d-flex justify-content-end">
                    <button onClick={() => setShowEditModal(true)}
                        className='btn btn-primary me-2'
                    >Modifica Task</button>
                    <div className="modal-editing">
                        <EditTaskModal
                            show={showEditModal}
                            onClose={() => setShowEditModal(false)}
                            task={task}
                            onSave={handleSaveEdit}
                        />

                    </div>
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowModal(true)}
                    >
                        Elimina Task
                    </button>
                </div>
            </div>
            <Modal
                show={showModal}
                title='Conferma'
                content={<p>Sei sicuro di voler eliminare questa task?</p>}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                confirmText='Elimina'
            />

        </div>


    )
}
