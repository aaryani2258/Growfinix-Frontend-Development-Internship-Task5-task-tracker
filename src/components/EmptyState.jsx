function EmptyState({ hasSearchOrFilter, onCreateTask }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-brand-600">
        ✓
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        {hasSearchOrFilter
          ? 'No Matching Tasks Found'
          : 'Your Task List Is Empty'}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {hasSearchOrFilter
          ? 'Try another search term or choose a different task filter.'
          : 'Start planning your work by adding your first task.'}
      </p>

      {!hasSearchOrFilter && (
        <button
          type="button"
          onClick={onCreateTask}
          className="mt-5 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Create Your First Task
        </button>
      )}
    </div>
  )
}

export default EmptyState