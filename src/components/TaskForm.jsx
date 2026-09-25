function TaskForm({
  formData,
  editingTaskId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          {editingTaskId ? 'Edit Task' : 'Create a New Task'}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a clear title, priority level, and optional due date.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Task Title <span className="text-rose-500">*</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            autoFocus
            value={formData.title}
            onChange={onChange}
            placeholder="Example: Complete React portfolio project"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={onChange}
            placeholder="Add useful details, deliverables, or notes..."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Due Date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            {editingTaskId ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm