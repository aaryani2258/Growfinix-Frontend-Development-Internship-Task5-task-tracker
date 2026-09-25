import { useMemo, useState } from 'react'
import Header from './components/Header'
import StatsDashboard from './components/StatsDashboard'
import TaskForm from './components/TaskForm'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import EmptyState from './components/EmptyState'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generateTaskId, isOverdue } from './utils/taskHelpers'

const STORAGE_KEY = 'taskflow-tasks'

const initialFormData = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
}

function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, [])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [formData, setFormData] = useState(initialFormData)

  const statistics = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    const active = tasks.length - completed
    const overdue = tasks.filter(isOverdue).length

    const completionRate =
      tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100)

    return {
      total: tasks.length,
      active,
      completed,
      overdue,
      completionRate,
    }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return tasks
      .filter((task) => {
        const matchesFilter =
          filter === 'all' ||
          (filter === 'active' && !task.completed) ||
          (filter === 'completed' && task.completed)

        const matchesSearch =
          !searchText ||
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText)

        return matchesFilter && matchesSearch
      })
      .sort((firstTask, secondTask) => {
        if (firstTask.completed !== secondTask.completed) {
          return Number(firstTask.completed) - Number(secondTask.completed)
        }

        const priorityOrder = {
          high: 0,
          medium: 1,
          low: 2,
        }

        if (
          priorityOrder[firstTask.priority] !==
          priorityOrder[secondTask.priority]
        ) {
          return (
            priorityOrder[firstTask.priority] -
            priorityOrder[secondTask.priority]
          )
        }

        return new Date(secondTask.createdAt) - new Date(firstTask.createdAt)
      })
  }, [tasks, filter, search])

  function resetForm() {
    setFormData(initialFormData)
    setEditingTaskId(null)
    setIsFormOpen(false)
  }

  function handleFormChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  function handleFormSubmit(event) {
    event.preventDefault()

    if (!formData.title.trim()) {
      return
    }

    if (editingTaskId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority,
                dueDate: formData.dueDate,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      )
    } else {
      const newTask = {
        id: generateTaskId(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setTasks((currentTasks) => [newTask, ...currentTasks])
    }

    resetForm()
  }

  function handleToggleForm() {
    if (isFormOpen) {
      resetForm()
      return
    }

    setEditingTaskId(null)
    setFormData(initialFormData)
    setIsFormOpen(true)
  }

  function handleToggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    )
  }

  function handleEditTask(task) {
    setEditingTaskId(task.id)

    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    })

    setIsFormOpen(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleDeleteTask(taskId) {
    const selectedTask = tasks.find((task) => task.id === taskId)

    const userConfirmed = window.confirm(
      `Delete "${selectedTask?.title || 'this task'}"? This action cannot be undone.`
    )

    if (!userConfirmed) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
  }

  function handleClearCompleted() {
    const completedCount = tasks.filter((task) => task.completed).length

    if (completedCount === 0) {
      return
    }

    const userConfirmed = window.confirm(
      `Delete ${completedCount} completed task${
        completedCount > 1 ? 's' : ''
      }?`
    )

    if (!userConfirmed) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Header
          completionRate={statistics.completionRate}
          isFormOpen={isFormOpen}
          onToggleForm={handleToggleForm}
        />

        <StatsDashboard statistics={statistics} />

        {isFormOpen && (
          <TaskForm
            formData={formData}
            editingTaskId={editingTaskId}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onCancel={resetForm}
          />
        )}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <TaskFilters
            filter={filter}
            search={search}
            statistics={statistics}
            visibleTaskCount={visibleTasks.length}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
            onClearCompleted={handleClearCompleted}
          />

          <div className="p-5 sm:p-6">
            {visibleTasks.length === 0 ? (
              <EmptyState
                hasSearchOrFilter={Boolean(search) || filter !== 'all'}
                onCreateTask={handleToggleForm}
              />
            ) : (
              <TaskList
                tasks={visibleTasks}
                onToggleTask={handleToggleTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </div>
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          TaskFlow stores your tasks locally and securely in your browser.
        </footer>
      </div>
    </main>
  )
}

export default App