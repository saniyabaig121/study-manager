import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleStatus, onDelete, filter }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>
          {filter === 'all' 
            ? "You don't have any tasks yet. Add one above!" 
            : `You don't have any ${filter} tasks.`}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
