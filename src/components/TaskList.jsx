import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList