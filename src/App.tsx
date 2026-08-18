import { useEffect, useState } from 'react'
import type { BoardColumn, Task } from './types/board'
import './App.css'
import BoardPreview from './components/BoardPreview'

const initialColumns: BoardColumn[] = [
  {
    title: 'To Do',
    tasks: [
      {
        id: 1,
        title: 'Design landing page',
        user: 'Rewan',
      },
      {
        id: 2,
        title: 'Plan project structure',
        user: 'Team',
      },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      {
        id: 3,
        title: 'Build React interface',
        user: 'Rewan',
      },
    ],
  },
  {
    title: 'Done',
    tasks: [
      {
        id: 4,
        title: 'Project setup',
        user: 'Team',
      },
    ],
  },
]

function App() {
  const [columns, setColumns] = useState<BoardColumn[]>(() => {
    const savedColumns = localStorage.getItem('collabboard-columns')

    if (!savedColumns) {
      return initialColumns
    }

    try {
      return JSON.parse(savedColumns) as BoardColumn[]
    } catch {
      return initialColumns
    }
  })

  const [newTask, setNewTask] = useState('')
  const [newTaskColumn, setNewTaskColumn] = useState('To Do')

  useEffect(() => {
    localStorage.setItem(
      'collabboard-columns',
      JSON.stringify(columns),
    )
  }, [columns])

  const addTask = () => {
    const trimmedTask = newTask.trim()

    if (!trimmedTask) {
      return
    }

    const task: Task = {
      id: Date.now(),
      title: trimmedTask,
      user: 'Rewan',
    }

    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.title === newTaskColumn
          ? {
              ...column,
              tasks: [...column.tasks, task],
            }
          : column,
      ),
    )

    setNewTask('')
  }

  const deleteTask = (taskId: number) => {
    setColumns((currentColumns) =>
      currentColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  const moveTask = (taskId: number, targetColumn: string) => {
    let taskToMove: Task | undefined

    const columnsWithoutTask = columns.map((column) => {
      const task = column.tasks.find((item) => item.id === taskId)

      if (task) {
        taskToMove = task
      }

      return {
        ...column,
        tasks: column.tasks.filter((item) => item.id !== taskId),
      }
    })

    if (!taskToMove) {
      return
    }

    setColumns(
      columnsWithoutTask.map((column) =>
        column.title === targetColumn
          ? {
              ...column,
              tasks: [...column.tasks, taskToMove as Task],
            }
          : column,
      ),
    )
  }

  const editTask = (taskId: number, newTitle: string) => {
    const trimmedTitle = newTitle.trim()

    if (!trimmedTitle) {
      return
    }

    setColumns((currentColumns) =>
      currentColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                title: trimmedTitle,
              }
            : task,
        ),
      })),
    )
  }

  const clearBoard = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all tasks?',
    )

    if (!confirmed) {
      return
    }

    setColumns((currentColumns) =>
      currentColumns.map((column) => ({
        ...column,
        tasks: [],
      })),
    )
  }

  const resetBoard = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the board?',
    )

    if (!confirmed) {
      return
    }

    setColumns(initialColumns)
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">CollabBoard</div>

        <nav>
          <a href="#board">Board</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">REAL-TIME COLLABORATION</p>

          <h1>
            Build together.
            <br />
            <span>Work smarter.</span>
          </h1>

          <p className="description">
            A collaborative workspace where teams can organize ideas,
            manage tasks, and work together in real time.
          </p>

          <div className="hero-actions">
            <input
              type="text"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addTask()
                }
              }}
              placeholder="Enter a new task..."
              aria-label="New task"
            />

            <select
              value={newTaskColumn}
              onChange={(event) =>
                setNewTaskColumn(event.target.value)
              }
              aria-label="Select task column"
            >
              {columns.map((column) => (
                <option key={column.title} value={column.title}>
                  {column.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="primary-button"
              onClick={addTask}
            >
              Add task
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={clearBoard}
            >
              Clear board
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={resetBoard}
            >
              Reset board
            </button>
          </div>
        </div>

        <BoardPreview
          columns={columns}
          onDeleteTask={deleteTask}
          onMoveTask={moveTask}
          onEditTask={editTask}
        />
      </main>
    </div>
  )
}

export default App