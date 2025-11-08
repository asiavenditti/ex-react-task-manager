import React from 'react'



const statusColor = (status) => {
    if (status === 'To do') return { backgroundColor: 'red', }
    if (status === 'Doing') return { backgroundColor: 'yellow' }
    if (status === 'Done') return { backgroundColor: 'green', color: 'white' }
}

const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
            <td style={statusColor(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleString()}</td>
        </tr>



    )
})


export default TaskRow