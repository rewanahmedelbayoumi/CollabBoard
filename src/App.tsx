import { useState } from 'react'
import './App.css'
import BoardPreview from './components/BoardPreview'

type Task = {
  id: number
  title: string
  user: string
}

type BoardColumn = {
  title: string
  tasks: Task[]
}

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
  const [columns, setColumns] = useState<BoardColumn[]>(initialColumns)
  const [newTask, setNewTask] = useState('')

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
      currentColumns.map((column, index) =>
        index === 0
          ? {
              ...column,
              tasks: [...column.tasks, task],
            }
          : column,
      ),
    )

    setNewTask('')
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

            <button className="primary-button" onClick={addTask}>
              Add task
            </button>
          </div>
        </div>

        <BoardPreview columns={columns} />
      </main>
    </div>
  )
}

export default App