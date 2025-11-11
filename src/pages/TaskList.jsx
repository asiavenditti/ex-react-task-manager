
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow'

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    const context = useContext(GlobalContext)
    console.log('Context completo', context)

    if (!tasks || tasks.length === 0) {
        return <p>Caricamento in corso...</p>
    }

    return (
        <div className="container mt-4">
            <h1>Lista Task</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Titolo</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} />

                    ))}
                </tbody>
            </table>

        </div >
    )
}