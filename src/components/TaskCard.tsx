import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { BoardColumn, Task } from '../types/board'

type TaskCardProps = {
  task: Task
  column: BoardColumn
  columns: BoardColumn[]
  onDeleteTask: (taskId: number) => void
  onMoveTask: (taskId: number, targetColumn: string) => void
  onEditTask: (taskId: number, newTitle: string) => void
}

function TaskCard({
  task,
  column,
  columns,
  onDeleteTask,
  onMoveTask,
  onEditTask,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  const handleEdit = () => {
    const updatedTitle = window.prompt(
      'Edit task title:',
      task.title,
    )

    if (updatedTitle !== null && updatedTitle.trim() !== '') {
      onEditTask(task.id, updatedTitle)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'is-dragging' : ''}`}
    >
      <div className="task-content">
        <div
          className="drag-handle"
          {...listeners}
          {...attributes}
          aria-label={`Drag ${task.title}`}
          title="Drag task"
        >
          <span>⠿</span>
        </div>

        <div className="task-info">
          <strong>{task.title}</strong>
          <span>{task.user}</span>
        </div>
      </div>

      <div
        className="task-actions"
        onPointerDownCapture={(event) => {
          event.stopPropagation()
        }}
        onMouseDownCapture={(event) => {
          event.stopPropagation()
        }}
      >
        <select
          value={column.title}
          onChange={(event) => {
            onMoveTask(task.id, event.target.value)
          }}
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
          className="edit-button"
          onClick={handleEdit}
          aria-label={`Edit ${task.title}`}
          title="Edit task"
        >
          ✎
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default TaskCard