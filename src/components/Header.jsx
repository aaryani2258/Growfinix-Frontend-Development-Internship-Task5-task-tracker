function Header({ completionRate, isFormOpen, onToggleForm }) {
  return (
    <header className="mb-8 rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-xl shadow-lg shadow-blue-950/40">
              ✓
            </div>

            <p className="text-sm font-semibold tracking-[0.2em] text-blue-200 uppercase">
              Personal Productivity
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            TaskFlow Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-slate-300">
            Organize priorities, track progress, and complete meaningful work.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-blue-400/30"
        >
          <span className="text-xl leading-none">+</span>
          {isFormOpen ? 'Close Form' : 'New Task'}
        </button>
      </div>

      <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500"
          style={{ width: `${completionRate}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-300">
        {completionRate}% of tasks completed
      </p>
    </header>
  )
}

export default Header