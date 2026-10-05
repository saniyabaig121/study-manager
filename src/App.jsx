import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('studyTasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (err) {
      setError('Failed to load tasks from local storage.');
      console.error(err);
    } finally {
      // Simulate a small loading delay for UX
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('studyTasks', JSON.stringify(tasks));
      } catch (err) {
        setError('Failed to save tasks to local storage.');
        console.error(err);
      }
    }
  }, [tasks, loading]);

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header>
        <h1>Study Task Manager</h1>
        <p>Organize your study sessions and stay on track</p>
      </header>

      <main>
        <TaskForm onAddTask={addTask} />
        
        <div className="task-section">
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          
          {loading ? (
            <div className="loading-state">
              <p>Loading your tasks...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button className="btn btn-primary" onClick={() => setError(null)}>Dismiss</button>
            </div>
          ) : (
            <TaskList 
              tasks={filteredTasks} 
              onToggleStatus={toggleTaskStatus} 
              onDelete={deleteTask}
              filter={filter}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
