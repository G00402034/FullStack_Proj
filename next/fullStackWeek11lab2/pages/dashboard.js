import { useEffect, useState } from 'react';
import Link from 'next/link';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="dashboardHeader">
        <h1 className="heading">Task Dashboard</h1>
        <Link href="/tasks/new">
          <button className="button">+ Add New Task</button>
        </Link>
      </div>
      <div className="cardContainer">
        {tasks.map((task) => (
          <div key={task._id} className="card">
            <h3 className="cardTitle">{task.title}</h3>
            <p className="cardDescription">{task.description}</p>
            <p className="cardMeta">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <div className="buttonGroup">
              <Link href={`/tasks/${task._id}`}>
                <button className="button">View Details</button>
              </Link>
              <Link href={`/tasks/edit/${task._id}`}>
                <button className="button buttonSecondary">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
