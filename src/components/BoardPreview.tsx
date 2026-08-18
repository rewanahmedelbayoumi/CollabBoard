import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import type {
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'

import { useState } from 'react'
import type { BoardColumn as BoardColumnType, Task } from '../types/board'
import BoardColumn from './BoardColumn'

type BoardPreviewProps = {
  columns: BoardColumnType[]
  onDeleteTask: (taskId: number) => void
  onMoveTask: (taskId: number, targetColumn: string) => void
  onEditTask: (taskId: number, newTitle: string) => void
}

function BoardPreview({
  columns,
  onDeleteTask,
  onMoveTask,
  onEditTask,
}: BoardPreviewProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = Number(event.active.id)

    const task = columns
      .flatMap((column) => column.tasks)
      .find((item) => item.id === taskId)

    setActiveTask(task ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveTask(null)

    if (!over) {
      return
    }

    const taskId = Number(active.id)
    const targetColumn = String(over.id)

    onMoveTask(taskId, targetColumn)
  }

  const handleDragCancel = () => {
    setActiveTask(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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
            <BoardColumn
              key={column.title}
              column={column}
              columns={columns}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="task-card task-card-overlay">
            <div className="task-content">
              <strong>{activeTask.title}</strong>
              <span>{activeTask.user}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default BoardPreview