function TaskFilters({
  filter,
  search,
  statistics,
  visibleTaskCount,
  onFilterChange,
  onSearchChange,
  onClearCompleted,
}) {
  const filters = [
    { id: 'all', label: 'All', count: statistics.total },
    { id: 'active', label: 'Active', count: statistics.active },
    { id: 'completed', label: 'Completed', count: statistics.completed },
  ]

  return (
    <div className="border-b border-slate-100 p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>

          <p className="mt-1 text-sm text-slate-500">
            {visibleTaskCount} task{visibleTaskCount !== 1 ? 's' : ''} visible
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onFilterChange(item.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              filter === item.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item.label}

            <span
              className={`ml-2 rounded-md px-1.5 py-0.5 text-xs ${
                filter === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {item.count}
            </span>
          </button>
        ))}

        {statistics.completed > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="ml-auto text-sm font-semibold text-rose-600 transition hover:text-rose-700"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskFilters