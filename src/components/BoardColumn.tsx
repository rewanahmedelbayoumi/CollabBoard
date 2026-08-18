import { useDroppable } from '@dnd-kit/core'
import type { BoardColumn as BoardColumnType } from '../types/board'
import TaskCard from './TaskCard'

type BoardColumnProps = {
  column: BoardColumnType
  columns: BoardColumnType[]
  onDeleteTask: (taskId: number) => void
  onMoveTask: (taskId: number, targetColumn: string) => void
  onEditTask: (taskId: number, newTitle: string) => void
}

function BoardColumn({
  column,
  columns,
  onDeleteTask,
  onMoveTask,
  onEditTask,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.title,
  })

  return (
    <div
      ref={setNodeRef}
      className={`column ${isOver ? 'column-over' : ''}`}
    >
      <h3>{column.title}</h3>

      {column.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          column={column}
          columns={columns}
          onDeleteTask={onDeleteTask}
          onMoveTask={onMoveTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  )
}

export default BoardColumn