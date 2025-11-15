
import { useMemo, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow'

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    const context = useContext(GlobalContext)
    console.log('Context completo', context)

    // stati per l'ordinamento
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)


    const handleSort = (column) => {
        if (sortBy == column) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(column)
            setSortOrder(1)
        }
    }

    const sortedTasks = useMemo(() => {

        const tasksCopy = [...tasks]
        tasksCopy.sort((a, b) => {
            let comparison = 0
            if (sortBy == 'title') {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy == 'status') {
                const statusOptions = ['To do', 'Doing', 'Done']
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                comparison = dateA - dateB
            }
            return comparison * sortOrder
        })

        return tasksCopy

    }, [tasks, sortBy, sortOrder])


    const getSortIcon = (column) => {
        if (sortBy !== column) return null

        return (
            <span className=''>
                {sortOrder === 1 ? "▲" : "▼"}
            </span>
        )
    }


    return (
        <div className="container mt-4">
            <h1>Lista Task</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>Titolo {getSortIcon('title')}</th>

                        <th onClick={() => handleSort('status')}>Stato{getSortIcon('status')}</th>
                        <th onClick={() => handleSort('createdAt')}>Data di Creazione{getSortIcon('createdAt')}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />

                    ))}
                </tbody>
            </table>

        </div >
    )
}