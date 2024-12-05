import Link from 'next/link';

const Banner = () => {
  return (
    <div className="banner">
      <nav className="bannerNav">
        <Link href="/dashboard">
          <a className="bannerLink">Dashboard</a>
        </Link>
        <Link href="/tasks/new">
          <a className="bannerLink">Add New Task</a>
        </Link>
        <Link href="/settings">
          <a className="bannerLink">Settings</a>
        </Link>
      </nav>
    </div>
  );
};

export default Banner;
