function StatCard({ label, value, icon, color }) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600 ring-blue-100',
    amber: 'bg-amber-50 text-amber-600 ring-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    rose: 'bg-rose-50 text-rose-600 ring-rose-100',
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </p>

          <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ring-1 ${colorStyles[color]}`}
        >
          {icon}
        </div>
      </div>
    </article>
  )
}

export default StatCard