import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const statusColor = (status) => {
    if (status === 'To do') return { backgroundColor: 'red', }
    if (status === 'Doing') return { backgroundColor: 'yellow' }
    if (status === 'Done') return { backgroundColor: 'green', color: 'white' }
}

const TaskRow = React.memo(({ task }) => {
    const navigate = useNavigate()

    // al click accediamo al dettaglio della task
    function handleClick() {
        navigate(`/task/${task.id}`)
    }


    return (

        <tr
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <td>{task.title}</td>
            <td style={statusColor(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleString()}</td>

        </tr>


    )
})


export default TaskRow