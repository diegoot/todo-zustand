import TaskForm from './features/tasks/components/TaskForm'
import TaskBoard from './features/tasks/TaskBoard'

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Tasks Manager
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Organize your tasks on a Kanban board
        </p>
      </header>

      <TaskForm />
      <TaskBoard />
    </div>
  )
}

export default App
