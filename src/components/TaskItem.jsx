export default function TaskItem({ task, onToggleStatus, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleStatus(task.id)}
          />
          <span className="task-title">{task.title}</span>
        </label>
        {task.description && (
          <div className="task-desc">{task.description}</div>
        )}
      </div>
      <div className="task-actions">
        <button 
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
