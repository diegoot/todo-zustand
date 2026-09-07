import { useEffect } from 'react'
import TaskForm from './features/tasks/components/TaskForm'
import TaskBoard from './features/tasks/TaskBoard'
import { useThemeStore } from './store/theme/useThemeStore'

function App() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-4 py-8 sm:px-6">
      <header className="relative mb-8 text-center">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="absolute right-0 top-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-lg shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {theme === 'light' ? '🌙' : '☀'}
        </button>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Tasks Manager
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Organize your tasks on a Kanban board
        </p>
      </header>

      <TaskForm />
      <TaskBoard />
    </div>
  )
}

export default App
