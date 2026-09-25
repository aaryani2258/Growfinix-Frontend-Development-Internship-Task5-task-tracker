export function generateTaskId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function formatDate(dateValue) {
  if (!dateValue) {
    return ''
  }

  const date = new Date(`${dateValue}T00:00:00`)

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(`${task.dueDate}T00:00:00`)

  return dueDate < today
}

export function getPriorityStyles(priority) {
  const styles = {
    low: {
      badge:
        'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
      dot: 'bg-emerald-500',
    },
    medium: {
      badge:
        'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
      dot: 'bg-amber-500',
    },
    high: {
      badge:
        'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
      dot: 'bg-rose-500',
    },
  }

  return styles[priority] || styles.medium
}