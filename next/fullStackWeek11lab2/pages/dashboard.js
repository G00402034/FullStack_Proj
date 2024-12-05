import { useEffect, useState } from 'react';
import Link from 'next/link';
import HamMenu from '../components/HamMenu';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light'); // Default to light mode
  const [openTaskMenu, setOpenTaskMenu] = useState(null); // Track which dropdown is open

  useEffect(() => {
    // Fetch the theme from localStorage
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme); // Set the local state
    document.body.className = storedTheme; // Apply the theme to the body
  }, []); // Run only once on component mount

  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Update the state to remove the deleted task
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDropdown = (taskId) => {
    setOpenTaskMenu(openTaskMenu === taskId ? null : taskId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`dashboardContainer ${theme}`}> {/* Apply theme to the container */}
      <div className="dashboardHeader">
        <h1 className="heading">Task Dashboard</h1>
        <HamMenu /> {/* Reimplemented HamMenu component */}
      </div>
      <div className="cardContainer">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="card">
              <h3 className="cardTitle">{task.title}</h3>
              <p className="cardDescription">{task.description}</p>
              <p className="cardMeta">Priority: <strong>{task.priority}</strong></p>
              <p className="cardMeta">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <div className="dropdownContainer">
                <button
                  className="button"
                  onClick={() => toggleDropdown(task._id)}
                >
                  Actions
                </button>
                {openTaskMenu === task._id && (
                  <div className="dropdownMenu">
                    <Link href={`/tasks/${task._id}`}>
                      <button className="dropdownItem">View Details</button>
                    </Link>
                    <Link href={`/tasks/edit/${task._id}`}>
                      <button className="dropdownItem">Edit</button>
                    </Link>
                    <button
                      className="dropdownItem"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
