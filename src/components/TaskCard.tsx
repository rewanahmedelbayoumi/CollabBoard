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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      {...listeners}
      {...attributes}
    >
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
          onPointerDown={(event) => event.stopPropagation()}
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
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => {
            const updatedTitle = window.prompt(
              'Edit task title:',
              task.title,
            )

            if (updatedTitle !== null) {
              onEditTask(task.id, updatedTitle)
            }
          }}
          aria-label={`Edit ${task.title}`}
        >
          ✎
        </button>

        <button
          type="button"
          className="delete-button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default TaskCard