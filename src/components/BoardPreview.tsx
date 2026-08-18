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
  onDeleteTask: (taskId: number) => void
  onMoveTask: (taskId: number, targetColumn: string) => void
}

function BoardPreview({
  columns,
  onDeleteTask,
  onMoveTask,
}: BoardPreviewProps) {
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
                <div className="task-content">
                  <strong>{task.title}</strong>
                  <span>{task.user}</span>
                </div>

                <div className="task-actions">
                  <select
                    value={column.title}
                    onChange={(event) =>
                      onMoveTask(task.id, event.target.value)
                    }
                    aria-label={`Move ${task.title}`}
                  >
                    {columns.map((targetColumn) => (
                      <option
                        key={targetColumn.title}
                        value={targetColumn.title}
                      >
                        {targetColumn.title}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDeleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardPreview