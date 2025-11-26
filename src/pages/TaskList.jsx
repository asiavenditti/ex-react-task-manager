import { useMemo, useContext, useState, useCallback } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import TaskRow from '../components/TaskRow'

// debounce 
const debounce = (callback, delay) => {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    // stati per ordinamento
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    // stato per la ricerca
    const [searchQuery, setSearchQuery] = useState('')

    // funzione con debounce per aggiornare lo stato della ricerca
    const debounceSetSearch = useCallback(
        debounce(setSearchQuery, 500),
        []
    )

    // gestione del click sulle intestazioni per ordinare
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(column)
            setSortOrder(1)
        }
    }

    // useMemo per calcoli costosi
    const filteredAndSortedTasks = useMemo(() => {

        // filtro per ricerca 
        const tasksCopy = [...tasks].filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        // ordino in base alla colonna selezionata
        tasksCopy.sort((a, b) => {
            let comparison = 0
            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy === 'status') {
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
    }, [tasks, sortBy, sortOrder, searchQuery])

    // funzione per mostrare le icone al click
    const getSortIcon = (column) => {
        if (sortBy !== column) return null
        return <span>{sortOrder === 1 ? '▲' : '▼'}</span>
    }

    return (
        <div className="container mt-4">
            <h1>Lista Task</h1>
            <input
                type="text"
                onChange={(e) => debounceSetSearch(e.target.value)}
                placeholder="Cerca la task"
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Titolo {getSortIcon('title')}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato {getSortIcon('status')}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data di Creazione {getSortIcon('createdAt')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
