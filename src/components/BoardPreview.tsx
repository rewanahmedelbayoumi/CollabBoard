type Task = {
  id: number
  title: string
  user: string
}

type BoardColumn = {
  title: string
  tasks: Task[]
}

type BoardPreviewProps = {
  columns: BoardColumn[]
}

function BoardPreview({ columns }: BoardPreviewProps) {
  return (
    <div className="board-preview" id="board">
      <div className="preview-header">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>

        <span>CollabBoard</span>
      </div>

      <div className="preview-content">
        {columns.map((column) => (
          <div className="column" key={column.title}>
            <h3>{column.title}</h3>

            {column.tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <strong>{task.title}</strong>
                <span>{task.user}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardPreview