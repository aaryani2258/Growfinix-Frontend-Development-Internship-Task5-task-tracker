import StatCard from './StatCard'

function StatsDashboard({ statistics }) {
  return (
    <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Total Tasks"
        value={statistics.total}
        icon="☷"
        color="blue"
      />

      <StatCard
        label="In Progress"
        value={statistics.active}
        icon="◷"
        color="amber"
      />

      <StatCard
        label="Completed"
        value={statistics.completed}
        icon="✓"
        color="emerald"
      />

      <StatCard
        label="Overdue"
        value={statistics.overdue}
        icon="!"
        color="rose"
      />
    </section>
  )
}

export default StatsDashboard