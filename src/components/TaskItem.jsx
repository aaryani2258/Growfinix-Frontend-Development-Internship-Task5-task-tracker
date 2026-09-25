import {
  formatDate,
  getPriorityStyles,
  isOverdue,
} from '../utils/taskHelpers'

function TaskItem({ task, onToggleTask, onEditTask, onDeleteTask }) {
  const priority = getPriorityStyles(task.priority)
  const overdue = isOverdue(task)

  return (
    <article
      className={`group flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-start sm:p-5 ${
        task.completed
          ? 'border-slate-200 bg-slate-50/70'
          : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-md'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggleTask(task.id)}
        aria-label={
          task.completed ? 'Mark task as incomplete' : 'Mark task as complete'
        }
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          task.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 bg-white text-transparent hover:border-brand-500'
        }`}
      >
        ✓
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`text-base font-bold sm:text-lg ${
              task.completed
                ? 'text-slate-400 line-through'
                : 'text-slate-800'
            }`}
          >
            {task.title}
          </h3>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${priority.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p
            className={`mt-2 text-sm leading-6 ${
              task.completed ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {task.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
          <span className="text-slate-400">
            Created {formatDate(task.createdAt.slice(0, 10))}
          </span>

          {task.dueDate && (
            <span
              className={
                overdue
                  ? 'text-rose-600'
                  : task.completed
                    ? 'text-slate-400'
                    : 'text-slate-600'
              }
            >
              {overdue ? 'Overdue: ' : 'Due: '}
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-2 sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:focus-within:opacity-100">
        <button
          type="button"
          onClick={() => onEditTask(task)}
          className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskItem