import { IoIosMenu } from 'react-icons/io';
import { useState } from 'react';
import Link from 'next/link';
import classes from './HamMenu.module.css';

export default function HamMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainDiv} onClick={toggleMenu}>
        <span className={classes.mainSpan}>
          <IoIosMenu />
        </span>
      </div>
      {menuOpen && (
        <div className={classes.dropdownMenu}>
          <Link href="/tasks/new">
            <button className={classes.dropdownItem}>+ Add New Task</button>
          </Link>
          <Link href="/settings">
            <button className={classes.dropdownItem}>Settings</button>
          </Link>
        </div>
      )}
    </div>
  );
}
